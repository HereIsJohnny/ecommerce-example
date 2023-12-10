import { useQuery } from 'react-query'
import { ProductApiClass, api } from './api'

export const USE_PRODUCTS_KEY = 'products'
export function useProductsQuery() {
	return useQuery(USE_PRODUCTS_KEY, () => api.getProducts())
}

const USE_PRODUCT_KEY = 'product'
export function useProductQuery(id: string) {
	return useQuery([USE_PRODUCT_KEY, id], () => api.getProduct(id))
}

export const USE_PRODUCT_CATEGORIES = 'productCategories'
export function useProductCategoriesQuery() {
	return useQuery(USE_PRODUCT_CATEGORIES, () => api.getProductCategories())
}
