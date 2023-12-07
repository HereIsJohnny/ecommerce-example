import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '~/lib/queryClients';
import { ChakraProvider } from '@chakra-ui/react';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('../../mocks/index.ts')
}

export default function App({ Component, pageProps }: AppProps) {
	return <QueryClientProvider client={queryClient}>
		<ReactQueryDevtools initialIsOpen={false} />
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	</QueryClientProvider>
}
