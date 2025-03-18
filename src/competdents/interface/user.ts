export interface Iuser {
    id: string | number,
    name: string,
    sdt: string, 
    email:string,
    password: number,
}
export type IRegister = Omit<Iuser, "id">
export type ILogin = Pick<Iuser, "email"|"password">