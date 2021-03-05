export class Post{
    constructor(
        public id: number,
        public user_id: number,
        public category_id: number,
        public title: string,
        public author: string,
        public document_type_id: string,
        public createdAt: any
    ){}
}
