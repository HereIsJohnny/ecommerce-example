import { useQuery } from 'react-query'
import { api } from './api'

export const USE_PRODUCTS_KEY = 'products'
export const useProductsQueryProps = [USE_PRODUCTS_KEY, () => api.getProducts()]
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
