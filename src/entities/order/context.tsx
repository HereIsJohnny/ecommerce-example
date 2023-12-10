import { createContext, useMemo, useState } from "react";

export const OrderContext = createContext<OrderContext>({ orderDetails: undefined, addToCart: () => { }, getFromCart: () => undefined, totalItems: 0 });

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<Order>({ products: [] });

    function addToCart(product: OrderProduct) {
        setState((order) => {
            const existingProduct = state.products[product.id];
            const isDeleteAction = product.quantity === 0;

            // delete product
            if (existingProduct && isDeleteAction) {
                const newProducts = { ...order.products };
                delete newProducts[product.id];
                return {
                    ...order,
                    products: newProducts,
                }
            }

            // update product quantity
            if (existingProduct) {
                const newProducts = { ...order.products };
                newProducts[product.id].quantity = product.quantity;

                return {
                    ...order,
                    products: newProducts,
                }
            }

            // add new product
            return {
                ...order,
                products: {
                    ...order.products,
                    [product.id]: {
                        id: product.id,
                        quantity: 1,
                    }
                }
            }
        })

    }

    function getFromCart(productId: number) {
        return state.products[productId];
    }

    const totalItems = useMemo(() => Object.values(state.products).reduce((acc, { quantity }) => acc + quantity, 0), [state.products]);

    return <OrderContext.Provider value={{
        orderDetails: state,
        addToCart,
        getFromCart,
        totalItems,
    }}>
        {children}
    </OrderContext.Provider>
}