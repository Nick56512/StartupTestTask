import { AuctionRepository } from "../repository/auction_repository";
import WebSocket, { WebSocketServer } from 'ws';
import { Auction } from "../auction";
import { AuctionElement } from "../models/auction_element";

export class AuctionWebSocketServer implements IServer
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

    private notifyClients():void{
        this.clients?.forEach(client=>{
            if(client.bufferedAmount==0){
                const auctionElements:AuctionElement[]=this.auction.getAuctionList()
                const json:string=JSON.stringify({
                    auctionElements:auctionElements,
                })
                client.send(json)
            }
        })
    }

    public startServer()
    {
        const timerId=setInterval(()=>{
            this.notifyClients()
        },1000)
        this.webSocketServer.on('connection',(ws)=>{
            ws.on('close',()=>{
                this.clients.delete(ws);
            })
            this.clients.add(ws);
        })

        this.webSocketServer.on('close',()=>{
            this.auction.stopAuction()
            clearInterval(timerId)
            console.log('Auction was stopped')
        })

    }
}