import Header from "@/components/Header";
import SmallNavigationBar from "@/components/user/SmallNavigationBar";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, FlagTriangleRight, LoaderCircle } from "lucide-react";

const MyVocabsQuiz = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(true);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
    const [vocabTest, setVocabTest] = useState(state.quiz);
    const [selectedQuestion, setSelectedQuestion] = useState(vocabTest[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [flags, setFlags] = useState(new Array(vocabTest.length).fill(false));
    const [selectedAnswer, setSelectedAnswer] = useState(new Array(vocabTest.length).fill({ user_answer: "" }));
    const [listAnswer, setListAnswer] = useState({answers: []});
    const [score, setScore] = useState(null);

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

    const handleSubmit = () => {
        setShowSubmitConfirmation(true);
    };

    const calculateScore = () => {
        try {
            let correctCount = 0;
            let incorrectCount = 0;
    
            listAnswer.answers.forEach((answer) => {
                if (answer.is_correct) correctCount++;
                else incorrectCount++;
            });
    
            return { correctCount, incorrectCount };
        } catch (error) {
            console.error("Error calculating score:", error);
            return null;
        }
    };
    
    const handleConfirmSubmit = () => {
        setShowSubmitConfirmation(false);
        setLoading(true);
    
        const calculatedScore = calculateScore();
        if (calculatedScore) {
            navigate("/myvocabs/result", { state: { score: calculatedScore, listAnswer: listAnswer } });
        } else {
            console.error("Error: Score calculation failed.");
        }
    
        setLoading(false);
    };

    const handleCancelSubmit = () => {
        setShowSubmitConfirmation(false);
    };

    const handleChangeQuestion = (question_id) => {
        setSelectedQuestion(vocabTest[question_id]);
        setSelectedIndex(question_id);
    };

    const handleNextQuestion = () => {
        if (selectedIndex < vocabTest.length - 1) {
            handleChangeQuestion(selectedIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (selectedIndex > 0) {
            handleChangeQuestion(selectedIndex - 1);
        }
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

    useState(() => {
        const initialAnswers = state.quiz.map((question) => ({
            user_answer: "",
            is_correct: false,
            type: question.type,
            word: question.word,
            definition: question.definition,
            options: question.options,
        }));

        setListAnswer((prevState) => ({
            ...prevState,
            answers: initialAnswers
        }));

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
                                        <p className="font-extrabold text-2xl">Từ Vựng Của Tôi - Quiz</p>
                                        <X size={50} color="#83471F" onClick={handleExit} className="cursor-pointer" />
                                    </div>                                    
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
                                                                                    onClick={() => handleAnswerSelection(option)}
                                                                                    className={`
                                                                                        w-4/5 h-[80px] p-3 truncate border border-black rounded-[15px] font-semibold text-lg
                                                                                        ${
                                                                                            option === selectedAnswer[selectedIndex]?.user_answer
                                                                                                ? "bg-yellow-300"
                                                                                                : "bg-[#F2F2F2]"
                                                                                        }
                                                                                    `}
                                                                                >
                                                                                    {option}
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="font-extrabold text-4xl">{selectedQuestion.word}</p>
                                                                    <input onChange={(e) => handleAnswerSelection(e.target.value)} value={selectedAnswer[selectedIndex]?.user_answer} type="text" placeholder="Nhập định nghĩa đúng ..." className="w-full h-[50px] px-5 border border-black rounded-[20px]" />
                                                                </>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 h-full flex flex-col items-center">
                                            <div className="w-[400px] h-[400px] p-5 grid grid-cols-5 gap-4 border-2 border-[#111111] rounded-[20px]">
                                                {vocabTest.map((_, index) => (
                                                    <button 
                                                        key={index} 
                                                        onClick={() => handleChangeQuestion(index)}
                                                        className={` 
                                                            aspect-square relative flex justify-center items-center text-center font-semibold border border-[#111111] rounded-[10px]
                                                            ${
                                                                index === selectedIndex? "bg-blue-300" : ""
                                                            }
                                                            ${
                                                                selectedAnswer[index]?.user_answer !== ""
                                                                    ? "bg-yellow-300"
                                                                    : "bg-[#F2F2F2]"
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
                                                    disabled={selectedIndex === vocabTest.length - 1}
                                                >
                                                    TIẾP TỤC
                                                </button>
                                            </div>
                                            <div>
                                                <button 
                                                    onClick={handleSubmit} 
                                                    className={
                                                        `w-[200px] h-[50px] bg-[#00DA49] rounded-[10px] font-semibold`
                                                    }
                                                >
                                                    NỘP BÀI
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

            {showSubmitConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-1/3 h-1/4 p-6 text-center flex flex-col justify-center border border-black rounded-[20px]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                        <p className="font-bold text-3xl text-[#83471F] mb-10">Bạn có muốn nộp bài?</p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleCancelSubmit}
                                className="w-[150px] py-3 rounded-[20px] bg-[#D9D9D9] font-semibold"
                            >
                                HUỶ
                            </button>
                            <button
                                onClick={handleConfirmSubmit}
                                className="w-[150px] py-3 rounded-[20px] bg-[#FDF24E] font-semibold"
                            >
                                NỘP BÀI
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyVocabsQuiz;