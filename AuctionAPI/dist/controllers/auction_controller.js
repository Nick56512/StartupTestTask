"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionController = void 0;
class AuctionController {
    constructor(_auctionRepository) {
        this._auctionRepository = _auctionRepository;
    }
    getAllAuctions(request, response) {
        return response.send(this._auctionRepository.getAll());
    }
    get(request, response) {
        const id_str = request.params.id;
        const id = parseInt(id_str);
        if (id != 0) {
            const entity = this._auctionRepository.get(id);
            return response.send(entity);
        }
        return response.status(404);
    }
    create(request, response) {
        if (!request.body) {
            console.log(request.body);
            return response.sendStatus(400);
        }
        const auctItem = JSON.parse(request.body);
        this._auctionRepository.create(auctItem);
        return response.sendStatus(200);
    }
}
exports.AuctionController = AuctionController;
