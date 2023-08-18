"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
class AuctionWebSocketServer {
    constructor(port, auction) {
        this.auction = auction;
        this.clients = new Set();
        this.port = port;
        this.webSocketServer = new ws_1.default.Server({
            port: this.port
        });
    }
    notifyClients() {
        var _a;
        (_a = this.clients) === null || _a === void 0 ? void 0 : _a.forEach(client => {
            if (client.bufferedAmount == 0) {
                const auctionElements = this.auction.getAuctionList();
                const json = JSON.stringify({
                    auctionElements: auctionElements,
                });
                client.send(json);
            }
        });
    }
    startServer() {
        const timerId = setInterval(() => {
            this.notifyClients();
        }, 1000);
        this.webSocketServer.on('connection', (ws) => {
            ws.on('close', () => {
                this.clients.delete(ws);
            });
            this.clients.add(ws);
        });
        this.webSocketServer.on('close', () => {
            this.auction.stopAuction();
            clearInterval(timerId);
            console.log('Auction was stopped');
        });
    }
}
exports.AuctionWebSocketServer = AuctionWebSocketServer;
