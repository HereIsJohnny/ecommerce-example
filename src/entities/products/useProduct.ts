import { useQuery } from 'react-query'
import { ProductApiClass } from './productApi'

const api = new ProductApiClass()

const USE_PRODUCTS_KEY = 'products'
export function useProducts() {
	return useQuery(USE_PRODUCTS_KEY, () => api.getProducts())
}

const USE_PRODUCT_KEY = 'product'
export function useProduct(id: string) {
	return useQuery([USE_PRODUCT_KEY, id], () => api.getProduct(id))
}