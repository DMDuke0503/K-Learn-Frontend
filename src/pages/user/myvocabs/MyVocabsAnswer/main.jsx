import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FlagTriangleRight, X, LoaderCircle, Check } from "lucide-react";

import Header from "@/components/Header";
import SmallNavigationBar from "@/components/user/SmallNavigationBar";

const MyVocabsAnswer = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies(['authorization']);
    const [vocabTest, setVocabTest] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [flags, setFlags] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(state.score);
    const [showAnswers, setShowAnswers] = useState(false);
    const [listAnswer, setListAnswer] = useState(state.listAnswer);

    const handleChangeQuestion = (question_id) => {
        setSelectedQuestion(selectedAnswer[question_id]);
        setSelectedIndex(question_id);
    };

    const handleFlagToggle = (index) => {
        setFlags((prevFlags) => {
            const updatedFlags = [...prevFlags];
            updatedFlags[index] = !updatedFlags[index];
            return updatedFlags;
        });
    };

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer((prevState) => {
            const updatedAnswers = [...prevState];
            updatedAnswers[selectedIndex] = {
                user_answer: answer
            };
            return updatedAnswers;
        });

        setListAnswer((prevState) => {
            const updatedAnswers = [...prevState.answers];
            updatedAnswers[selectedIndex] = {
                ...updatedAnswers[selectedIndex],
                user_answer: answer,
                is_correct: answer.toLowerCase() === vocabTest[selectedIndex].definition.toLowerCase()
            };
            return {
                ...prevState,
                answers: updatedAnswers
            };
        });
    };

    const handleNextQuestion = () => {
        if (selectedIndex < selectedAnswer.length - 1) {
            handleChangeQuestion(selectedIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (selectedIndex > 0) {
            handleChangeQuestion(selectedIndex - 1);
        }
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

    const fetchData = async () => {
        setSelectedAnswer(state.listAnswer.answers);
        setSelectedQuestion(state.listAnswer.answers[0]);
        setSelectedIndex(0);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(selectedQuestion)

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
                                        <p className="font-extrabold text-2xl">Từ Vựng Của Tôi - Quiz - Đáp Án</p>
                                        <X size={50} color="#83471F" onClick={handleExit} className="cursor-pointer" />
                                    </div>
                                    {loading ? (
                                        <div className="w-[90%] h-full flex items-center justify-center">
                                            <LoaderCircle size={500} className="animate-spin" />
                                        </div>
                                    ) : (
                                        <div className="w-[90%] pt-10 flex">
                                            <div className="w-2/3 h-full">
                                                <div className="w-[95%] h-full space-y-10">
                                                    <div className="aspect-square max-h-[200px] p-5 space-y-3 bg-[#D9D9D9] border border-black rounded-[20px]">
                                                        <p className="font-extrabold text-2xl">Câu {selectedIndex + 1}</p>
                                                        <p className="font-semibold text-lg">Điểm: 4</p>
                                                        <FlagTriangleRight 
                                                            onClick={() => handleFlagToggle(selectedIndex)} 
                                                            size={40} 
                                                            className={`cursor-pointer ${flags[selectedIndex] ? "fill-red-500 stroke-red-500" : ""}`}
                                                        />
                                                    </div>
                                                    <div className="w-full h-fit min-h-[100px] p-5 space-y-3 border border-black rounded-[20px]">
                                                        {
                                                            selectedQuestion.type === "multichoice"? 
                                                            (
                                                                <>
                                                                    <p className="font-extrabold text-4xl">{selectedQuestion.word}</p>
                                                                    <div className="w-full grid grid-cols-2 gap-x-[100px] gap-y-5 max-w-full mx-auto">
                                                                        {(selectedQuestion.options ?? []).map((option, index) => (
                                                                            <div key={index} className="flex items-center space-x-3">
                                                                                <button
                                                                                    onClick={() => !showAnswers && handleAnswerSelection(option)}
                                                                                    className={`
                                                                                        w-4/5 h-[80px] p-3 truncate border border-black rounded-[15px] font-semibold text-lg
                                                                                        ${
                                                                                            option === selectedQuestion.definition
                                                                                                ? "bg-[#1EF265]"
                                                                                                : option === selectedAnswer[selectedIndex]?.user_answer 
                                                                                                    ? option !== selectedQuestion.definition
                                                                                                        ? "bg-[#F51C1F]"
                                                                                                        : "bg-[#1EF265]"
                                                                                                    : ""
                                                                                        }
                                                                                    `}
                                                                                >
                                                                                    {option}
                                                                                </button>
                                                                                {
                                                                                    option === selectedQuestion.definition 
                                                                                        ? <Check size={50} className="text-[#1EF265]" />
                                                                                        : option === selectedAnswer[selectedIndex]?.user_answer 
                                                                                            ? option !== selectedQuestion.definition
                                                                                                ? <X size={50} className="text-[#F51C1F]" />
                                                                                                : <Check size={50} className="text-[#1EF265]" />
                                                                                            : ""
                                                                                }
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="font-extrabold text-4xl">{selectedQuestion.word}</p>
                                                                    <p className="font-semibold text-xl">Nhập định nghĩa đúng</p>
                                                                    <div className="flex items-center space-x-3">
                                                                        <div 
                                                                            className={`
                                                                                w-[90%] h-[50px] flex items-center px-3 border border-black rounded-[20px]
                                                                                ${
                                                                                    selectedAnswer[selectedIndex].user_answer.toLowerCase() === selectedQuestion.definition.toLowerCase()
                                                                                        ? "bg-[#1EF265]"
                                                                                        : "bg-[#F51C1F]"
                                                                                }
                                                                            `}
                                                                        >
                                                                            <p className="text-xl">{selectedAnswer[selectedIndex].user_answer}</p>
                                                                        </div>
                                                                        {
                                                                            selectedAnswer[selectedIndex].user_answer.toLowerCase() === selectedQuestion.definition.toLowerCase() 
                                                                                ? <Check size={50} className="text-[#1EF265]" />
                                                                                : <X size={50} className="text-[#F51C1F]" />
                                                                        }
                                                                    </div>
                                                                    <p className="font-semibold text-xl">Đáp án</p>
                                                                    <div className="flex items-center space-x-3">
                                                                        <div className="w-[90%] h-[50px] px-3 flex items-center border border-black rounded-[20px] bg-[#1EF265]">
                                                                            <p className="text-xl">{selectedQuestion.definition}</p>
                                                                        </div>
                                                                        <Check size={50} className="text-[#1EF265]" />
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-1/3 h-full flex flex-col items-center">
                                                <div className="w-[400px] h-[400px] p-5 grid grid-cols-5 gap-4 border-2 border-[#111111] rounded-[20px]">
                                                    {selectedAnswer.map((_, index) => (
                                                        <button 
                                                            key={index} 
                                                            onClick={() => handleChangeQuestion(index)}
                                                            className={`
                                                                aspect-square relative flex justify-center items-center text-center font-semibold border border-[#111111] rounded-[10px]
                                                                ${
                                                                    selectedAnswer[index].user_answer.toLowerCase() === selectedAnswer[index].definition.toLowerCase()
                                                                        ? "bg-[#1EF265]"
                                                                        : "bg-[#F51C1F]"
                                                                }
                                                            `}
                                                        >
                                                            {index + 1}
                                                            {flags[index] && (
                                                                <FlagTriangleRight 
                                                                    size={16} 
                                                                    className="absolute top-1 right-1 fill-red-500 stroke-red-500" 
                                                                />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="w-full h-[100px] px-5 flex justify-between items-center">
                                                    <button 
                                                        onClick={handlePreviousQuestion} 
                                                        className="w-[120px] h-[50px] bg-[#D9D9D9] rounded-[10px] font-semibold"
                                                        disabled={selectedIndex === 0}
                                                    >
                                                        QUAY LẠI
                                                    </button>
                                                    <button 
                                                        onClick={handleNextQuestion} 
                                                        className="w-[120px] h-[50px] bg-[#FDF24E] rounded-[10px] font-semibold"
                                                        disabled={selectedIndex === selectedAnswer.length - 1}
                                                    >
                                                        TIẾP TỤC
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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

export default MyVocabsAnswer;