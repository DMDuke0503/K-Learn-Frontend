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
import GuestNavigationBar from '@/components/user/GuestNavigationBar';
import GuestGrammar from '@/components/user/courses/course/grammar/Guest';

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
                {cookies.authorization? <NavigationBar></NavigationBar> : <GuestNavigationBar></GuestNavigationBar>}
                <GuestGrammar></GuestGrammar>
            </div>
        </div>
    )
}

export default Grammar;