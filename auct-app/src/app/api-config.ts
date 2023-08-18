export class ApiConfig{

    private static baseHtppUrl:string='http://localhost:';
    private static httPort:number=9000;

    private static baseWsUrl:string='ws://localhost:';
    private static wsPort:number=8000;

    public static getWsUrl():string{
        return `${this.baseWsUrl}${this.wsPort}`;
    }

    public static getHttpUrl():string{
        return `${this.baseHtppUrl}${this.httPort}`;
    }
}