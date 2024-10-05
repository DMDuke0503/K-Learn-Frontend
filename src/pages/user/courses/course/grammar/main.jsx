import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, LockOpen, CirclePlus, Bookmark } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';

const Grammar = () => {
    const { state } = useLocation();
    const [cookies] = useCookies('authorization');
    const [topics, setTopics] = useState([]);
    
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/api/vocabulary_topic/${state.parent_course.id}`,
            headers: {
                Authorization: `Bearer ${cookies.authorization}`
            }
        })
        .then(res => {
            console.log(res.data);

            setTopics(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-[90vh] flex">
                <NavigationBar></NavigationBar>
                <div className="w-auto h-auto p-5 flex space-x-3">
                    <div className="w-full h-full flex space-x-3">
                        <Link 
                        to=".." 
                        state={{
                            course: state.parent_course
                        }}
                        relative="path" 
                        className="justify-self-start"
                        >
                            <ArrowLeft size={30}></ArrowLeft>
                        </Link>
                        <div className="w-[90%] flex flex-col space-y-5 overflow-y-scroll">
                            <p className="font-extrabold text-2xl text-nowrap">{"Ngữ Pháp " + state.parent_course.course_name}</p>
                            <p className="font-extrabold text-xl">Chủ đề</p>

                            {topics.map((topic) => 
                                <Dialog key={topic.id}>
                                    <DialogTrigger className="flex text-start space-x-3">
                                        <img src="/course_logo.png" alt="" className="w-[100px] rounded-lg" />
                                        <div className="w-full h-full flex flex-col justify-between">
                                            <div>
                                                <p className="font-extrabold text-xl">{topic.topic_name}</p>
                                                <p className="text-sm">{topic.topic_description}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex items-center space-x-1">
                                                    <CirclePlus></CirclePlus>
                                                    <p className="font-extrabold text-sm">50 từ vựng</p>
                                                </div>
                                                <LockOpen size={25}></LockOpen>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="h-4/5">
                                        <div className="w-full h-3/4 flex flex-col items-center p-5 space-y-5">
                                            <div className="flex flex-col items-center space-y-3">
                                                <img src="/course_logo.png" alt="" className="rounded-lg" />
                                                <p className="font-semibold text-xl">Chủ đề: Trường Học</p>
                                                <p className="font-semibold">Từ vào cụm từ: 50</p>
                                                <Button className="w-1/3 bg-[#FDF24E] text-[#000000] hover:bg-[#FDF24E] rounded-xl">Học</Button>
                                            </div>
                                            <div className="w-full flex flex-col overflow-y-scroll">
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                                <div className="flex justify-between border-b-2 py-2 px-5">
                                                    <div className="flex space-x-3">
                                                        <Bookmark size={25} fill="#65558FA6" stroke="0"></Bookmark>
                                                        <p>학교</p>
                                                        <p>~haggyo~</p>
                                                    </div>
                                                    <p className="pl-3">Trường học</p>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grammar;