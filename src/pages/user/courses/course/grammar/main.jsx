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
import GrammarLesson from '@/components/user/courses/course/grammar/GrammarLesson';

const Grammar = () => {
    const [cookies] = useCookies('authorization');

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-[90vh] flex">
                {cookies.authorization? <NavigationBar></NavigationBar> : <GuestNavigationBar></GuestNavigationBar>}
                <GrammarLesson></GrammarLesson>
            </div>
        </div>
    )
}

export default Grammar;