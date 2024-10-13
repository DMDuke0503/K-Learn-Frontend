import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    const [, setCookie] = useCookies(['authorization']);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const role = params.get("role");
        const type = params.get("type");
        console.log(role, type);
        if (token) {
            setCookie('authorization', token, { path: '/' });
            
            params.delete("token");
            window.history.replaceState({}, document.title, window.location.pathname);

            navigate("/", { replace: true });
        } else {
            console.error("Token not found in URL");
            navigate("/");
        }
    }, [navigate, setCookie]);

    return <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;