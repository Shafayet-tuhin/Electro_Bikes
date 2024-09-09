import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useCart = () => {
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    const { isPending, refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            // Check if user email exists to avoid making unnecessary calls
            if (!user?.email) {
                return [];
            }

            const res = await fetch(`http://localhost:3000/cart?email=${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            return res.json();
        },
      
    });

    return [isPending, cart, refetch];
};

export default useCart;
