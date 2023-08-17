import { GenericRepository } from "./generic_repository";

export class BidRepository extends GenericRepository<Bid>{
    constructor(jsonFileName:string)
    {
        super(jsonFileName);
    }
}