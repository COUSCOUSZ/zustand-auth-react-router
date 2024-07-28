import { LoaderFunctionArgs, redirect } from "react-router-dom";
import useAuthStore from "../store/authStore";


export const protectedLoader = ({request}:LoaderFunctionArgs) => {
    const user = useAuthStore.getState().user;
    if (!user) {
        console.log("yoo go back");
        let params = new URLSearchParams();
        params.set("from",new URL(request.url).pathname);
        return redirect('/login?'+params.toString());
    }
    return user;
}