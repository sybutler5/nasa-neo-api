const axios = require('axios')
const NASA_BASE_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse';
const NASA_API_KEY = 'xKjFRvrVdyMUPvTjLEJOR9dWruJCy4AknwJGec9J';
const url = new URL(`${NASA_BASE_URL}?api_key=${NASA_API_KEY}`); 
let i = 0;

export const getNeoData = async () => {
    return axios.get(url)
        .then((response: any) => response.data.near_earth_objects)
        .catch((e: Error) => {
            throw e;
        });
} 

export const getAllNeoData = async () => {
    let results: any[] = [];
    let startPage = 1;
    let batchSize = 10;
    let urls: URL[] = [];

    // let done = false;
    // while(!done) {
    while(startPage < 100) {
        console.log(startPage + ' - ' + (startPage + batchSize - 1))
        for (let i = startPage; i < startPage + batchSize; i++) {
            urls.push(new URL(`${NASA_BASE_URL}?page=${i}&size=20&api_key=${NASA_API_KEY}`)); 
        }
        let batch = urls.map(url => {
            return axios.get(url)
                .then((response: any) => response.data)
                .catch((e: Error) => {
                    // console.log(e.message); // 429
                });
        })
        
        await Promise.all(batch).then((data: any) => {
            // done = data.some((d: any) => d !== undefined && d?.links?.next === undefined)
            results = results.concat(data.map((d: any) => (d?.near_earth_objects != undefined ? d?.near_earth_objects: [])).flat(1));
        })

        startPage = startPage + batchSize;
    }
    
    return results;
}