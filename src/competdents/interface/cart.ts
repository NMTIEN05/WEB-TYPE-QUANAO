export interface ICart {
    id:number
    name: string;
    price: string; 
    email:string; 
    image: string;
    quantity: number;
    Payment_method:"VNPAY"|"COD";
    sl: number; 
    status:"Cho SN" | "DA SN" | "Da Giao Hang"|"GHTC"|"GHTB";
}
export type IForm = Omit<ICart,"id">