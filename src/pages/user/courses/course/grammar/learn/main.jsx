import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, LockOpen, CirclePlus, Bookmark, Volume2, Heart } from 'lucide-react';
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

const GrammarLearn = () => {
    const { state } = useLocation();
    const [cookies] = useCookies('authorization');
    const [topics, setTopics] = useState([]);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <SmallNavigationBar></SmallNavigationBar>
                <div className="w-full h-full p-5 flex justify-center">
                    
                </div>
            </div>
        </div>
    )
}

export default GrammarLearn;