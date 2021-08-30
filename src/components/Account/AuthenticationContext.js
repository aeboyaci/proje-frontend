import {createContext, useContext, useEffect} from "react";

export const AuthenticationContext = createContext(null);
export const useAuth = () => {
    const [token, setToken] = useContext(AuthenticationContext);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
        else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const set = (t) => {
        setToken(t);
        localStorage.setItem("token", t);
    }

    return [token, set];
}