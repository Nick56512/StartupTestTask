"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const auction_element_1 = require("./models/auction_element");
class Auction {
    constructor(_auctRepository, _bidRepository) {
        this._auctRepository = _auctRepository;
        this._bidRepository = _bidRepository;
        this.auctionElements = _auctRepository.getAll();
        this.bids = _bidRepository.getAll();
        this.winnerBids = new Set();
    }
    startAuction() {
        this.timerId = setInterval(() => {
            for (let auct of this.auctionElements.filter(x => !x.endAuction)) {
                auction_element_1.AuctionElement.countdownDate(auct);
            }
        }, 1000);
    }
    addNewAuctionElement(newAuct) {
        if (!newAuct) {
            return false;
        }
        this._auctRepository.create(newAuct);
        this.auctionElements.push(newAuct);
        return true;
    }
    addNewBid(newBid) {
        if (!newBid) {
            return false;
        }
        this._bidRepository.create(newBid);
        this.bids.push(newBid);
        return true;
    }
    getAuctionList() {
        return this.auctionElements;
    }
    getWinnerBids() {
        const end_aucts = this.
            auctionElements.filter(x => x.endAuction);
        for (let auct of end_aucts) {
            let winnerBid;
            const filteredBids = this.bids.filter(x => x.auctionElementId == auct.id);
            if (!filteredBids) {
                continue;
            }
            winnerBid = filteredBids[0];
            for (let bid of filteredBids) {
                if (bid.price > winnerBid.price) {
                    winnerBid = bid;
                }
            }
            this.winnerBids.add(winnerBid);
        }
        return this.winnerBids;
    }
    getBids() {
        return this.bids;
    }
    stopAuction() {
        clearInterval(this.timerId);
    }
    getMaxBidByAuctId(auctId, winnerBid) {
    }
}
exports.Auction = Auction;
