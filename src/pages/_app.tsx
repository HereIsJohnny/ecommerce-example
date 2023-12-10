import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { OrderProvider } from '~/entities/order/context';
import '~/styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('../../mocks/index.ts')
}

export default function App({ Component, pageProps }: AppProps) {
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

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ChakraProvider>
					<OrderProvider>
						<Component {...pageProps} />
					</OrderProvider>
				</ChakraProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}
