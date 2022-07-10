import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(false);
                const res = await fetch(url, {
                    method: method || "GET",
                    headers
                });
                const data = await res.json()
                setLoading(false)
                setResult(data);


            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return {
        loading,
        error,
        result
    }


}