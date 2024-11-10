import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FlagTriangleRight, LoaderCircle, Check, X, SquarePen, Book } from "lucide-react";

import Header from "@/components/Header";
import SmallNavigationBar from "@/components/user/SmallNavigationBar";
import { Doughnut } from "react-chartjs-2";
import { } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyVocabsResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies(['authorization']);

    const [loading, setLoading] = useState(true);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [course, setCourse] = useState({});
    const [testAnswers, setTestAnswers] = useState([]);

    const data = {
        labels: ["Correct", "Incorrect"],
        datasets: [
            {
                data: [correctCount, incorrectCount],
                backgroundColor: ["#1EF265", "#F51C1F"],
                hoverBackgroundColor: ["#1EF265", "#F51C1F"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const handleExit = () => {
        setShowExitConfirmation(true);
    };

    const handleConfirmExit = () => {
        setShowExitConfirmation(false);
        navigate(`/myvocabs`);
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    const handleViewAnswers = () => {
        navigate(`/myvocabs/answer`, { state: { score: state.calculatedScore, listAnswer: state.listAnswer } });
    }

    useEffect(() => {
        console.log(state);
        setCorrectCount(state.score.correctCount);
        setIncorrectCount(state.score.incorrectCount);
        setLoading(false);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header />
            <div className="flex" style={{ height: "calc(100vh - 70px)" }}>
                <SmallNavigationBar />
                <div className="w-full h-full p-5 flex flex-col items-center overflow-y-scroll">
                    {
                        loading
                            ? (
                                <LoaderCircle size={500} className="animate-spin" />
                            )
                            : (
                                <>
                                    <div className="w-[90%] flex justify-between">
                                        <p className="font-extrabold text-2xl">Từ Vựng Của Tôi - Quiz - Kết quả</p>
                                        <X size={50} color="#83471F" onClick={handleExit} className="cursor-pointer" />
                                    </div>
                                    <div className="w-[90%] h-full pt-10 flex">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <div className="flex justify-center items-center space-x-[5%]">
                                                <div className="w-[300px] h-[300px] mb-8">
                                                    <Doughnut data={data} options={options} />
                                                </div>
                                                <div className="flex flex-col items-center justify-center space-y-5">
                                                    <div className="w-[200px] flex items-center">
                                                        <p className="w-1/2 text-2xl font-medium">Đúng</p>
                                                        <p className="w-1/3 py-1 text-2xl font-medium bg-[#1EF265] text-white text-center rounded-[20px]">{correctCount}</p>
                                                    </div>
                                                    <div className="w-[200px] flex">
                                                        <p className="w-1/2 text-2xl font-medium">Sai</p>
                                                        <p className="w-1/3 py-1 text-2xl font-medium bg-[#F51C1F] text-white text-center rounded-[20px]">{incorrectCount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={handleViewAnswers}
                                                    className="px-5 py-3 bg-[#FDF24E] rounded-[20px] font-semibold text-xl"
                                                >
                                                    XEM ĐÁP ÁN
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>

            {showExitConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-1/3 h-1/4 p-6 text-center flex flex-col justify-center border border-black rounded-[20px]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                        <p className="font-bold text-3xl text-[#83471F] mb-10">Bạn muốn thoát?</p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleCancelExit}
                                className="w-[150px] py-3 rounded-[20px] bg-[#D9D9D9] font-semibold"
                            >
                                HUỶ
                            </button>
                            <button
                                onClick={handleConfirmExit}
                                className="w-[150px] py-3 rounded-[20px] bg-[#FDF24E] font-semibold"
                            >
                                ĐỒNG Ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyVocabsResult;