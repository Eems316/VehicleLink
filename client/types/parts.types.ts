// types related to parts
export type PartRow = {
    partId: number;
    name: string;
    category: string;
    price: number;
};

export type PartCategory = {
    category: string;
    parts: PartRow[];
}