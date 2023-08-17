interface IRepository<T>{
    getAll():T[];
    get(id:number):T
    create(entity:T):T,
    delete(id:number):T
    saveChanges(entities:T[]):void
}
