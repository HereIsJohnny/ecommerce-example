export class BaseApiClass {
	protected addBaseUrl(url: string) {
		return `${process.env.NEXT_PUBLIC_API}${url}`
	}

	// take generics from Finavia.
	protected async get<T, U>(url: string, mapper: (data: T) => U) {
		const res = await fetch(this.addBaseUrl(url))
		const data = await res.json()

		if (mapper) {
			return mapper(data)
		}
	}
}
