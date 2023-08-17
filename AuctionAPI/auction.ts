import { Inject, Injectable } from "container-ioc";
import { AuctionElement } from "./models/auction_element";

export class Auction{
    private timerId:any;

    private _auctRepository:IRepository<AuctionElement>;
    private _bidRepository:IRepository<Bid>;

    private auctionElements:AuctionElement[];

    private bids:Bid[];
    private winnerBids:Set<Bid>;

    
    constructor( _auctRepository:IRepository<AuctionElement>,
        _bidRepository:IRepository<Bid>)
        {
            this._auctRepository=_auctRepository;
            this._bidRepository=_bidRepository;
            this.auctionElements=_auctRepository.getAll();
            this.bids=_bidRepository.getAll();
            this.winnerBids=new Set<Bid>();
        }
        public startAuction():void{
            this.timerId=setInterval(()=>{
                for(let auct of this.auctionElements.filter(x=>!x.endAuction)){
                    AuctionElement.countdownDate(auct)
                }
            },1000)
        }

        public addNewAuctionElement(newAuct:AuctionElement):boolean{
            if(!newAuct){
                return false;
            }
            this._auctRepository.create(newAuct);
            this.auctionElements.push(newAuct)
            return true;
        }
        public addNewBid(newBid:Bid):boolean{
            if(!newBid){
                return false
            }
            this._bidRepository.create(newBid)
            this.bids.push(newBid)
            return true;
        }
        public getAuctionList():AuctionElement[]{
            return this.auctionElements;
        }

        public getWinnerBids():Set<Bid>{
            const end_aucts:AuctionElement[]=this.
                auctionElements.filter(x=>x.endAuction)
            for(let auct of end_aucts){
                let winnerBid:Bid;
                const filteredBids=this.bids.filter(x=>x.auctionElementId==auct.id)
                if(!filteredBids){
                    continue
                }
                winnerBid=filteredBids[0];
                for(let bid of filteredBids){
                    if(bid.price>winnerBid.price){
                        winnerBid=bid;
                    }
                }
                this.winnerBids.add(winnerBid)
            } 
            return this.winnerBids
        }

        public getBids():Bid[]
        {
            return this.bids;
        }

        public stopAuction(){
            clearInterval(this.timerId)
        }

        private getMaxBidByAuctId(auctId:number,winnerBid:Bid){
         
        }
}