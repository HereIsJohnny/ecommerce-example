import { useMutation, useQuery } from "react-query";
import { orderApi } from "./api";

export function useCreateOrder() {
    return useMutation((order: PostOrder) => orderApi.createNewOrder(order))
}

const GET_ORDER_KEY = 'order';
export function useGetOrder(id?: number) {
    return useQuery([GET_ORDER_KEY, id], () => id ? orderApi.getOrder(id) : Promise.resolve(undefined));
}

export function useAddToCart(orderId: number) {
    return useMutation((patch: PatchOrder) => orderApi.patchOrder(orderId, patch));
}