import { Component, OnInit } from '@angular/core';
import { ApiConfig } from '../api-config';
import { AuctionElement } from '../models/auction_element';
import { Bid } from '../models/bid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-component.html',
})
export class AuctionsComponent implements OnInit{

    webSocket:WebSocket;
    auctElements?:AuctionElement[];

    newAuct:AuctionElement;
    newBid:Bid;

    selectedAuctionElementId:number=0
   
    winnerBids?:Bid[]
    bids?:Bid[]

    constructor(){
        this.newBid=new Bid()
        this.newAuct=new AuctionElement()
        this.webSocket=new WebSocket(ApiConfig.getWsUrl());
        
    }

    async addNewBid(){
        this.newBid.auctionElementId=this.selectedAuctionElementId;
        const res=await fetch(`${ApiConfig.getHttpUrl()}/addBid`,{
          method:'POST',
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body:JSON.stringify(this.newBid)
        })
        this.newBid.auctionElementId=0;
        this.newBid.id=0;
        this.newBid.price=0;
    }

    async addNewAuctItem()
    {
       const res=await fetch(`${ApiConfig.getHttpUrl()}/addAuction`,{
          method:'POST',
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body:JSON.stringify(this.newAuct)
        })
        this.newAuct.description=''
        this.newAuct.endTime=undefined;
        this.newAuct.startingBid=0;

    }

    selectAuctionElementId(id:number){
      this.selectedAuctionElementId=id;
      this.winnerBids=undefined;
    }

    getTimeLeftStr(timeleft:number):string{
        if(timeleft!==undefined){
          var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
          var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
          return `${days<10?`0${days}`:days} days 
          ${hours<10?`0${hours}`:hours}:
          ${minutes<10?`0${minutes}`:minutes}:
          ${seconds<10?`0${seconds}`:seconds}`
        }
        return '';

    }

    ngOnInit():void{
     
      this.webSocket.onopen=(s)=>{
        this.webSocket.send('getAuction')
      }
      this.webSocket.onmessage=(e)=>{
          const response=JSON.parse(e.data.toString('utf-8'));
          this.auctElements=response.auctionElements.reverse();
          if(this.selectedAuctionElementId!=0){
            this.bids=response.bids?.filter((x:any)=>x.auctionElementId==this.selectedAuctionElementId)
            this.winnerBids=response.winnerBids?.filter((x:any)=>x.auctionElementId==this.selectedAuctionElementId)
          }
      } 
    }

    ngOnDestroy(){
        this.webSocket.close();
    }

    
    
}
