import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

 const useBikes = () => {

const {data : Bikes =[] , isLoading : loading , refetch} = useQuery({
    queryKey : [ 'Bikes' ],
    queryFn : async () => {
        const res = await fetch('http://localhost:3000/bikes')
        return res.json()
    },

})
    return [Bikes , loading , refetch];
};

export default useBikes;