import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CircleCheck, Check, X } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Separator } from "@/components/ui/separator";

import Header from '@/components/Header';
import SmallNavigationBar from '@/components/user/SmallNavigationBar';

const GrammarLearn = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [grammarLesson, setGrammarLesson] = useState(state.grammar);
    const [isQuiz, setIsQuiz] = useState(false);
    const [cookies] = useCookies('authorization');
    const [progress, setProgress] = useState({});
    const [listLesson, setListLesson] = useState([]);
    const [listAnswer, setListAnswer] = useState(Array(grammarLesson?.quiz?.questions.length).fill(null));
    const [selectedAnswers, setSelectedAnswers] = useState(Array(grammarLesson?.quiz?.questions.length).fill(null));
    const [gradingResults, setGradingResults] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [pass, setPass] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [text, setText] = useState("");

    const getGrammarProgress = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: `http://localhost:8080/api/mycourse/grammar/${state.parent_course.id}/progress`,
                headers: {
                    'Authorization': `Bearer ${cookies.authorization}`
                }
            });
            setProgress(res.data);
            setListLesson(res.data.list_lesson);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const gradeQuiz = async () => {
        if (!grammarLesson.quiz) return;
    
        const results = grammarLesson.quiz.questions.map((question, index) => {
            const isCorrect = listAnswer[index]?.toLowerCase() === question.correct_answer?.toLowerCase();
            return {
                question: question.question_text,
                userAnswer: listAnswer[index],
                correctAnswer: question.correct_answer,
                isCorrect
            };
        });
    
        setGradingResults(results);
        console.log(results);

        const numberOfCorrectAnswers = results.filter(result => result.isCorrect).length;

        setCorrectCount(numberOfCorrectAnswers);    

        setPass(numberOfCorrectAnswers / results.length >= 0.8);

        if (numberOfCorrectAnswers / results.length >= 0.8) {
            try {
                const res = await axios({
                    method: 'PATCH',
                    url: `http://localhost:8080/api/grammar_progress/mark_grammar_quiz/${grammarLesson.id}/${state.parent_course.id}`,
                    headers: {
                        'Authorization': `Bearer ${cookies.authorization}`
                    }
                });
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await axios({
                    method: 'PATCH',
                    url: `http://localhost:8080/api/grammar_progress/mark_grammar_quiz_failed/${grammarLesson.id}/${state.parent_course.id}`,
                    headers: {
                        'Authorization': `Bearer ${cookies.authorization}`
                    }
                });
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleAnswer = (index, answer) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = answer; 
        setSelectedAnswers(updatedAnswers);
        
        const changeAnswer = listAnswer.map((string, i) => {
            if (i === index) {
                return answer;
            } else {
                return string;
            }
        });
        setListAnswer(changeAnswer);
    };

    const handleRedoQuiz = () => {
        setGradingResults(null);
        setListAnswer(Array(grammarLesson.quiz.questions.length).fill(""));
        setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
        setGrammarLesson(listLesson[grammarLesson.lesson - 1]);   
    }

    const handleDoneLesson = async (grammar_id, course_id) => {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `http://localhost:8080/api/grammar_progress/mark_learned_theory/${grammar_id}/${course_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            setIsDone(true);

            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDoneQuiz = async (grammar_id, course_id) => {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `http://localhost:8080/api/grammar_progress/mark_grammar_quiz/${grammar_id}/${course_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            setIsDone(true);

            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handlePrevGrammarLesson = () => {
        setIsQuiz(false);
        if (grammarLesson.lesson > 1) {
            setGrammarLesson(listLesson[grammarLesson.lesson - 2]);
            console.log(grammarLesson);
        }
        setGradingResults(null);
        if ('quiz' in grammarLesson) {
            setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
            setListAnswer(Array(grammarLesson.quiz.questions.length).fill(null));
        }
    }

    const handleNextGrammarLesson = () => {
        if (grammarLesson.lesson < listLesson.length) {
            if (!isQuiz) {
                if ('quiz' in grammarLesson) {
                    setIsQuiz(true);
                    handleDoneLesson(grammarLesson.id, state.parent_course.id);
                } else {
                    setIsQuiz(false);
                    setGradingResults(null);
                    if ('quiz' in grammarLesson) {
                        setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
                        setListAnswer(Array(grammarLesson.quiz.questions.length).fill(null));
                    }
                    handleDoneLesson(grammarLesson.id, state.parent_course.id);
                    setGrammarLesson(listLesson[grammarLesson.lesson]);
                    setIsDone(false);
                    console.log(grammarLesson);
                }
            } else {
                if (!gradingResults) {
                    gradeQuiz();
                } else {
                    setIsQuiz(false);
                    setGradingResults(null);
                    setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
                    setListAnswer(Array(grammarLesson.quiz.questions.length).fill(null));
                    handleDoneQuiz(grammarLesson.id, state.parent_course.id);
                    handleDoneLesson(grammarLesson.id, state.parent_course.id);
                    setGrammarLesson(listLesson[grammarLesson.lesson]);
                    setIsDone(false);
                    console.log(grammarLesson);
                }
            }
        } else if (grammarLesson.lesson == listLesson.length) {
            if (!isQuiz) {
                if ('quiz' in grammarLesson) {
                    setIsQuiz(true);
                } else {
                    setIsQuiz(false);
                    setGradingResults(null);
                    if ('quiz' in grammarLesson) {
                        setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
                        setListAnswer(Array(grammarLesson.quiz.questions.length).fill(null));
                    }
                    handleDoneLesson(grammarLesson.id, state.parent_course.id);
                    setIsDone(false);
                    navigate("..", { state: { parent_course: state.parent_course }, relative: "path" });
                    console.log(grammarLesson);
                }
            } else {
                if (!gradingResults) {
                    gradeQuiz();
                } else {
                    setIsQuiz(false);
                    setGradingResults(null);
                    setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
                    setListAnswer(Array(grammarLesson.quiz.questions.length).fill(null));
                    handleDoneLesson(grammarLesson.id, state.parent_course.id);
                    handleDoneQuiz(grammarLesson.id, state.parent_course.id);
                    setIsDone(false);
                    navigate("..", { state: { parent_course: state.parent_course }, relative: "path" });
                    console.log(grammarLesson);
                }
            } 
        }
    };

    const handleNav = (lesson) => {
        setGrammarLesson(listLesson[lesson - 1]);
        setIsQuiz(false);
        setGradingResults(null);
        if ('quiz' in grammarLesson) {
            setSelectedAnswers(Array(grammarLesson.quiz.questions.length).fill(null));
            setListAnswer(Array(grammarLesson.quiz.questions.length).fill(null));
        }
    }

    useEffect(() => {
        getGrammarProgress();
    }, [isDone, grammarLesson, listAnswer]);

    console.log(state.grammar)

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <SmallNavigationBar></SmallNavigationBar>
                <div className="w-full h-full flex justify-center">
                    <div className="w-2/3 h-full flex flex-col">
                        <div className="w-full h-[90%] flex items-start p-5"> 
                            <Link 
                                to=".." 
                                state={{ parent_course: state.parent_course }}
                                relative="path" 
                                className="justify-self-start p-5"
                            >
                                <ArrowLeft size={30}></ArrowLeft>
                            </Link> 
                            <div className="w-full h-full p-5 space-y-10">
                                <p className="font-extrabold text-4xl">Bài {grammarLesson.lesson}: {grammarLesson.name}</p>
                                {
                                    gradingResults && (
                                        <div className="w-full h-[20%] space-y-5 p-5 flex flex-col items-center border border-black rounded-2xl" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                                            <div>
                                                <div className="flex space-x-2 font-semibold">
                                                    <p>Số câu đúng:</p>
                                                    <p>{correctCount}/{listAnswer.length}</p>
                                                </div>
                                                <div className="flex space-x-2 font-semibold">
                                                    <p>Trạng thái:</p>
                                                    <p>{(correctCount / listAnswer.length) < 0.8? "KHÔNG ĐẠT": "ĐẠT"}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRedoQuiz()} className="w-1/5 h-[40px] bg-[#FDF24E] rounded-xl font-semibold">Làm lại</button>
                                        </div>
                                    )
                                }
                                {
                                    isQuiz && grammarLesson['quiz']? 
                                    <div className={`w-full text-2xl space-y-5 overflow-y-scroll ${gradingResults? "h-[70%]": "h-[90%]"}`}>
                                        {
                                            grammarLesson['quiz']['questions'].map((question, index) => 
                                                <div key={index} className="w-full p-5 space-y-3 border border-[#00000040] rounded-xl" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                                                    <div className="flex justify-between items-start">
                                                        <p className="w-[95%]">Câu {index + 1}: {question.question_text}</p>
                                                        <Check className={`${!gradingResults? "hidden": (gradingResults[index].isCorrect? "": "hidden")}`} size={40} strokeWidth={5} color="#1EF265A8"></Check>
                                                        <X className={`${!gradingResults? "hidden": (gradingResults[index].isCorrect? "hidden": "")}`} size={40} strokeWidth={5} color="#F51C1F"></X>
                                                    </div>
                                                    {
                                                        question.type === 'multichoice'? 
                                                        <div className="w-full flex flex-col items-center space-y-5">
                                                            <div className="grid grid-cols-2 gap-x-[100px] gap-y-5 min-w-full mx-auto">
                                                                <button
                                                                    onClick={() => handleAnswer(index, question.options[0])}
                                                                    className={`w-full h-[100px] p-3 border border-black rounded-xl text-center ${selectedAnswers[index] === question.options[0]? (gradingResults? (gradingResults[index].isCorrect? (gradingResults[index].userAnswer === question.options[0]? "bg-[#1EF265A8]": ""): "bg-[#F51C1F]"): "bg-yellow-300") : (gradingResults? (gradingResults[index].correctAnswer === question.options[0]? "bg-[#1EF265A8]": ""): "bg-white")}`}
                                                                >
                                                                    {question.options[0]}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAnswer(index, question.options[1])}
                                                                    className={`w-full h-[100px] p-3 border border-black rounded-xl text-center ${selectedAnswers[index] === question.options[1]? (gradingResults? (gradingResults[index].isCorrect? (gradingResults[index].userAnswer === question.options[1]? "bg-[#1EF265A8]": ""): "bg-[#F51C1F]"): "bg-yellow-300") : (gradingResults? (gradingResults[index].correctAnswer === question.options[1]? "bg-[#1EF265A8]": ""): "bg-white")}`}
                                                                >
                                                                    {question.options[1]}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAnswer(index, question.options[2])}
                                                                    className={`w-full h-[100px] p-3 border border-black rounded-xl text-center ${selectedAnswers[index] === question.options[2]? (gradingResults? (gradingResults[index].isCorrect? (gradingResults[index].userAnswer === question.options[2]? "bg-[#1EF265A8]": ""): "bg-[#F51C1F]"): "bg-yellow-300") : (gradingResults? (gradingResults[index].correctAnswer === question.options[2]? "bg-[#1EF265A8]": ""): "bg-white")}`}
                                                                >
                                                                    {question.options[2]}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAnswer(index, question.options[3])}
                                                                    className={`w-full h-[100px] p-3 border border-black rounded-xl text-center ${selectedAnswers[index] === question.options[3]? (gradingResults? (gradingResults[index].isCorrect? (gradingResults[index].userAnswer === question.options[3]? "bg-[#1EF265A8]": ""): "bg-[#F51C1F]"): "bg-yellow-300") : (gradingResults? (gradingResults[index].correctAnswer === question.options[3]? "bg-[#1EF265A8]": ""): "bg-white")}`}
                                                                >
                                                                    {question.options[3]}
                                                                </button>
                                                            </div>
                                                        </div>: 
                                                        <div className="w-full">
                                                            <textarea value={listAnswer[index]} onChange={(e) => handleAnswer(index, e.target.value)} placeholder="Nhập ..." className="w-full h-[100px] p-3 border border-black rounded-xl"></textarea>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>:
                                    <div className="w-fit text-2xl space-y-5">
                                        <div>
                                            <p>I. Giải thích</p>
                                            <p className="whitespace-pre-line">{grammarLesson.theory.explanation}</p>
                                        </div>
                                        <div>
                                            <p>II. Ví dụ</p>
                                            <p className="whitespace-pre-line">{grammarLesson.theory.example}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={`w-full h-[10%] px-[5%] flex justify-between items-center bg-[#FFF8E3] ${gradingResults && !pass && "hidden"}`}>
                            <button onClick={handlePrevGrammarLesson} className="w-[15%] h-[50px] text-lg bg-[#D9D9D9] rounded-[15px]">Quay lại</button>
                            <button onClick={handleNextGrammarLesson} className="w-[15%] h-[50px] text-lg bg-[#FDF24E] rounded-[15px]">
                                {isQuiz && !gradingResults? "Nộp bài": (grammarLesson.lesson == listLesson.length? "Hoàn thành": "Tiếp tục")}
                            </button>
                        </div>
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-center bg-[#F3F4F6] border border-[#959699C2]">
                        <p className="font-semibold text-xl py-5">NỘI DUNG KHOÁ HỌC</p>
                        <Separator className="bg-[#00000040]"></Separator>
                        <div className="w-full pl-5 pt-5 flex flex-col space-y-5 overflow-y-scroll">
                            {
                                listLesson.map(lesson => 
                                    <button onClick={() => handleNav(lesson.lesson)} key={lesson.lesson} className="">
                                        <div className="w-full flex flex-col items-end">
                                            <div className={`w-full flex justify-between items-center ${grammarLesson.lesson === lesson.lesson? "bg-[#FFF9D0]": ""}`}>
                                                <div className="w-[90%] p-5 space-x-2 flex">
                                                    <p className="w-fit font-extrabold text-xl text-nowrap">Bài {lesson.lesson}: </p>
                                                    <p className="text-xl text-wrap">{lesson.name}</p>
                                                </div>
                                                <div className="w-[10%]">
                                                    <CircleCheck size={25} className={`${lesson.learned && "text-[#1EF265A8]"}`}></CircleCheck>
                                                </div>
                                            </div>
                                            <div className={`w-full flex justify-end bg-[#FFFFFF] ${'theory' in lesson? "": "hidden"}`}>
                                                <div className="w-[10%] bg-[#F3F4F6]">

                                                </div>
                                                <div className="w-[80%] py-5 flex">
                                                    <p className="ml-3 font-semibold text-xl">Lý thuyết</p>
                                                </div>
                                                <div className="w-[10%] py-5">
                                                    <CircleCheck size={25} className={`${lesson.theory.learned && "text-[#1EF265A8]"}`}></CircleCheck>
                                                </div>
                                            </div>
                                            <div className={`w-full flex justify-end`}>
                                                <div className="w-[10%] bg-[#F3F4F6]">

                                                </div>
                                                <div className="w-[80%] py-5 flex">
                                                    <p className="ml-3 font-semibold text-xl">QUIZ - Yêu cầu đạt 80%</p>
                                                </div>
                                                <div className="w-[10%] py-5">
                                                    <CircleCheck size={25} className={`${!lesson.quiz?.passed? (lesson.quiz?.failed? "text-[#F51C1F]": ""): "text-[#1EF265A8]"} ${!('quiz' in lesson)? "text-[#1EF265A8]": ""}`}></CircleCheck>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GrammarLearn;