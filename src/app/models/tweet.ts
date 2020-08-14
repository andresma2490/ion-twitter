export interface Tweet {
    id?:string,
    userId:string,
    description:string,
    image?:string,
    likes:number,
    create_date:Date,
    update_date?:Date
}
