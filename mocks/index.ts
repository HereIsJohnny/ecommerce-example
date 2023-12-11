console.log('mocks/index.ts')

async function initMocks() {
	console.log('init mocks')
	if (typeof window === 'undefined') {
		const { server } = await import('./server')
		server.listen()
	} else {
		const { worker } = await import('./browser')
		worker.start()
	}
}

initMocks()

export {}
