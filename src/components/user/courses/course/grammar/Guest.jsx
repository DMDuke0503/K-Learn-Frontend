import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, LockOpen, CirclePlus, Bookmark } from 'lucide-react';
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

const GuestGrammar = () => {
    const { state } = useLocation();
    const [grammars, setGrammars] = useState([]);
    const [cookies] = useCookies('authorization');
    
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/api/grammar/${state.parent_course.id}`,
            headers: {
                Authorization: `Bearer ${cookies.authorization}`
            }
        })
        .then(res => {
            console.log(res.data);

            setGrammars(res.data);
        })
        .catch(err => {
            console.log(err);
        });
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
                    <p className="pt-5 font-extrabold text-2xl text-nowrap">{"Ngữ Pháp " + state.parent_course.course_name}</p>
                    <p className="font-extrabold text-xl">Bài Học</p>
                    {grammars.map((grammar) => 
                        <Link to={cookies.authorization? "./learn" : "/login"} key={grammar.id} className="w-[90%] flex text-start space-x-3">
                            <img src="/course_logo.png" alt="" className="w-[100px] rounded-lg" />
                            <div className="w-full h-full flex flex-col justify-between">
                                <div>
                                    <p className="font-extrabold text-xl">Bài {grammar.lesson_number}: {grammar.grammar_name}</p>
                                    <p className="text-sm">{grammar.grammar_description}</p>
                                </div>
                                <div className="flex justify-end">
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

export default GuestGrammar;