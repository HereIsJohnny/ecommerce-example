// import fs from 'fs'
// import { normalize, schema } from 'normalizr'
// import products from './products.json'
// import groupBy from 'lodash/groupBy'

// const product = new schema.Entity('products', {
// 	category: new schema.Entity('categories', {}, { idAttribute: 'name' }),
// })

// const normalizedData = normalize(products, [product])

// const productsByCategory = groupBy(normalizedData.result, (id) => normalizedData.entities.products[id]?.category)

// const result = { ...normalizedData, productsByCategory }

// fs.writeFileSync('./normalized-products.json', JSON.stringify(result, null, 2))
