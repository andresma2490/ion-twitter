export class Tweet {
    id?:string;
    userId:string;
    author:string;
    description:string;
    image?:string;
    likes:number;
    comments:Array<any>;
    create_date:Date;
    update_date?:Date;
}
