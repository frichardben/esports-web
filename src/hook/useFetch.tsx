import { useEffect, useState } from "react";
import axios from 'axios'


export function useFetch(url: string, options?: object) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null);

        axios(url)
          .then(response => {
            setData(response.data)
          })
          .catch(err => setError(err))
    },[])

    return {
        data,
        error
    }
}