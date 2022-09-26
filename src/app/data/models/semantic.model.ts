export interface Semantic {

    id:number;
    name:string;
    guid:string;
    parent?:Semantic;
    path:string;
    idPath:string;
    guidPath:string;
}