import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
    const [cookies, setCookie] = useCookies(['authorization']);
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            usernameOrEmail: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);

        await axios.post("http://localhost:8080/api/auth/login", data)
        .then((res) => {
            console.log(res);

            if (res.status === 200) {
                navigate("/");
                setCookie('authorization', res.data.accessToken, { path: '/' });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const googleLogin = () => {
        const redirectUri = "http://localhost:5173/oauth2/redirect";
        window.location.href = `http://localhost:8080/oauth2/authorization/google?redirect_uri=${redirectUri}`;
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="h-[12%] flex flex-row items-end mx-20">
                <img src="/logo.png" alt="" style={{ width: 70, height: "auto" }} />
                <p className="font-montserrat text-4xl font-bold py-[5px]" style={{ color: "#FCD24F" }}>K-LEARN</p>
            </div>
            <div className="h-[88%] flex justify-center items-center">
                <img src="/nha_hanok.png" alt="" className="w-full h-full z-1" />
                <div className="h-4/5 w-4/5 absolute z-50 flex flex-col items-center justify-center" style={{ backgroundColor: "#0000004C" }} >
                    <p className="font-montserrat text-5xl font-bold mt-20" style={{ color: "#FFFFFF" }}>ĐĂNG NHẬP</p>
                    <div className="flex flex-col justify-evenly items-center h-4/5 w-4/5">
                        <Form {...form} className="text-white">
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 flex flex-col justify-center items-center space-y-5 py-3">
                                <FormField
                                    control={form.control}
                                    name="usernameOrEmail"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input placeholder="Email / Tên tài khoản" className="bg-white h-14 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input type="password" placeholder="Nhập mật khẩu" className="bg-white h-14 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full h-[50px] my-5 rounded-2xl font-montserrat font-bold text-xl p-3" style={{ border: "2px solid #959699" }} type="submit">ĐĂNG NHẬP</Button>
                            </form>
                        </Form>
                        <div className="w-1/2 flex flex-row justify-between">
                            <p className="font-montserrat font-bold text-md" style={{ color: "#FFFFFF" }}>Quên mật khẩu?</p>
                            <Link to="/register"><p className="font-montserrat font-bold text-md" style={{ color: "#FFFFFF" }}>Đăng ký tài khoản</p></Link>
                        </div>
                        <div className="w-1/2 flex flex-row justify-center items-center">
                            <div className="h-[1px] w-1/2" style={{ backgroundColor: "#FFFFFF" }}></div>
                            <p className="font-montserrat font-bold text-md px-3" style={{ color: "#FFFFFFCC" }}>HOẶC</p>
                            <div className="h-[1px] w-1/2" style={{ backgroundColor: "#FFFFFF" }}></div>
                        </div>
                        <div className="w-1/2 flex flex-row justify-center">
                            <button className="flex flex-row justify-center items-center w-1/3 h-auto p-2 rounded-2xl" style={{ backgroundColor: "#FFFFFF" }} onClick={googleLogin}>
                                <img src="/google.png" alt="" />
                                <p className="font-montserrat font-bold text-md px-2" style={{ color: "#000000" }}>Google</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;