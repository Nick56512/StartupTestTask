import { AuctionRepository } from "../repository/auction_repository";
import WebSocket, { WebSocketServer } from 'ws';
import { Auction } from "../auction";
import { AuctionElement } from "../models/auction_element";

export class AuctionServer implements IServer
{
    port:number;
    webSocketServer:WebSocketServer
    clients:Set<WebSocket>
    auction:Auction
  
    constructor(port:number,auction:Auction)
    {
        this.auction=auction;
        this.clients=new Set<WebSocket>();
        this.port=port;
        this.webSocketServer=new WebSocket.Server({
            port:this.port
        });
    
    }
    public startServer()
    {
        this.webSocketServer.on('connection',(ws)=>{
            let intervalId:any;
            ws.on('message',(data)=>{
                if(data.toString("utf-8")=='getAuction'){
                    intervalId=setInterval(()=>{
                        const auctionElements:AuctionElement[]=this.auction.getAuctionList()
                        const bids:Bid[]=this.auction.getBids()
                        const winnerBids:Set<Bid>=this.auction.getWinnerBids()
                        const json:string=JSON.stringify({
                            auctionElements:auctionElements,
                            winnerBids:Array.from(winnerBids),
                            bids:bids
                        })
                        ws.send(json)
                    },1000)
                }
            })

            ws.on('close',(code)=>{
                clearInterval(intervalId)
                if(code===ws.CLOSED){
                    this.clients.delete(ws)
                }
            });
            this.clients.add(ws);
        })

        this.webSocketServer.on('close',()=>{
            this.auction.stopAuction()
            console.log('Auction was stopped')
        })

    }
}