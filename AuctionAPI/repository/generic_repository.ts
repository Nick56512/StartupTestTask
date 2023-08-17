import fs from "fs";
export abstract class GenericRepository<T> implements IRepository<T>
{
    jsonFileName:string;

    constructor(jsonFileName:string)
    {
        this.jsonFileName=jsonFileName;
    }

    public saveChanges(entities:T[]):void
    {
        const jsonStr=JSON.stringify(entities,null,4);
        fs.writeFileSync(this.jsonFileName,jsonStr);
    }
    public getAll():T[]
    {
        let entities:T[];
        const buffer=fs.readFileSync(this.jsonFileName);
        entities=JSON.parse(buffer.toString("utf8"));
        return entities;
    }

    public get(id:number):T
    {
        let entities:any[]=this.getAll();
        return entities.find(e=>e.id==id);
    }
    public create(entity:any):T
    {
        let entities:any[]=this.getAll();
        const id = Math.max.apply(Math,entities.map(
            function(e){
                return e.id;
            })
        )
        entity.id=id+1;
        entities.push(entity);
        this.saveChanges(entities);
        return entity;
    }
    public delete(id:number):T
    {
        let entities:any[]=this.getAll();
        const index=entities.findIndex(e=>e.id==id);
        const removeItem=entities.splice(index,1)[0];
        this.saveChanges(entities.filter(e=>e.id==id));
        return removeItem;
    }
}