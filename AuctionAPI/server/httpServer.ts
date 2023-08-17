import express,{Express} from 'express';

import { Auction } from '../auction';

export class AuctionHttpServer implements IServer
{
    private api:Express;
    private httpPort:number;
    private auction:Auction;
    private jsonParser;

    constructor(httpPort:number,auction:Auction){
        this.api=express(),
        this.httpPort=httpPort;
        this.auction=auction;
        this.jsonParser=express.json()
    }
    private addMiddleware(){
        const cors=require('cors')
        this.api.use(cors({origin:'*'}))
    }

    private registerRoutes(){
       
        this.api.post('/addAuction',this.jsonParser, (req,res)=>{
            if(!req.body){
                return res.sendStatus(400)
            }
            this.auction.addNewAuctionElement(req.body)
            res.sendStatus(200)
        })
        this.api.post('/addBid',this.jsonParser, (req,res)=>{
            if(!req.body){
                return res.sendStatus(400)
            }
            this.auction.addNewBid(req.body)
            res.sendStatus(200)
        })

    }

    

    public startServer(){

        this.addMiddleware();
        this.registerRoutes();
        const app=this.api.listen(this.httpPort,()=>{
            console.log(`Http server was started in ${this.httpPort} port`)
        })
    }

    
}