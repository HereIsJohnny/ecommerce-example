import { useProducts } from '~/entities/products'
import { ProductCard } from '~/components/ProductCard';
import { ProductGrid } from '~/components/ProductGrid';
import { Box } from '@chakra-ui/react';

export default function Home() {
	const { data, isLoading } = useProducts();

	return (
		<Box
			maxW="7xl"
			mx="auto"
			px={{ base: '4', md: '8', lg: '12' }}
			py={{ base: '6', md: '8', lg: '12' }}
		>
			<ProductGrid>
				{data?.map((product) => <ProductCard key={product.id} product={product} />)}
			</ProductGrid>
		</Box>
	)
}
