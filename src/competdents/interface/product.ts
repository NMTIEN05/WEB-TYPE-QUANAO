export interface Iproduct {
    id: number,
    name: string,
    describe: string, 
    image: string,
    categorys:number,
    price: number,
}
export type Ifrom = Omit<Iproduct, "id">