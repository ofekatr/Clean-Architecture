import { useEffect, useState } from "react";
import { setAccessToken } from "../services/jwt.service";

function useRefreshToken() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await fetch("http://localhost:8080/auth/refresh-token", {
                method: "POST",
                credentials: "include",
            });
            const body = await data.json();
            if (body.accessToken) {
                setAccessToken(body.accessToken);
            }
            setLoading(false);
        })();
    }, []);

    return loading;
}

export default useRefreshToken;