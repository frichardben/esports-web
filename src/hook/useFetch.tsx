import { useEffect, useState } from "react";


export function useFetch(url: string, options?: object) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(err => setError(err))
    },[])

    return {
        data,
        error
    }
}