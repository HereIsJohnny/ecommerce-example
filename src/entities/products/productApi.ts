import { BaseApiClass } from '../../lib/baseApi'

export class ProductApiClass extends BaseApiClass {
	private mapper = (data: ProductDTO): Product => {
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

	public async getProducts() {
		return this.get<ProductDTO[], Product[]>('/products', (data) => data.map(this.mapper))
	}

	public async getProduct(id: string) {
		return this.get<ProductDTO, Product>(`/products/${id}`, this.mapper)
	}
}
