import axios from "axios";
import { toast } from "react-toastify";

const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;

// ⬇️ pass setLoading as argument
export const getProductsData = async (setLoading) => {
    try {
        if (setLoading) setLoading(true);
        const response = await axios.get(dbUri + "/api/product/list");
        if (response.data.success) {
            return response.data.products.reverse();
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    } finally {
        if (setLoading) setLoading(false);
    }
};
