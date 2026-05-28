export type Category = "mechanical" | "electrical";
export type Status = "New" | "Old";

export type Product = {
  id: string;
  category: "mechanical" | "electrical";
  subcategory: string;
  image: string;
  company?: string | null;
  city: string;
  state: string;
  inStock: boolean;
  status?: "New" | "Old"; // Badge
  gstNumber?:string; 
};
