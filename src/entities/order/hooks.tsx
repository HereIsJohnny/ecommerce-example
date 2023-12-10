import { useContext } from "react";
import { OrderContext } from "./context";

export function useOrder() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within a OrderProvider');
    }
    return context;
}