export class User{
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public role: string,
        public email: string,
        public password: string,
        public image: string,
        public phone: string,
        public birth_date: string,
    ){}
}
