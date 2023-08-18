import { Bid } from "./bid";

export class AuctionElement{
    public id:number=0;
    public description:string='';
    public startingBid:number=0;
    public endTime?:Date;
    public remainder:number=0

    public winnerBid?:Bid;
    public endAuction:boolean=false;
}