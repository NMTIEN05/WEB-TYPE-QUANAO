export interface Iproduct {
    id: string | number,
    name: string,
    describe: string, 
    image: string,
    categorys:string,
    price: number,
}
export type Ifrom = Omit<Iproduct, "id">