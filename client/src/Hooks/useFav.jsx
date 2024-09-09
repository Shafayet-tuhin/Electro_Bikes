import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useFav = () => {
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    const { isLoading, refetch: refetchFavorites, data: fav = [] } = useQuery({
        queryKey: ['fav', user?.email],
        queryFn: async () => {
         
            if (!user?.email) {
                return [];
            }

            const res = await fetch(`http://localhost:3000/favorites?email=${user.email}`, {
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

    return [isLoading, fav, refetchFavorites];
}

export default useFav;
