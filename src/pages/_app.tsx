import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { Hydrate, Query, QueryClient, QueryClientProvider, dehydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { OrderProvider } from '~/entities/order/context';
import { useState } from 'react';
import { USE_PRODUCTS_KEY, USE_PRODUCT_CATEGORIES } from '~/entities/products/service';
import { api } from '~/entities/products/api';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('../../mocks/index.ts')
}

export default function App({ Component, pageProps }: AppProps) {

	console.log('page props', pageProps)

	// This ensures that data is not shared 
	// between different users and requests
	const [queryClient] = useState(() => new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				// retry: false,
				// staleTime: 1000 * 60 * 5, // 5 minutes
			},
		},
	}))

	return <QueryClientProvider client={queryClient}>
		<ReactQueryDevtools initialIsOpen={false} />
		<Hydrate state={pageProps.dehydratedState}>
			<ChakraProvider>
				<OrderProvider>
					<Component {...pageProps} />
				</OrderProvider>
			</ChakraProvider>
		</Hydrate>
	</QueryClientProvider>
}


export const getStaticProps = async () => {

	const queryClient = new QueryClient()

	// prefetch data on the server
	await queryClient.fetchQuery(USE_PRODUCTS_KEY, () => api.getProducts())
	await queryClient.fetchQuery(USE_PRODUCT_CATEGORIES, () => api.getProductCategories())

	console.log('dehydrate', dehydrate(queryClient))

	return {
		props: {
			// dehydrate query cache
			dehydratedState: dehydrate(queryClient),
			abc: 12,
		},
	}
}
