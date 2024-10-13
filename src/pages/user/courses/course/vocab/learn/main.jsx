import { Link, useLocation } from 'react-router-dom';
import { X, Volume2, Heart } from 'lucide-react';
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
    const [notLearnedVocabs, setNotLearnedVocabs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [index, setIndex] = useState(0);

    const res = window.speechSynthesis;

    const playAudio = (text) => {
        const value = new SpeechSynthesisUtterance(text);

        value.lang = "ko-KR";

        res.speak(value);
    };

    const handlePrevQuestion = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    const handleNextQuestion = () => {
        if (index < notLearnedVocabs.length - 1) {
            setIndex(index + 1);
        }
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/api/vocabulary_progress/topic/${state.topic.id}`,
            headers: {
                Authorization: `Bearer ${cookies.authorization}`
            }
        })
        .then(res => {
            setNotLearnedVocabs(res.data);
            console.log(notLearnedVocabs[index].vocabulary.word)
        })
        .catch(err => {
            console.log(err);
        });

        axios({
            method: "GET",
            url: `http://localhost:8080/api/vocabulary_progress/progress/${state.topic.id}`,
            headers: {
                Authorization: `Bearer ${cookies.authorization}`
            }
        })
        .then(res => {
            setProgress(res.data.countVocabularyLearned / (res.data.countVocabularyLearned + res.data.countVocabularyNotLearned));
            console.log(progress);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <SmallNavigationBar></SmallNavigationBar>
                <div className="w-full h-full p-5 flex flex-col items-center">
                    <div className="w-4/5 h-fit flex justify-end">
                        <Link
                        to=".."
                        state={{
                            parent_course: state.parent_course
                        }}
                        relative="path"
                        >
                            <X size={25}></X>
                        </Link>
                    </div>
                    <div className="w-4/5 h-full flex flex-col justify-center space-y-3">
                        <p className="font-extrabold text-2xl">Từ Vựng {state.parent_course.course_name} - Chủ Đề {state.topic.topic_name}</p>
                        <Progress value={progress} className="h-[15px]"></Progress>
                        <div className="w-full h-[50%] flex justify-between rounded-2xl p-5" style={{border: "1px solid #000000"}}>
                            <div className="w-1/3 h-full flex flex-col justify-start space-y-5">
                                <div>
                                    <p className="font-semibold">Tiếng Hàn</p>
                                    <div className="flex space-x-3">
                                        <p className="font-extrabold text-4xl">{notLearnedVocabs[index]?.vocabulary.word}</p>
                                        <Volume2 onClick={() => playAudio(notLearnedVocabs[index]?.vocabulary.word)} size={30} color="#FFD233"></Volume2>
                                    </div>
                                    <p>{notLearnedVocabs[index]?.vocabulary.transcription}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Tiếng Việt</p>
                                    <p className="font-extrabold text-4xl">{notLearnedVocabs[index]?.vocabulary.definition}</p>
                                </div>
                            </div>
                            <div className="w-2/3 h-full flex justify-end space-x-3">
                                <img src="/pronunciation.png" alt="" className="w-auto h-auto" />
                                <Heart className="w-[30px] h-[30px]"></Heart>
                            </div>
                        </div>
                        <div className="flex justify-between px-5">
                            <div onClick={handlePrevQuestion} className="px-4 py-2 rounded-lg bg-[#D9D9D9]">
                                <p>Quay lại</p>
                            </div>
                            <div onClick={handleNextQuestion} className="px-4 py-2 rounded-lg bg-[#FDF24E]">
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