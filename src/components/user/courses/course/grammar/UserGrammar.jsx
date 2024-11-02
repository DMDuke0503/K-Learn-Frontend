import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, LockOpen, CirclePlus, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Progress } from "@/components/ui/progress";

const UserGrammar = () => {
    const [cookies] = useCookies('authorization');
    const { state } = useLocation();
    const [listLesson, setListLesson] = useState([]);
    const [progress, setProgress] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState("");

    const handleListLesson = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/mycourse/grammar/${state.parent_course.id}/progress`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            })

            console.log(res.data);
            setListLesson(res.data.list_lesson);
            setProgress(res.data.progress);
            setPaymentStatus(res.data.payment_status);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        handleListLesson();
    }, []);

    return (
        <div className="h-[99%] flex space-x-3 overflow-y-scroll" style={{width: "calc(100vw - 250px)"}}>
            <div className="w-full h-full flex space-x-3">
                <Link 
                to=".." 
                state={{
                    course_id: state.parent_course.id
                }}
                relative="path" 
                className="justify-self-start p-5"
                >
                    <ArrowLeft size={30}></ArrowLeft>
                </Link>
                <div className="w-[90%] h-full flex flex-col space-y-5">
                    <p className="pt-5 font-extrabold text-2xl text-nowrap">{"Ngữ Pháp " + state.parent_course.course_name}</p>
                    <div className="flex justify-between items-center">
                        <Progress className="w-[90%] h-5" value={progress}></Progress>
                        <p className="font-semibold text-xl">{progress} %</p>
                    </div>
                    <div className="w-full h-auto space-y-3 flex flex-col items-center">
                        <div className="p-3 space-x-2 flex items-center border rounded-2xl font-montserrat">
                            <img src="/course_logo.png" alt="" className="w-[216px] h-[216px] rounded-lg" />   
                            <div className="h-full flex flex-col justify-start space-y-3">
                                <p className="font-extrabold text-2xl">NGỮ PHÁP {state.parent_course.course_name.toUpperCase()}</p>
                                <p className="whitespace-pre-line">{state.parent_course.course_description}</p>
                            </div>
                        </div>
                        <button className={`w-1/6 h-[50px] rounded-[15px] ${progress >= 80? "bg-[#FFF12D]": "bg-gray-400 cursor-not-allowed"}`}>KIỂM TRA</button>
                    </div>
                    <p className="font-extrabold text-xl">Bài Học</p>
                    <div className="w-full space-y-5">
                        {listLesson?.map((grammar) => 
                            <Link 
                                to={paymentStatus === "success"? "./learn" : "/payment"} 
                                key={grammar.id} 
                                state={{
                                    parent_course: state.parent_course,
                                    grammar: grammar
                                }}
                                className="w-full flex text-start space-x-3"
                            >
                                <img src="/course_logo.png" alt="" className="w-[100px] rounded-lg" />
                                <div className="w-full h-full flex flex-col justify-between">
                                    <div>
                                        <p className="font-extrabold text-xl">Bài {grammar.lesson}: {grammar.name}</p>
                                        <p className="text-sm">{grammar.description}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        {
                                            (paymentStatus === "success")? <Bookmark size={25}></Bookmark>: <Lock size={25}></Lock>
                                        }
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserGrammar;