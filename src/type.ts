export interface Todo{
    id: number;
    text: string;
    completed: boolean;
    category: TodoCategory
}

export enum TodoCategory{
    Food = "food",
    Groceries = "groceries",
    Default = "default"
}