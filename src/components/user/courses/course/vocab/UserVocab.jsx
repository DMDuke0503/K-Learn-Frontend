import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CirclePlus, Bookmark, LockOpen, LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const UserVocab = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [topics, setTopics] = useState([]);
    const [cookies] = useCookies('authorization');
    const [vocabs, setVocabs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [testResult, setTestResult] = useState({});

    const handleVocabList = (id, index) => {
        if (paymentStatus === "pending" && index >= 3) {
            navigate("/payment", {state: {parent_course: course}});
        } else if (paymentStatus === "") {
            navigate(`/courses/${state.parent_course_id}`, {state: {course_id: state.parent_course_id}});
        } else {
            axios({
                method: "GET",
                url: `http://localhost:8080/api/vocabulary/${id}`,
            })
            .then(res => {
                setVocabs(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const handleCourse = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/course/${state.parent_course_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });
            setCourse(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTopic = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/mycourse/vocabulary/${state.parent_course_id}/progress`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });
            
            if (Object.keys(res.data).length) {
                setTopics(res.data.topics);
                setProgress(res.data.course_progress);
                setPaymentStatus(res.data.payment_status);
            } else {
                try {
                    const res = await axios({
                        method: "GET",
                        url: `http://localhost:8080/api/homepage/vocabulary/${state.parent_course_id}`
                    })
                    setTopics(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleVocabTestResult = async (course_id) => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/comprehensive-test-results/vocabulary/${course_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });
            setTestResult(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTest = (course_id) => {
        if (progress>= 80) {
            if (Object.keys(testResult).length) {
                navigate("result", {state: {testResult: testResult}});
            } else {
                navigate("test", {state: {course_id: course_id}});
            }
        }
    }

    useEffect(() => {
        handleCourse();
        handleVocabTestResult(state.parent_course_id);
    }, []);

    useEffect(() => {
        handleTopic();
    }, [state.parent_course_id]);

    console.log(course)

    return (
        <div className="w-full h-[99%] flex justify-center items-center space-x-3 overflow-y-scroll">
            {
                loading
                ? (
                    <LoaderCircle size={500} className="animate-spin" />
                )
                : (
                    <div className="w-full h-full flex space-x-3">
                        <Link 
                            to=".." 
                            state={{ course_id: state.parent_course_id }}
                            relative="path" 
                            className="justify-self-start p-5"
                        >
                            <ArrowLeft size={30}></ArrowLeft>
                        </Link>
                        <div className="w-[90%] h-full flex flex-col space-y-5">
                            <p className="pt-5 font-extrabold text-2xl text-nowrap">{"Từ Vựng " + course.course_name}</p>
                            <div className={`flex flex-col space-y-5 ${!paymentStatus && 'hidden'}`}>
                                <div className="flex justify-between items-center">
                                    <Progress className="w-[90%] h-5" value={progress}></Progress>
                                    <p className="font-semibold text-xl">{progress} %</p>
                                </div>
                                <div className="w-full h-auto space-y-3 flex flex-col items-center">
                                    <div className="p-3 space-x-2 flex items-center border rounded-2xl font-montserrat">
                                        <img src="/course_logo.png" alt="" className="w-[216px] h-[216px] rounded-lg" />   
                                        <div className="h-full flex flex-col justify-start space-y-3">
                                            <p className="font-extrabold text-2xl">TỪ VỰNG {course.course_name.toUpperCase()}</p>
                                            <p className="whitespace-pre-line">{course.course_description}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTest(state.parent_course_id)} className={`w-1/6 h-[50px] rounded-[15px] ${progress >= 80? "bg-[#FFF12D]": "bg-gray-400 cursor-not-allowed"}`}>KIỂM TRA</button>
                                </div>
                            </div>
                            <p className="font-extrabold text-xl">Chủ đề</p>
                            <div className="w-full space-y-5">
                                {topics.map((topic, index) => (
                                    <Dialog key={topic.topic_id}>
                                        <DialogTrigger onClick={() => handleVocabList(topic.topic_id, index)} className="w-full h-[100px] flex text-start space-x-3">
                                            <img src="/course_logo.png" alt="" className="w-[100px] rounded-lg" />
                                            <div className="w-full h-full flex flex-col justify-between">
                                                <div>
                                                    <p className="font-extrabold text-xl">{topic.topic_name}</p>
                                                    <p className="text-sm">{topic.topic_description}</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="flex items-center space-x-1">
                                                        <CirclePlus></CirclePlus>
                                                        <p className="font-extrabold text-sm">{topic.total_word} từ vựng</p>
                                                    </div>
                                                    {
                                                        paymentStatus === "pending"? (index < 3? <LockOpen size={25}></LockOpen>: <Lock size={25}></Lock>): paymentStatus === "success"? <LockOpen size={25}></LockOpen>: <Lock size={25}></Lock>
                                                    }
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogHeader>
                                            <DialogTitle></DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <DialogContent className="h-4/5 overflow-y-scroll">
                                            <div className="w-full h-full flex flex-col items-center p-5 space-y-5">
                                                <div className="flex flex-col items-center space-y-3">
                                                    <img src="/course_logo.png" alt="" className="rounded-lg" />
                                                    <p className="font-semibold text-xl">Chủ đề: {topic.topic_name}</p>
                                                    <p className="font-semibold">Từ và cụm từ: {topic.total_word}</p>
                                                    <Link 
                                                        to={cookies.authorization? "learn": "/login"}
                                                        state={{
                                                            parent_course: course,
                                                            topic: topic
                                                        }}
                                                        className={`w-1/2 text-center py-3 bg-[#FDF24E] text-[#000000] hover:bg-[#FDF24E] rounded-xl ${topic.total_word === 0 ? "pointer-events-none" : ""}`}
                                                    >
                                                        Học
                                                    </Link>
                                                </div>
                                                <div className="w-full flex flex-col">
                                                    {vocabs.map((vocab) => (
                                                        <div key={vocab.id} className="flex justify-between border-b-2 py-2 px-5">
                                                            <div className="flex space-x-3">
                                                                <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                                <p>{vocab.word}</p>
                                                                <p>{vocab.transcription}</p>
                                                            </div>
                                                            <p className="pl-3">{vocab.definition}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UserVocab;