
export interface Icategory {
    id: string | number,
    namecategory: string,
    describe: string,

    image: string,
}
export type IFormCategory = Omit<Icategory, "id">
