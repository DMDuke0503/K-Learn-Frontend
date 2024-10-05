import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, LockOpen, CirclePlus, Bookmark, Volume2, Mic } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

import Header from '@/components/Header';
import SmallNavigationBar from '@/components/user/SmallNavigationBar';

const VocabLearn = () => {
    const { state } = useLocation();
    const [cookies] = useCookies('authorization');
    const [topics, setTopics] = useState([]);
    
    useEffect(() => {
        
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <SmallNavigationBar></SmallNavigationBar>
                <div className="w-full h-full p-5 flex justify-center">
                    <div className="w-4/5 h-auto flex flex-col space-y-3">
                        <p className="font-extrabold text-2xl">Từ Vựng {state.parent_course.course_name} - Chủ Đề {state.topic.topic_name}</p>
                        <Progress value={85} className="h-[15px]"></Progress>
                        <div className="w-full h-[50%] flex justify-between rounded-2xl p-5" style={{border: "1px solid #000000"}}>
                            <div className="h-full flex flex-col justify-between">
                                <div>
                                    <p className="font-semibold">Tiếng Hàn</p>
                                    <div className="flex items-center space-x-3">
                                        <p className="font-extrabold text-4xl">은행</p>
                                        <Volume2 size={30} color="#FFD233"></Volume2>
                                    </div>
                                    <p>~eun-haeng~</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Tiếng Việt</p>
                                    <p className="font-extrabold text-4xl">Ngân hàng</p>
                                </div>
                                <Mic size={50}></Mic>
                            </div>
                            <img src="/pronunciation.png" alt="" className="w-auto h-auto" />
                        </div>
                        <div className="w-full h-[20%] flex justify-between rounded-2xl p-5 bg-[#FFF12D33]" style={{boxShadow: "0px 4px 4px 0px #00000040", border: "1px solid #000000"}}>
                            <p>Nhận xét:</p>
                            <p></p>
                        </div>
                        <div className="flex justify-between px-5">
                            <div className="px-4 py-2 rounded-lg bg-[#D9D9D9]">
                                <p>Quay lại</p>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-[#FDF24E]">
                                <p>Tiếp theo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VocabLearn;