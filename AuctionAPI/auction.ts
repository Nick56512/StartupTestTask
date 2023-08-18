import { Inject, Injectable } from "container-ioc";
import { AuctionElement } from "./models/auction_element";

export class Auction{
    private timerId:any;

    private _auctRepository:IRepository<AuctionElement>;
    private _bidRepository:IRepository<Bid>;

    private auctionElements:AuctionElement[];


    constructor( _auctRepository:IRepository<AuctionElement>,
        _bidRepository:IRepository<Bid>)
        {
            this._auctRepository=_auctRepository;
            this._bidRepository=_bidRepository;
            this.auctionElements=_auctRepository.getAll();
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
            const auctIndex:number=this.auctionElements.findIndex(x=>x.id==newBid.auctionElementId)
            if(!this.checkBidSumHigher(this.auctionElements[auctIndex],newBid.price)){
                return false;
            }
            this.auctionElements[auctIndex].winnerBid=newBid;
            this._bidRepository.create(newBid)
            this._auctRepository.saveChanges(this.auctionElements)
            return true; 
        }

        public getAuctionList():AuctionElement[]{
            return this.auctionElements;
        }

        private checkBidSumHigher(auctElement:AuctionElement,newSum:number):boolean{
            if(auctElement.winnerBid===undefined){
                return true;
            }
            if(auctElement.winnerBid.price<newSum){
                return true;
            }
            return false;
        }

        public stopAuction(){
            clearInterval(this.timerId)
        }
}