// import { useLoading } from "@/context/LoadingContext";

export const getCartCount = (setLoading) => {
    // const { setLoading } = useLoading();
    // setLoading(true);

    let totalCount = 0;
    for (const items in cartItems) {
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                // ignore
            }
        }
    }

    // setLoading(false);

    return totalCount;
};
