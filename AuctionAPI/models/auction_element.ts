export class AuctionElement{
    public id:number;
    private description:string;
    private startingBid:number;
    private endTime:Date;
    private remainder:number=0;

    public winnerBid?:Bid;
    public endAuction:boolean=false;

    constructor(id:number,
        description:string,
        startingBid:number,
        endAuction:boolean,
        endTime:Date)
    {
        this.id=id;
        this.description=description;
        this.endTime=endTime,
        this.startingBid=startingBid;
        this.endAuction=endAuction
    }
   
    public getId():number{
        return this.id;
    }


    public static countdownDate(auct:AuctionElement):boolean{
        try{
            const current:Date=new Date();
            const endDate:number=Date.parse(auct.endTime.toLocaleString())
            if(endDate<=current.valueOf()){
                auct.endAuction=true;
                return false;
            }
            auct.remainder=endDate-current.valueOf();
            return true;
        }
        catch(e:unknown){
            console.log(e)
            return false;
        }
    }

    
}