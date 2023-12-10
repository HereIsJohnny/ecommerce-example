import { Box, Heading, Stack } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import Menu from '~/components/Menu';
import { ProductCard } from '~/components/ProductCard';
import { ProductGrid } from '~/components/ProductGrid';
import { useOrder } from '~/entities/order';
import { useProducts } from '~/entities/products';
import { api } from '~/entities/products/api';
import { USE_PRODUCTS_KEY, USE_PRODUCT_CATEGORIES } from '~/entities/products/service';

export default function Home() {
	const { productsByCategory, categories, isLoading: isProductsLoading } = useProducts();
	const { addToCart, getFromCart } = useOrder();

	const memoAddToCart = useCallback((props: OrderProduct) => addToCart(props), [addToCart]);

	return (
		<Stack spacing={{
			base: '4',
			md: '6',
			lg: '8',
		}}>
			<Menu />
			{categories?.map((category) => (
				<Box key={category.name}>
					<Box
						maxW="7xl"
						mx="auto"
						pl={{ base: '8', md: '16', lg: '32' }}
						pr={{ base: '4', md: '8', lg: '12' }}
						py={{ base: '6', md: '8', lg: '12' }}
					>

						<Heading size="4xl" key={category.name} mb={{
							base: '4',
							md: '6',
							lg: '8',
						}}>
							{category.name}
						</Heading>
						<Box


						>
							<ProductGrid key={category.name}>
								{productsByCategory[category.name]?.map((product) => (
									<ProductCard
										key={product.id}
										id={product.id}
										imageSrc={product.imageSrc}
										price={product.price}
										name={product.name}
										onAdd={memoAddToCart}
										currentQuantity={getFromCart(product.id)?.quantity || 0}
									/>
								))}
							</ProductGrid>
						</Box>
					</Box >
				</Box>
			))
			}
		</Stack >
	)
}

export async function getStaticProps() {

	const queryClient = new QueryClient()

	// prefetch data on the server
	await queryClient.prefetchQuery(USE_PRODUCTS_KEY, () => api.getProducts())
	await queryClient.prefetchQuery(USE_PRODUCT_CATEGORIES, () => api.getProductCategories())

	console.log('dehydrate', dehydrate(queryClient))

	return {
		props: {
			// dehydrate query cache
			dehydratedState: dehydrate(queryClient),
			abc: 'abc'
		},
	}
}
