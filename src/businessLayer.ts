
import { NeoRequest } from "./models/requestModels"
import { NearEarthObject } from "./models/neoModels"
import { getNeoData, getAllNeoData } from './service';

export const getNeoDataAndFilterNames = async (neoRequest: NeoRequest): Promise<string[]> => {
  return getNeoData()
  // return getAllNeoData()
      .then((data: NearEarthObject[]) => { return getAbbreviatedNames(filterAsteroids(data, neoRequest))})
      .catch((e: Error) => { console.log(e); throw e; });
}

function filterAsteroids(neos: NearEarthObject[], neoRequest: NeoRequest): string[] {
    return neos.filter(n => n.close_approach_data.some(c => {
        return neoRequest.startDate.getTime() < new Date(c.close_approach_date).getTime() &&
        neoRequest.endDate.getTime() > new Date(c.close_approach_date).getTime() &&
        neoRequest.range > parseInt(c.miss_distance.kilometers)
      })
    ).map(n => n.name);
  }
  
  // returns section of asteroid names inside parentheses, or full  name if parantheses don't exist
  function getAbbreviatedNames(names: string[]): string[] {
    var regExp = /\(([^)]+)\)/;
    return names.map(n => {
      const inner = n.match(regExp)
      return inner == null || inner[1].trim() == '' ? n : inner[1];
    })
  }
