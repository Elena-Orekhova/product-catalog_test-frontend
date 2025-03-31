import { useState, useEffect, useMemo } from "react";
import { TCard } from "@/components/Card/types";
import { TFilters } from "@/pages/FiltersModal/types";
import { api } from "@/api/products";

export const useProducts = (filters: TFilters) => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.getProducts(new AbortController().signal),
          api.getCategories(new AbortController().signal),
        ]);

        setCards(productsResponse);
        setCategories(categoriesResponse);
      } catch (err) {
        setError("Ошибка при загрузке данных");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch = card.title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      const matchesPrice =
        card.price >= filters.minPrice && card.price <= filters.maxPrice;
      const matchesCategory =
        !filters.category || card.category === filters.category;

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [cards, filters]);

  return {
    cards: filteredCards,
    categories,
    error,
    isLoading,
  };
};
