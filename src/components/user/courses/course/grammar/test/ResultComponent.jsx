import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { X, SquarePen, Book } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultComponent = ({ correctCount, incorrectCount, onViewAnswers, onRetake, course }) => {
    const navigate = useNavigate();
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    // const total = correctCount + incorrectCount;

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

    const handleReview = () => {
        navigate(-1)
    };

    const handleExit = () => {
        setShowExitConfirmation(true);
    };

    const handleConfirmExit = () => {
        setShowExitConfirmation(false);
        navigate(-1);
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    return (
        <div className="w-full h-full flex flex-col items-center font-montserrat">
            <div className="w-[90%] flex justify-between">
                <p className="font-extrabold text-2xl">Từ Vựng {course.course_name} - Kiểm Tra Tổng Hợp - Kết quả</p>
                <X size={50} color="#83471F" onClick={handleExit} className="cursor-pointer" />
            </div>
            <div className="w-[90%] h-full pt-10 flex">
                <div className="w-1/2 h-full flex flex-col items-center justify-center">
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
                            onClick={onViewAnswers}
                            className="px-5 py-3 bg-[#FDF24E] rounded-[20px] font-semibold text-xl"
                        >
                            XEM ĐÁP ÁN
                        </button>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-center items-center gap-y-10">
                    <button onClick={() => handleReview()} className="w-3/4 h-fit p-5 space-y-5 flex flex-col items-center bg-[#EFECECC7] border border-black rounded-[20px]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                        <p className="font-bold text-2xl">Ôn luyện lại kiến thức bài học</p>
                        <div className="w-full flex justify-between items-center">
                            <Book size={100}></Book>
                            <p className="w-[250px] text-left text-wrap font-semibold text-lg">Ôn lại toàn bộ nội dung bài học cho đến khi bạn nắm chắc.</p>
                        </div>
                    </button>
                    <button onClick={onRetake} className="w-3/4 h-fit p-5 space-y-5 flex flex-col items-center bg-[#EFECECC7] border border-black rounded-[20px]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                        <p className="font-bold text-2xl">Làm bài kiểm tra mới</p>
                        <div className="w-full flex justify-between items-center">
                            <SquarePen size={100}></SquarePen>
                            <p className="w-[250px] text-left text-wrap font-semibold text-lg">Hãy thử một bài kiểm tra khác để tăng sự tự tin của bạn.</p>
                        </div>
                    </button>
                </div>
            </div>

            {showExitConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-1/2 h-1/5 p-6 text-center flex flex-col justify-center border border-black rounded-[20px]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
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
};

export default ResultComponent;