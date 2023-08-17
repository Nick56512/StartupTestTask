import {GenericRepository} from './generic_repository'
import { AuctionElement } from '../models/auction_element'
import { Inject } from 'container-ioc'


export class AuctionRepository extends GenericRepository<AuctionElement>
{
    constructor(jsonFileName:string){
        super(jsonFileName)
    }
}