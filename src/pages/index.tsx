import { Box, Heading, Stack } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import Menu from '~/components/Menu';
import { ProductCard } from '~/components/ProductCard';
import { ProductGrid } from '~/components/ProductGrid';
import { useOrder } from '~/entities/order';
import { useProducts } from '~/entities/products';

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
