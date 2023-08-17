"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionRepository = void 0;
const generic_repository_1 = require("./generic_repository");
class AuctionRepository extends generic_repository_1.GenericRepository {
    constructor(jsonFileName) {
        super(jsonFileName);
    }
}
exports.AuctionRepository = AuctionRepository;
