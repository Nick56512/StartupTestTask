"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const auction_element_1 = require("./models/auction_element");
class Auction {
    constructor(_auctRepository, _bidRepository) {
        this._auctRepository = _auctRepository;
        this._bidRepository = _bidRepository;
        this.auctionElements = _auctRepository.getAll();
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
        const auctIndex = this.auctionElements.findIndex(x => x.id == newBid.auctionElementId);
        if (!this.checkBidSumHigher(this.auctionElements[auctIndex], newBid.price)) {
            return false;
        }
        this.auctionElements[auctIndex].winnerBid = newBid;
        this._bidRepository.create(newBid);
        this._auctRepository.saveChanges(this.auctionElements);
        return true;
    }
    getAuctionList() {
        return this.auctionElements;
    }
    checkBidSumHigher(auctElement, newSum) {
        if (auctElement.winnerBid === undefined) {
            return true;
        }
        if (auctElement.winnerBid.price < newSum) {
            return true;
        }
        return false;
    }
    stopAuction() {
        clearInterval(this.timerId);
    }
}
exports.Auction = Auction;
