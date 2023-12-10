import { useMemo } from "react";
import { useProductCategoriesQuery, useProductsQuery } from "./service";
import groupBy from 'lodash/groupBy';

export function useProducts() {
    const productsQ = useProductsQuery();
    const categoriesQ = useProductCategoriesQuery();

    const isLoading = productsQ.isLoading || categoriesQ.isLoading;
    const isError = productsQ.isError || categoriesQ.isError;

    const productsByCategory = useMemo(() => { console.log('recalculationg'); return groupBy(productsQ.data, 'category.name') }, [productsQ.data]);

    return {
        isLoading,
        isError,
        productsByCategory,
        categories: categoriesQ.data,
    };
}