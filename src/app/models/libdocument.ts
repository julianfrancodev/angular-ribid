export class LibDocument{
  constructor(
      public id: number,
      public user_id: string,
      public author: string,
      public file_lib: string,
      public title: string,
      public section: string,
      public pages: string,
      public document_type_id: string,
      public category_id: string,
      public createdAt: string
  ){}
}
