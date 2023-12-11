import { createContext, useMemo, useState } from "react";
import { orderApi } from "./api";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";

export const OrderContext = createContext<OrderContext>({
    orderDetails: undefined,
    addToCart: () => { },
    getFromCart: () => undefined,
    totalItems: 0,
    buyOrder: () => { }
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<Order>({ products: [] });
    const useCreateOrder = useMutation((order: PostOrder) => orderApi.createNewOrder(order), { retry: 10 })
    const useBuyOrder = useMutation((orderId: number) => orderApi.buyOrder(orderId), { retry: 10 });
    const toast = useToast()

    // todo: refactor to reducer and split into 3 actions. unit test
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

    async function buyOrder() {
        async function buyOrderCalls(): Promise<{ orderStatus: 'success' | 'error' }> {
            try {
                const response = await useCreateOrder.mutateAsync({
                    // move to service
                    products: Object.values(state.products).map(({ id, quantity }) => ({ id, quantity })),
                });
                await useBuyOrder.mutateAsync(response.id);

                setState({ products: [] });

            } catch (error) {
                return { orderStatus: 'error' };
            }

            return { orderStatus: 'success' };
        }

        const toastId = toast({
            title: "Processing order.",
            description: "We are processing your order.",
            status: 'loading',
            duration: 5000,
            isClosable: true,
        })

        // TODO: fix typing in buyOrder
        const res = await buyOrderCalls()

        toast.close(toastId)

        toast({
            title: res.orderStatus === 'error' ? "An error occurred." : "Success.",
            description: res.orderStatus === 'error' ? "Unable to buy order." : "Order bought successfully.",
            status: res.orderStatus,
            duration: 5000,
            isClosable: true,
        })
    }

    return <OrderContext.Provider value={{
        orderDetails: state,
        addToCart,
        getFromCart,
        totalItems,
        buyOrder,
    }}>
        {children}
    </OrderContext.Provider>
}