import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CircleCheck } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Separator } from "@/components/ui/separator";

import Header from '@/components/Header';
import SmallNavigationBar from '@/components/user/SmallNavigationBar';
import { list } from 'postcss';
import { set } from 'date-fns';

const GrammarLearn = () => {
    const { state } = useLocation();
    const [grammarLesson, setGrammarLesson] = useState(state.grammar);
    const [isQuiz, setIsQuiz] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cookies] = useCookies('authorization');
    const [progress, setProgress] = useState({});
    const [listLesson, setListLesson] = useState([]);

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
    }

    const handlePrevGrammarLesson = () => {
        setIsQuiz(false);
        if (grammarLesson.lesson > 1) {
            setGrammarLesson(listLesson[grammarLesson.lesson - 2]);
            console.log(grammarLesson);
        }
    }

    const handleNextGrammarLesson = () => {
        if (!isQuiz) {
            setIsQuiz(true);
        } else if (grammarLesson.lesson < listLesson.length) {
            setGrammarLesson(listLesson[grammarLesson.lesson]);
            console.log(grammarLesson);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getGrammarProgress();
        setIsLoading(false);

        console.log(state.grammar);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <SmallNavigationBar></SmallNavigationBar>
                <div className="w-full h-full flex justify-center">
                    <div className="w-3/4 h-full flex flex-col">
                        <div className="w-full h-[90%] flex items-start p-5"> 
                            <Link 
                                to=".." 
                                state={{ parent_course: state.parent_course }}
                                relative="path" 
                                className="justify-self-start p-5"
                            >
                                <ArrowLeft size={30}></ArrowLeft>
                            </Link> 
                            <div className="w-full h-[90%] p-5 space-y-10">
                                <p className="font-extrabold text-4xl">Bài {grammarLesson.lesson}: {grammarLesson.name}</p>
                                {
                                    isQuiz && 'quiz' in grammarLesson? 
                                    <div className="w-full text-2xl space-y-5 overflow-y-scroll">
                                        <div className="w-full p-5 space-y-3 border border-[#00000040]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                                            <p className="">Câu 1: {grammarLesson.quiz.questions[0].question_text}</p>
                                            <textarea name="" id="" placeholder="Nhập ..." className="w-full p-3 border"></textarea>
                                        </div>
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
                        <div className="w-full h-[10%] px-[5%] flex justify-between items-center bg-[#FFF8E3]">
                            <button onClick={handlePrevGrammarLesson} className="w-[15%] h-[50px] text-lg bg-[#D9D9D9] rounded-[15px]">Quay lại</button>
                            <button onClick={handleNextGrammarLesson} className="w-[15%] h-[50px] text-lg bg-[#FDF24E] rounded-[15px]">Tiếp tục</button>
                        </div>
                    </div>
                    <div className="w-1/4 h-full flex flex-col items-center bg-[#F3F4F6] border border-[#959699C2]">
                        <p className="font-semibold text-xl py-5">NỘI DUNG KHOÁ HỌC</p>
                        <Separator className="bg-[#00000040]"></Separator>
                        <div className="w-full pl-5 pt-5 flex flex-col space-y-5">
                            {
                                listLesson.map(lesson => 
                                    <div key={lesson.lesson} className="">
                                        <div className="w-full flex flex-col items-end">
                                            <div className={`w-full flex justify-between items-center ${grammarLesson.lesson === lesson.lesson? "bg-[#FFF9D0]": ""}`}>
                                                <div className="w-[90%] p-5 space-x-2 flex">
                                                    <p className="w-fit font-extrabold text-xl text-nowrap">Bài {lesson.lesson}: </p>
                                                    <p className="text-xl text-wrap">{lesson.name}</p>
                                                </div>
                                                <div className="w-[10%]">
                                                    <CircleCheck size={25}></CircleCheck>
                                                </div>
                                            </div>
                                            <div className={`w-full flex justify-end bg-[#FFFFFF] ${'theory' in lesson? "": "hidden"}`}>
                                                <div className="w-[10%] bg-[#F3F4F6]">

                                                </div>
                                                <div className="w-[80%] py-5">
                                                    <p className="ml-3 font-semibold text-xl">Lý thuyết</p>
                                                </div>
                                                <div className="w-[10%] py-5">
                                                    <CircleCheck size={25}></CircleCheck>
                                                </div>
                                            </div>
                                            <div className={`w-full flex justify-end ${'quiz' in lesson? "": "hidden"}`}>
                                                <div className="w-[10%] bg-[#F3F4F6]">

                                                </div>
                                                <div className="w-[80%] py-5">
                                                    <p className="ml-3 font-semibold text-xl">QUIZ - Yêu cầu đạt 80%</p>
                                                </div>
                                                <div className="w-[10%] py-5">
                                                    <CircleCheck size={25}></CircleCheck>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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