import { NeoRequest} from './models/requestModels'
import { getNeoDataAndFilterNames } from './businessLayer'
import { Request, Response } from "express";


export const getNeo = async (request: Request, response: Response) => {
    try {
        let neoRequest: NeoRequest = getNeoRequestParameters(request.headers);
        getNeoDataAndFilterNames(neoRequest).then((neos: string[]) => {
            response.send({ 'asteroids' : neos });
            }).catch((e: any) => {
            response.send({error: e.message})
        });
    } catch(e: any) {
        response.send({error: e.message})
    }
}


function getNeoRequestParameters(headers: any): NeoRequest {
    let startDate = new Date(headers.start_date);
    let endDate = new Date(headers.end_date);
    let range = parseInt(headers.range)
    
    if (getErrors(startDate, endDate, range).length > 0) {
        throw new Error(getErrors(startDate, endDate, range))
    } else {
        return {
            startDate: startDate,
            endDate: endDate,
            range: range
        } 
    }
}

function getErrors(startDate: Date, endDate: Date, range: number): string {
    let errors: string[] = [];
    if (isNaN(startDate.getTime())) {
        errors.push('Invalid Start Date');
    }
    if (isNaN(endDate.getTime())) {
        errors.push('Invalid End Date');
    }
    if (isNaN(range)) {
        errors.push('Invalid Range');
    }
    return errors.join(", ");
}