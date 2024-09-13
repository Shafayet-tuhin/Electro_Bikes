import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useCart = () => {
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    const { isLoading: cartLoading, refetch: refetchCart, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            // Check if user email exists to avoid making unnecessary calls
            if (!user?.email) {
                return [];
            }

            const res = await fetch(`https://ebikes-ten.vercel.app/cart?email=${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Check for HTTP errors
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            return res.json();
        },
        enabled: !!user?.email, // Only run the query if the email exists
    });

    return [cartLoading, cart, refetchCart];
};

export default useCart;
