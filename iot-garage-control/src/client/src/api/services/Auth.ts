import { useQuery } from "@tanstack/react-query";

import client from "./../client";

export default {
    useData: () => {
        useQuery({
            queryKey: ["auth"], queryFn: async () => {
                try {
                    return await client.get("auth").json();
                } catch (err) {
                    return Promise.reject(err);
                }
            },
            refetchInterval: 10000
        })
    }
}
