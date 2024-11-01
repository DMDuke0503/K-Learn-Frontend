import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, LockOpen, CirclePlus, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const GuestVocab = () => {
    const { state } = useLocation();
    const [listTopic, setListTopic] = useState([]);
    const [cookies] = useCookies('authorization');

    const handleListTopic = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/homepage/vocabulary/${state.parent_course.id}`
            })

            console.log(res.data);
            setListTopic(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        handleListTopic();
    }, []);

    return (
        <div className="w-full h-auto flex space-x-3">
            <div className="w-full h-full flex space-x-3">
                <Link 
                to=".." 
                state={{
                    course: state.parent_course
                }}
                relative="path" 
                className="justify-self-start p-5"
                >
                    <ArrowLeft size={30}></ArrowLeft>
                </Link>
                <div className="w-full flex flex-col space-y-5 overflow-y-scroll">
                    <p className="pt-5 font-extrabold text-2xl text-nowrap">{"Từ Vựng " + state.parent_course.course_name}</p>
                    <p className="font-extrabold text-xl">Chủ đề</p>
                    {listTopic?.map((topic) => 
                        <Link 
                            to={cookies.authorization? "./learn" : "/login"} 
                            key={topic.topic_id} 
                            state={{
                                parent_course: state.parent_course,
                                topic: topic
                            }}
                            className="w-[90%] flex text-start space-x-3"
                        >
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
                                    <Lock size={25}></Lock>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GuestVocab;