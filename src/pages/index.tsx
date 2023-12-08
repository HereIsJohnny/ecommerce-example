import { ProductCard } from '~/components/ProductCard';
import { ProductGrid } from '~/components/ProductGrid';
import { Box, Heading, Stack } from '@chakra-ui/react';
import Menu from '~/components/Menu';
import groupBy from 'lodash/groupBy';
import { useMemo } from 'react';
import { useProductCategories, useProducts } from '~/entities/product/useProduct';
import { useOrder } from '~/entities/order/useOrder';

export default function Home() {
	const { data: products } = useProducts();
	const { data: categories } = useProductCategories();
	const productsByCategory = useMemo(() => groupBy(products, 'category.name'), [products]);
	const { orderDetails, addToCart } = useOrder();

	console.log('orderDetails', orderDetails)

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
									<ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />
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
