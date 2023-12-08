import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "~/lib/queryClients";
import { OrderApiClass } from "./OrderApi";

const api = new OrderApiClass();

function useCreateOrder() {
    return useMutation((order: PostOrder) => api.createNewOrder(order))
}

const GET_ORDER_KEY = 'order';
function useGetOrder(id?: number) {
    return useQuery([GET_ORDER_KEY, id], () => id ? api.getOrder(id) : Promise.resolve(undefined));
}

function useAddToCart(orderId: number) {
    return useMutation((patch: PatchOrder) => api.patchOrder(orderId, patch));
}

export function useOrder() {
    const createOrder = useCreateOrder();
    const [cookies, setCookie] = useCookies(['orderId']);
    const { orderId } = cookies;
    const { data: orderDetails } = useGetOrder(orderId)
    const addToCart = useAddToCart(orderId);

    const handleAddToCart = async (product: Product) => {
        if (!orderId) {
            const response = await createOrder.mutateAsync({
                products: [{
                    id: product.id,
                    quantity: 1,
                }],
            });

            setCookie('orderId', response.id);

        } else {
            addToCart.mutate({
                id: product.id,
                quantity: 1,
            });
        }
        queryClient.invalidateQueries(GET_ORDER_KEY);
    };

    return {
        addToCart: handleAddToCart,
        orderDetails
    }
}