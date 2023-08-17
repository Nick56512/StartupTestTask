"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidRepository = void 0;
const generic_repository_1 = require("./generic_repository");
class BidRepository extends generic_repository_1.GenericRepository {
    constructor(jsonFileName) {
        super(jsonFileName);
    }
}
exports.BidRepository = BidRepository;
