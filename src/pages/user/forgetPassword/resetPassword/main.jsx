import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import Header from "@/components/Header";
import { data } from "autoprefixer";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [otp, setOTP] = useState("");
    const [password, setPassword] = useState({
        newPassword: "",
        reNewPassword: ""
    });

    const googleLogin = () => {
        const redirectUri = "http://localhost:5173/oauth2/redirect";
        window.location.href = `http://localhost:8080/oauth2/authorization/google?redirect_uri=${redirectUri}`;
    };

    const handleResetPassword = async () => {
        try {
            const res = await axios({
                method: "PUT",
                url: `http://localhost:8080/api/user/update-password`,
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
                data: password
            });

            console.log(res.data);
            if (res.data) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col">
            <Header></Header>
            <div className="flex justify-center items-center" style={{height: "calc(100vh - 70px)"}}>
                <img src="/nha_hanok.png" alt="" className="w-full h-full z-1" />
                <div className="h-4/5 w-4/5 absolute z-50 flex flex-col items-center justify-center" style={{ backgroundColor: "#0000004C" }} >
                    <p className="font-montserrat text-5xl font-bold mt-20" style={{ color: "#FFFFFF" }}>ĐẶT LẠI MẬT KHẨU MỚI</p>
                    <div className="flex flex-col items-center space-y-5 mt-20 h-4/5 w-4/5">
                        <div className="w-1/2 space-y-5 flex flex-col items-center">
                            <input onChange={(e) => setPassword((prevState) => ({ ...prevState, newPassword: e.target.value }))} type="password" placeholder="Nhập mật khẩu mới" className="bg-white h-14 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" />
                            <input onChange={(e) => setPassword((prevState) => ({ ...prevState, reNewPassword: e.target.value }))} type="password" placeholder="Nhập lại mật khẩu" className="bg-white h-14 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" />
                            <button onClick={() => handleResetPassword()} className="w-full h-[50px] my-5 rounded-2xl font-montserrat font-bold text-xl p-3 bg-[#111111] text-white" style={{ border: "2px solid #959699" }}>GỬI</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;