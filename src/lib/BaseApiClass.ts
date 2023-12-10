export class BaseApiClass {
	protected addBaseUrl(url: string) {
		return `${process.env.NEXT_PUBLIC_API}${url}`
	}

	protected async get<T>(url: string) {
		const res = await fetch(this.addBaseUrl(url))

		if (!res.ok) {
			const error = await res.json()
			throw new Error(error.message)
		}

		const data = await res.json()
		return data as T
	}

	protected async post<T, U = {}>(url: string, payload: U) {
		const res = await fetch(this.addBaseUrl(url), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		if (!res.ok) {
			const error = await res.json()
			throw new Error(error.message)
		}

		// Check for 204 No Content
		if (res.status === 204) {
			return {} as T // Or handle as needed
		}

		const data = await res.json()

		return data as T
	}

	protected async patch<T, U = {}>(url: string, payload: U) {
		const res = await fetch(this.addBaseUrl(url), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		if (!res.ok) {
			const error = await res.json()
			throw new Error(error.message)
		}

		const data = await res.json()

		return data as T
	}
}
