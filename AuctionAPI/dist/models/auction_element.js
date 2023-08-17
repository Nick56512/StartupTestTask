"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionElement = void 0;
class AuctionElement {
    constructor(id, description, startingBid, endAuction, endTime) {
        this.remainder = 0;
        this.endAuction = false;
        this.id = id;
        this.description = description;
        this.endTime = endTime,
            this.startingBid = startingBid;
        this.endAuction = endAuction;
    }
    getId() {
        return this.id;
    }
    static countdownDate(auct) {
        try {
            const current = new Date();
            const endDate = Date.parse(auct.endTime.toLocaleString());
            if (endDate <= current.valueOf()) {
                auct.endAuction = true;
                return;
            }
            auct.remainder = endDate - current.valueOf();
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.AuctionElement = AuctionElement;
