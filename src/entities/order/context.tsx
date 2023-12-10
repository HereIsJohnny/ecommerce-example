import { createContext, useState } from "react";

export const OrderContext = createContext<OrderContext>({ orderDetails: undefined, addToCart: () => { } });

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [order, setOrder] = useState<Order>({ products: [] });

    function addToCart(product: OrderProduct) {
        setOrder((order) => {
            const index = order.products.findIndex((p) => p.id === product.id);
            const existingProduct = index > -1;
            const isDeleteAction = product.quantity === 0;

            // delete product
            if (existingProduct && isDeleteAction) {
                const newProducts = [...order.products];
                newProducts.splice(index, 1);

                return {
                    ...order,
                    products: newProducts,
                }
            }

            // update product quantity
            if (existingProduct) {
                const newProducts = [...order.products];
                newProducts[index].quantity = product.quantity;

                return {
                    ...order,
                    products: newProducts,
                }
            }

            // add new product
            return {
                ...order,
                products: [
                    ...order.products,
                    {
                        id: product.id,
                        quantity: 1,
                    }
                ]
            }
        })

    }

    return <OrderContext.Provider value={{
        orderDetails: order,
        addToCart,
    }}>
        {children}
    </OrderContext.Provider>
}