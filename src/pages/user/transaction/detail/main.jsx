import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

import Header from "@/components/Header";
import NavigationBar from "@/components/user/NavigationBar";

const DetailUserTransaction = () => {
    const { state } = useLocation();

    const formatCurrency = (value) => {
        value = value / 100;

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    console.log(state);

    return (
        <div className="h-screen w-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-screen flex flex-row" style={{height: "calc(100vh - 70px)"}}>
                <NavigationBar></NavigationBar>
                <div className="w-full h-full flex flex-col items-center pt-10 overflow-y-scroll">
                    <div className="w-[90%] h-full flex flex-col space-y-5">
                        <div className="flex items-start">
                            <Link 
                                to=".." 
                                relative="path" 
                                className="justify-self-start px-5"
                            >
                                <ArrowLeft size={30}></ArrowLeft>
                            </Link>
                            <div className="flex flex-col space-y-5">
                                <p className="font-extrabold text-2xl">Chi tiết giao dịch</p>
                                <div className="w-[100px] h-[50px] p-3 flex items-center justify-center bg-[#FFF12D33] border border-[#D9D9D9] rounded-[15px]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                                    <p className="font-semibold text-xl"># {state.transaction.id}</p>
                                </div>
                                <p>Ngày giao dịch: {format(state.transaction.date_transaction, 'Pp')}</p>
                            </div>
                        </div>
                        <div className="p-3 space-x-2 flex items-center border rounded-2xl font-montserrat">
                            <img src="/course_logo.png" alt="" className="w-[216px] h-[216px] rounded-lg" />   
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <p className="font-extrabold text-2xl">{state.transaction.course.course_name.toUpperCase()}</p>
                                </div>
                                <p className="whitespace-pre-line">
                                    {state.transaction.course.course_description}
                                </p>
                            </div>
                        </div>
                        <div className="w-full space-y-5">
                            <div className="w-full flex justify-between text-xl">
                                <p>Giá tiền</p>
                                <p>{formatCurrency(state.transaction.transaction_price)}</p>
                            </div>
                            <div className="w-full flex justify-between text-xl">
                                <p>Giảm giá (10%)</p>
                                <p>{formatCurrency(0)}</p>
                            </div>
                            <div className="w-full h-[1px] bg-black"></div>
                            <div className="w-full flex justify-between font-extrabold text-xl pb-4">
                                <p>Tổng cộng</p>
                                <p>{formatCurrency(state.transaction.transaction_price)}</p>
                            </div>
                            <div className="w-full h-[1px] bg-black"></div>
                            <div className="w-full flex justify-between items-center text-xl pt-4">
                                <p className="font-extrabold">Phương thức thanh toán</p>
                                <p className="font-extrabold">VNPay</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUserTransaction;