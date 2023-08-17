"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionHttpServer = void 0;
const express_1 = __importDefault(require("express"));
class AuctionHttpServer {
    constructor(httpPort, auction) {
        this.api = (0, express_1.default)(),
            this.httpPort = httpPort;
        this.auction = auction;
        this.jsonParser = express_1.default.json();
    }
    addMiddleware() {
        const cors = require('cors');
        this.api.use(cors({ origin: '*' }));
    }
    registerRoutes() {
        this.api.post('/addAuction', this.jsonParser, (req, res) => {
            if (!req.body) {
                return res.sendStatus(400);
            }
            this.auction.addNewAuctionElement(req.body);
            res.sendStatus(200);
        });
        this.api.post('/addBid', this.jsonParser, (req, res) => {
            if (!req.body) {
                return res.sendStatus(400);
            }
            this.auction.addNewBid(req.body);
            res.sendStatus(200);
        });
    }
    startServer() {
        this.addMiddleware();
        this.registerRoutes();
        const app = this.api.listen(this.httpPort, () => {
            console.log(`Http server was started in ${this.httpPort} port`);
        });
    }
}
exports.AuctionHttpServer = AuctionHttpServer;
