export type Category = "mechanical" | "electrical";
export type Status = "New" | "Old";

export type Product = {
  id: string;
  category: Category;
  status: Status;
  // other fields...
};
