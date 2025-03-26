export interface IComment {
    id:number,
    comment : string,
    productId: number;
}
export type IFormCommet = Omit<IComment,"id">