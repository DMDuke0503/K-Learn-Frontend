import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import Header from "@/components/Header";

const OTP = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [otp, setOTP] = useState("");

    const googleLogin = () => {
        const redirectUri = "http://localhost:5173/oauth2/redirect";
        window.location.href = `http://localhost:8080/oauth2/authorization/google?redirect_uri=${redirectUri}`;
    };

    const handleResetPassword = async (email) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/user/reset-password-token/${email}`);

            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleOTP = async (OTP) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/user/reset-password-auth/${state.email}/${OTP}`);

            console.log(res.data);
            if (res.data) {
                navigate("/reset-password", {state: {token: res.data}});
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
                    <p className="font-montserrat text-5xl font-bold mt-20" style={{ color: "#FFFFFF" }}>QUÊN MẬT KHẨU</p>
                    <p className="font-montserrat text-md text-white mt-10">Hãy nhập mã Code được gửi qua Email của bạn</p>
                    <div className="flex flex-col items-center space-y-5 mt-20 h-4/5 w-4/5">
                        <div className="w-1/2 flex flex-col items-center">
                            <input onChange={(e) => setOTP(e.target.value)} type="email" placeholder="Nhập OTP" className="bg-white h-14 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" />
                            <button onClick={() => handleOTP(otp)} className="w-full h-[50px] my-5 rounded-2xl font-montserrat font-bold text-xl p-3 bg-[#111111] text-white" style={{ border: "2px solid #959699" }}>GỬI</button>
                        </div>
                        <div className="flex space-x-2 text-white">
                            <p>Bạn chưa nhận được mã code?</p>
                            <button onClick={() => handleResetPassword(state.email)} className="text-[#FCD24F]">Gửi lại mã code</button>
                        </div>
                        <Link to="/login" className="font-semibold text-white text-xl">Trở Về Đăng Nhập</Link>
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
    );
}

export default OTP;