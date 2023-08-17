"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionServer = void 0;
const ws_1 = __importDefault(require("ws"));
class AuctionServer {
    constructor(port, auction) {
        this.auction = auction;
        this.clients = new Set();
        this.port = port;
        this.webSocketServer = new ws_1.default.Server({
            port: this.port
        });
    }
    startServer() {
        this.webSocketServer.on('connection', (ws) => {
            let intervalId;
            ws.on('message', (data) => {
                if (data.toString("utf-8") == 'getAuction') {
                    intervalId = setInterval(() => {
                        const auctionElements = this.auction.getAuctionList();
                        const bids = this.auction.getBids();
                        const winnerBids = this.auction.getWinnerBids();
                        const json = JSON.stringify({
                            auctionElements: auctionElements,
                            winnerBids: Array.from(winnerBids),
                            bids: bids
                        });
                        ws.send(json);
                    }, 1000);
                }
            });
            ws.on('close', (code) => {
                clearInterval(intervalId);
                if (code === ws.CLOSED) {
                    this.clients.delete(ws);
                }
            });
            this.clients.add(ws);
        });
        this.webSocketServer.on('close', () => {
            this.auction.stopAuction();
            console.log('Auction was stopped');
        });
    }
}
exports.AuctionServer = AuctionServer;
