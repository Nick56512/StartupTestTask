export class AuctionElement{
    public id:number;
    private description:string;
    private startingBid:number;
    private endTime:Date;
    private remainder:number=0;
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


    public static countdownDate(auct:AuctionElement):void{
        try{
            const current:Date=new Date();
            const endDate:number=Date.parse(auct.endTime.toLocaleString())
            if(endDate<=current.valueOf()){
                auct.endAuction=true;
                return;
            }
            auct.remainder=endDate-current.valueOf();
        }
        catch(e:unknown){
            console.log(e)
        }
    }

    
}