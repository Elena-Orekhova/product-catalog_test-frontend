import { TCard } from "@/components/Card/types";

interface RawProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const normalizeProduct = (item: RawProduct): TCard => ({
  id: item.id.toString(),
  title: item.title,
  price: item.price,
  description: item.description,
  category: item.category,
  image: item.image,
  quantity: 10,
});

export const api = {
  getProducts: async (signal: AbortSignal): Promise<TCard[]> => {
    const response = await fetch("/api/products", { signal });
    const data: RawProduct[] = await response.json();
    return data.map(normalizeProduct);
  },

  getCategories: async (signal: AbortSignal): Promise<string[]> => {
    const response = await fetch("/api/products/categories", { signal });
    return response.json();
  },
};
