import { rest } from 'msw'
import products from './products.json'
import categories from './categories.json'

const baseURI = `${process.env.NEXT_PUBLIC_API}`

export const handlers = [
	rest.get(`${baseURI}/products`, (_req, res, ctx) => {
		console.log('handle products')
		return res(ctx.json(products))
	}),

	rest.get(`${baseURI}/categories`, (_req, res, ctx) => {
		console.log('handle categories')
		return res(ctx.json(ctx.json(categories)))
	}),
]
