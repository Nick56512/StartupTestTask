"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
const fs_1 = __importDefault(require("fs"));
class GenericRepository {
    constructor(jsonFileName) {
        this.jsonFileName = jsonFileName;
    }
    saveChanges(entities) {
        const jsonStr = JSON.stringify(entities, null, 4);
        fs_1.default.writeFileSync(this.jsonFileName, jsonStr);
    }
    getAll() {
        let entities;
        const buffer = fs_1.default.readFileSync(this.jsonFileName);
        entities = JSON.parse(buffer.toString("utf8"));
        return entities;
    }
    get(id) {
        let entities = this.getAll();
        return entities.find(e => e.id == id);
    }
    create(entity) {
        let entities = this.getAll();
        const id = Math.max.apply(Math, entities.map(function (e) {
            return e.id;
        }));
        entity.id = id + 1;
        entities.push(entity);
        this.saveChanges(entities);
        return entity;
    }
    delete(id) {
        let entities = this.getAll();
        const index = entities.findIndex(e => e.id == id);
        const removeItem = entities.splice(index, 1)[0];
        this.saveChanges(entities.filter(e => e.id == id));
        return removeItem;
    }
}
exports.GenericRepository = GenericRepository;
