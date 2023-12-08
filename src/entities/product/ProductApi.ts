import { BaseApiClass } from '../../lib/BaseApiClass'

const productMapper = (data: ProductDTO): Product => {
	return {
		id: data.id,
		name: data.name,
		description: data.description,
		imageSrc: data.image,
		price: data.price,
		category: {
			name: data.category.name,
			order: data.category.order,
		},
	}
}

const categoryMapper = (data: CategoryDTO): Category => {
	return {
		name: data.name,
		order: data.order,
	}
}

export class ProductApiClass extends BaseApiClass {
	public async getProducts() {
		const data = await this.get<ProductDTO[]>('/products')
		return data.map(productMapper)
	}

	public async getProduct(id: string) {
		const data = await this.get<ProductDTO>(`/products/${id}`)
		return productMapper(data)
	}

	public async getProductCategories() {
		const data = await this.get<CategoryDTO[]>('/categories')
		return data.sort((a, b) => a.order - b.order).map(categoryMapper)
	}
}
