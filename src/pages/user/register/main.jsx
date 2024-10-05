import RegisterForm from "@/components/user/RegisterForm";

const Register = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="h-[12%] flex flex-row items-end mx-20">
                <img src="/logo.png" alt="" style={{width: 70, height: "auto"}}/>
                <p className="font-montserrat text-4xl font-bold py-[5px]" style={{color: "#FCD24F"}}>K-LEARN</p>
            </div>
            <div className="h-auto flex justify-center items-center">
                <img src="/nha_hanok.png" alt="" className="object-contain h-auto w-full z-1" />
                <div className="h-auto w-4/5 absolute z-50 flex flex-col items-center justify-center py-5 space-y-5" style={{backgroundColor: "#0000004C"}} >
                    <p className="font-montserrat text-5xl font-bold" style={{color: "#FFFFFF"}}>ĐĂNG KÝ TÀI KHOẢN</p>
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        </div>
    )
}

export default Register;