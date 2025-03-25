export interface ICart {
    id:number
    name: string;
    price: number;
    image: string;
    quantity: number;
    status:"Cho SN" | "DA SN" | "Da Giao Hang"|"GHTC"|"GHTB";
}
export type IForm = Omit<ICart,"id">