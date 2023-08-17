import { AuctionRepository } from "./repository/auction_repository";
import { BidRepository } from "./repository/bid_repository";
import { AuctionServer } from "./server/websockets_server";
import { Auction } from "./auction";
import { AuctionHttpServer } from "./server/httpServer";


const _auctRepo=new AuctionRepository('auction_elements.json');
const _bidRepo=new BidRepository('bids.json')

const auction:Auction=new Auction(_auctRepo,_bidRepo);

const wsPort=8000;
const httpPort=9000;

const wsServer:IServer=new AuctionServer(wsPort,auction);
const httpServer:IServer=new AuctionHttpServer(httpPort,auction)

auction.startAuction()
wsServer.startServer();
httpServer.startServer();