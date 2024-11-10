import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FlagTriangleRight, X, LoaderCircle, Check } from "lucide-react";

import Header from "@/components/Header";
import SmallNavigationBar from "@/components/user/SmallNavigationBar";

const GrammarTest = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies(['authorization']);
    const [course, setCourse] = useState({});
    const [grammarTest, setVocabTest] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [flags, setFlags] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [listAnswer, setListAnswer] = useState({
        answers: [],
        course_id: state.course_id
    });

    const handleCourse = async (course_id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/course/${course_id}`, {
                headers: { Authorization: `Bearer ${cookies.authorization}` }
            });
            setCourse(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleVocabTest = async (course_id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/comprehensive_quiz/grammar/${course_id}`, {
                headers: { Authorization: `Bearer ${cookies.authorization}` }
            });

            setVocabTest(res.data);
            setSelectedQuestion(res.data[0]);
            setSelectedAnswer(new Array(res.data.length).fill({
                user_answer: "",
            }));
            setFlags(new Array(res.data.length).fill(false));

            const initialAnswers = res.data.map((question) => ({
                user_answer: "",
                is_correct: false,
                question_id: question.question_id,
                options: question.options,
                grammar_id: question.grammar_id
            }));

            setListAnswer((prevState) => ({
                ...prevState,
                answers: initialAnswers
            }));

        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeQuestion = (question_id) => {
        setSelectedQuestion(grammarTest[question_id]);
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
                is_correct: answer.toLowerCase() === grammarTest[selectedIndex].correct_answer.toLowerCase()
            };
            return {
                ...prevState,
                answers: updatedAnswers
            };
        });
    };

    const handleNextQuestion = () => {
        if (selectedIndex < grammarTest.length - 1) {
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
        navigate(`/courses/${state.course_id}/grammar`, {state: {parent_course_id: course.id}});
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    const handleSubmit = () => {
        setShowSubmitConfirmation(true);
    };

    const handleConfirmSubmit = async () => {
        setShowSubmitConfirmation(false);
        setLoading(true);

        const scoreCalculated = await calculateScore();
        if (scoreCalculated) {
            await handleSubmitAnswer();
            setIsSubmitted(true);
        }
        setLoading(false);
    };

    const handleCancelSubmit = () => {
        setShowSubmitConfirmation(false);
    };

    const calculateScore = async () => {
        try {
            let correctCount = 0;
            let incorrectCount = 0;

            listAnswer.answers.forEach((answer) => {
                if (answer.is_correct) correctCount++;
                else incorrectCount++;
            });

            setScore({ correctCount, incorrectCount });
            return true;
        } catch (error) {
            console.error("Error calculating score:", error);
            return false;
        }
    };

    const handleSubmitAnswer = async () => {
        if (!listAnswer.answers.length) {
            console.error("No answers to submit");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/comprehensive-test-results/submit-grammar-quiz-answers",
                listAnswer,
                { headers: { Authorization: `Bearer ${cookies.authorization}` } }
            );
            console.log("Submitted answers successfully:", response.data);

            const testResult = await axios.get(
                `http://localhost:8080/api/comprehensive-test-results/grammar/${course.id}`,
                { headers: { Authorization: `Bearer ${cookies.authorization}` } }
            );


            navigate(`/courses/${state.course_id}/grammar/result`, { state: { testResult: testResult.data } });
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    const handleData = async () => {
        await handleVocabTest(state.course_id);
        await handleCourse(state.course_id);
        setSelectedIndex(0);
        setLoading(false);
    }

    useEffect(() => {
        handleData();
    }, []);

    console.log(selectedQuestion);

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
                                        <p className="font-extrabold text-2xl">Từ Vựng {course.course_name} - Kiểm Tra Tổng Hợp</p>
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
                                                                    <p className="text-xl">{selectedQuestion.question_text}</p>
                                                                    <div className="w-full grid grid-cols-2 gap-x-[100px] gap-y-5 max-w-full mx-auto">
                                                                        {(selectedQuestion.options ?? []).map((option, index) => (
                                                                            <div key={index} className="flex items-center space-x-3">
                                                                                <button
                                                                                    onClick={() => !showAnswers && handleAnswerSelection(option)}
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
                                                                    <p className="text-xl">{selectedQuestion.question_text}</p>
                                                                    <input onChange={(e) => handleAnswerSelection(e.target.value)} value={selectedAnswer[selectedIndex]?.user_answer} type="text" placeholder="Nhập định nghĩa đúng ..." className="w-full h-[50px] px-5 border border-black rounded-[20px]" />
                                                                </>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 h-full flex flex-col items-center">
                                            <div className="w-[400px] h-[400px] p-5 grid grid-cols-5 gap-4 border-2 border-[#111111] rounded-[20px]">
                                                {grammarTest.map((_, index) => (
                                                    <button 
                                                        key={index} 
                                                        onClick={() => handleChangeQuestion(index)}
                                                        className={`
                                                            relative flex justify-center items-center text-center font-semibold border border-[#111111] rounded-[10px]
                                                            ${
                                                                index === selectedIndex && !showAnswers ? "bg-blue-300" : ""
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
                                                    disabled={selectedIndex === grammarTest.length - 1}
                                                >
                                                    TIẾP TỤC
                                                </button>
                                            </div>
                                            <div>
                                                <button 
                                                    onClick={handleSubmit} 
                                                    className={
                                                        `w-[200px] h-[50px] bg-[#00DA49] rounded-[10px] font-semibold
                                                        ${isSubmitted ? "hidden" : ""}`
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

export default GrammarTest;