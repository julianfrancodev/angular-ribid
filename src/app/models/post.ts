export class Post{
    constructor(
        public id: number,
        public user_id: number,
        public category_id: number,
        public title: string,
        public author: string,
        public createdAt: any
    ){}
}