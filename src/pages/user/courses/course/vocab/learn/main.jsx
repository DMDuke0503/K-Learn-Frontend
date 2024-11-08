import { Link, useLocation } from 'react-router-dom';
import { X, Heart, Volume2, Loader, Check } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Progress } from '@/components/ui/progress';

import Header from '@/components/Header';
import SmallNavigationBar from '@/components/user/SmallNavigationBar';

const VocabLearn = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies('authorization');
    const [notLearnedVocabs, setNotLearnedVocabs] = useState([]);
    const [learnedVocabs, setLearnedVocabs] = useState([]);
    const [vocabs, setVocabs] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [progress, setProgress] = useState(0);
    const [vocabIndex, setVocabIndex] = useState(0);
    const [quizIndex, setQuizIndex] = useState(0);
    const [isQuiz, setIsQuiz] = useState(false);
    const [answer, setAnswer] = useState("");
    const [answerIndex, setAnswerIndex] = useState(-1);
    const [correct, setCorrect] = useState(false);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [nextQuiz, setNextQuiz] = useState(false);
    const [id, setId] = useState(0);
    const [count, setCount] = useState(0);
    const [markedVocab, setMarkedVocab] = useState(false);
    const [loading, setLoading] = useState(false);

    const getNotLearnedVocabs = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/vocabulary_progress/not_learned/${state.topic.topic_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });
            setNotLearnedVocabs(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getLearnedVocabs = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/vocabulary_progress/learned/${state.topic.topic_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });
            setLearnedVocabs(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getProgress = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/vocabulary_progress/progress/${state.topic.topic_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });
            setProgress(res.data.countVocabularyLearned / (res.data.countVocabularyLearned + res.data.countVocabularyNotLearned));
        } catch (err) {
            console.log(err);
        }
    }

    const getQuiz = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/quiz/vocabulary/${state.topic.topic_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            setQuiz(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handlePrevQuestion = () => {
        if (vocabIndex > 0) {
            setVocabIndex(vocabIndex - 1)
        }
    };
    
    const handleNextQuestion = () => {
        setVocabIndex((prevIndex) => {
            if (prevIndex === vocabs.length - 1 && progress === 1) {
                navigate(`/courses/${state.parent_course.id}/vocab`, {state: {parent_course: state.parent_course}, relative: "path"});
                return prevIndex;
            }
    
            const newIndex = prevIndex + 1;
    
            if ((newIndex >= learnedVocabs.length && (newIndex - learnedVocabs.length) % 5 === 0 && newIndex !== learnedVocabs.length) || (newIndex === vocabs.length)) {
                setIsQuiz(true);
                setNextQuiz(false);
                return learnedVocabs.length;
            }

            return newIndex;
        });
    };

    const handleChange = (e) => {
        setAnswer(e.target.value);
    }

    const handleQuizAnswer = async (answer, index) => {
        setAnswerIndex(index);
        setCorrectAnswerIndex(quiz[quizIndex].options.indexOf(quiz[quizIndex].definition));
        if (answer.toLowerCase() === quiz[quizIndex].definition.toLowerCase()) {
            setCorrect(true);
            setCount(count + 1);
            if (quiz[quizIndex].type === "essay" && count === 1) {
                setCount(0);
                await axios({
                    method: "PATCH",
                    url: `http://localhost:8080/api/vocabulary_progress/mark-proficient/topic/${state.topic.topic_id}/vocabulary/${quiz[quizIndex].vocabulary_id}`,
                    headers: {
                        Authorization: `Bearer ${cookies.authorization}`
                    },
                    data: {}
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        } else {
            setCorrect(false);
            if (quiz[quizIndex].type === "essay") {
                setCount(0);
                await axios({
                    method: "PATCH",
                    url: `http://localhost:8080/api/vocabulary_progress/mark-not-proficient/topic/${state.topic.topic_id}/vocabulary/${quiz[quizIndex].vocabulary_id}`,
                    headers: {
                        Authorization: `Bearer ${cookies.authorization}`
                    },
                    data: {}
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
        setNextQuiz(true);
    }

    const handleNextQuiz = () => {
        if (quizIndex < quiz.length - 1) {
            if (quizIndex < 9) {
                setQuizIndex(quizIndex + 1);
                setCorrectAnswerIndex(null);
                setNextQuiz(false);
                setAnswer("");
            } else {
                setIsQuiz(false);
                setQuizIndex(0);
                setCorrectAnswerIndex(null);
                getNotLearnedVocabs();
                getLearnedVocabs();
                getQuiz();
                getProgress();
            }
        } else {
            setIsQuiz(false);
            setQuizIndex(0);
            setCorrectAnswerIndex(null);
            getNotLearnedVocabs();
            getLearnedVocabs();
            getQuiz();
            getProgress();
        }
    }

    const res = window.speechSynthesis;
    const playAudio = (text) => {
        const value = new SpeechSynthesisUtterance(text);
        value.lang = "ko-KR";
        res.speak(value);
    }

    const handleCheckMarkedVocab = async (vocab_id) => {
        try {
            setLoading(true);

            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/marked_vocabulary/exist_marked_vocab/${vocab_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            console.log(res.data);

            if (res.data === false) {
                setMarkedVocab(false);
            } else {
                setMarkedVocab(true);
            }

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleMarkedVocab = async (vocab_id) => {
        if (markedVocab === false) {
            try {
                const res = await axios({
                    method: "POST",
                    url: `http://localhost:8080/api/marked_vocabulary/marked/${vocab_id}`,
                    headers: {
                        Authorization: `Bearer ${cookies.authorization}`
                    }
                });

                console.log(res.data);
                setMarkedVocab(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `http://localhost:8080/api/marked_vocabulary/soft_delete/${vocab_id}`,
                    headers: {
                        Authorization: `Bearer ${cookies.authorization}`
                    }
                });

                console.log(res.data);
                setMarkedVocab(false);
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    useEffect(() => {
        getNotLearnedVocabs();
        getLearnedVocabs();
        getProgress();
        getQuiz();
    }, []);
    
    useEffect(() => {
        if (learnedVocabs.length > 0 || notLearnedVocabs.length > 0) {
            setVocabs(learnedVocabs.concat(notLearnedVocabs));
            setVocabIndex(notLearnedVocabs.length? learnedVocabs.length: (notLearnedVocabs.length + learnedVocabs.length - 1));
        }
    }, [learnedVocabs, notLearnedVocabs]);

    useEffect(() => {
        handleCheckMarkedVocab(vocabs[vocabIndex]?.vocabulary.id);
    }, [learnedVocabs, notLearnedVocabs, vocabIndex]);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header />
            <div className="flex" style={{ height: "calc(100vh - 70px)" }}>
                <SmallNavigationBar />
                <div className="w-full h-full p-5 flex flex-col items-center">
                    <div className="w-4/5 h-fit flex justify-end">
                        <Link
                            to=".."
                            state={{
                                parent_course: state.parent_course
                            }}
                            relative="path"
                        >
                            <X size={25} />
                        </Link>
                    </div>
                    <div className="w-4/5 h-full flex flex-col justify-center space-y-3">
                        <p className="w-full h-fit font-extrabold text-2xl">Từ Vựng {state.parent_course.course_name} - Chủ Đề {state.topic.topic_name}</p>
                        <Progress value={progress * 100} className="h-[15px]" />
                        {
                            isQuiz? 
                            quiz[quizIndex].type === "multichoice"?
                            <>
                                <div className="w-full h-[80%] flex justify-center rounded-2xl p-5" style={{ border: "1px solid #000000" }}>
                                    <div className="w-[90%] h-full flex flex-col items-center">
                                        <div className="w-full h-[25%]">
                                            <p className="font-extrabold text-6xl">{quiz[quizIndex]?.word}</p>
                                        </div>
                                        <div className="w-full h-[75%] space-y-8">
                                            <p className="w-full h-[10%] font-semibold text-xl">Chọn đáp án đúng</p>
                                            <div className="w-full h-[90%] flex flex-col items-center">
                                                <div className="w-full h-full grid grid-cols-2 gap-x-[100px] gap-y-5 max-w-full mx-auto">
                                                    <div className="flex space-x-5">
                                                        <button
                                                            className={
                                                                `w-4/5 h-[100px] p-3 truncate border border-black rounded-[15px] font-semibold text-2xl ${nextQuiz? "cursor-not-allowed": "hover:bg-[#FDF24EA8] hover:border-[#FCD24F]"} ${answerIndex == 0? (correct? "bg-[#1EF265A8]": "bg-[#F51C1F]"): (correctAnswerIndex == 0? "bg-[#1EF265A8]": "")}`
                                                            }
                                                            {...(nextQuiz? { disabled: true }: {})}
                                                            onClick={() => handleQuizAnswer(quiz[quizIndex]?.options[0], 0)}
                                                        >{quiz[quizIndex]?.options[0] || '...'}</button>
                                                        {
                                                            correct? 
                                                            <Check 
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8] ${answerIndex == 0? "": "invisible"}`
                                                                }
                                                            ></Check>:
                                                            correctAnswerIndex == 0?
                                                            <Check
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8]`
                                                                }
                                                            ></Check>:
                                                            <X
                                                                className={
                                                                    `w-1/5 h-fit text-[#F51C1F] ${answerIndex == 0? "": "invisible"}`
                                                                }
                                                            ></X>
                                                        }
                                                    </div>
                                                    <div className="flex space-x-5">
                                                        <button
                                                            className={
                                                                `w-4/5 h-[100px] p-3 truncate border border-black rounded-[15px] font-semibold text-2xl ${nextQuiz? "cursor-not-allowed": "hover:bg-[#FDF24EA8] hover:border-[#FCD24F]"} ${answerIndex == 1? (correct? "bg-[#1EF265A8]": "bg-[#F51C1F]"): (correctAnswerIndex == 1? "bg-[#1EF265A8]": "")}`
                                                            }
                                                            {...(nextQuiz? { disabled: true }: {})}
                                                            onClick={() => handleQuizAnswer(quiz[quizIndex]?.options[1], 1)}
                                                        >{quiz[quizIndex]?.options[1] || '...'}</button>
                                                        {
                                                            correct? 
                                                            <Check 
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8] ${answerIndex == 1? "": "invisible"}`
                                                                }
                                                            ></Check>:
                                                            correctAnswerIndex == 1?
                                                            <Check
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8]`
                                                                }
                                                            ></Check>:
                                                            <X
                                                                className={
                                                                    `w-1/5 h-fit text-[#F51C1F] ${answerIndex == 1? "": "invisible"}`
                                                                }
                                                            ></X>
                                                        }
                                                    </div>
                                                    <div className="flex space-x-5">
                                                        <button
                                                            className={
                                                                `w-4/5 h-[100px] p-3 truncate border border-black rounded-[15px] font-semibold text-2xl ${nextQuiz? "cursor-not-allowed": "hover:bg-[#FDF24EA8] hover:border-[#FCD24F]"} ${answerIndex == 2? (correct? "bg-[#1EF265A8]": "bg-[#F51C1F]"): (correctAnswerIndex == 2? "bg-[#1EF265A8]": "")}`
                                                            }
                                                            {...(nextQuiz? { disabled: true }: {})}
                                                            onClick={() => handleQuizAnswer(quiz[quizIndex]?.options[2], 2)}
                                                        >{quiz[quizIndex]?.options[2] || '...'}</button>
                                                        {
                                                            correct? 
                                                            <Check 
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8] ${answerIndex == 2? "": "invisible"}`
                                                                }
                                                            ></Check>:
                                                            correctAnswerIndex == 2?
                                                            <Check
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8]`
                                                                }
                                                            ></Check>:
                                                            <X
                                                                className={
                                                                    `w-1/5 h-fit text-[#F51C1F] ${answerIndex == 2? "": "invisible"}`
                                                                }
                                                            ></X>
                                                        }
                                                    </div>
                                                    <div className="flex justify-end space-x-5">
                                                        <button
                                                            className={
                                                                `w-4/5 h-[100px] p-3 truncate border border-black rounded-[15px] font-semibold text-2xl ${nextQuiz? "cursor-not-allowed": "hover:bg-[#FDF24EA8] hover:border-[#FCD24F]"} ${answerIndex == 3? (correct? "bg-[#1EF265A8]": "bg-[#F51C1F]"): (correctAnswerIndex == 3? "bg-[#1EF265A8]": "")}`
                                                            }
                                                            {...(nextQuiz? { disabled: true }: {})}
                                                            onClick={() => handleQuizAnswer(quiz[quizIndex]?.options[3], 3)}
                                                        >{quiz[quizIndex]?.options[3] || '...'}</button>
                                                        {
                                                            correct? 
                                                            <Check 
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8] ${answerIndex == 3? "": "invisible"}`
                                                                }
                                                            ></Check>:
                                                            correctAnswerIndex == 3?
                                                            <Check
                                                                className={
                                                                    `w-1/5 h-fit text-[#1EF265A8]`
                                                                }
                                                            ></Check>:
                                                            <X
                                                                className={
                                                                    `w-1/5 h-fit text-[#F51C1F] ${answerIndex == 3? "": "invisible"}`
                                                                }
                                                            ></X>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[50px] flex justify-end px-5">
                                    <button 
                                        onClick={handleNextQuiz} 
                                        className={
                                            nextQuiz? 
                                            "px-4 py-2 rounded-lg bg-[#FDF24E]":
                                            "px-4 py-2 rounded-lg bg-[#FDF24E] hidden"
                                        }
                                    >
                                        Tiếp theo
                                    </button>
                                </div>
                            </>:
                            <>
                                <div className="w-full h-[80%] flex justify-center rounded-2xl p-5" style={{ border: "1px solid #000000" }}>
                                    <div className="w-[70%] h-full flex flex-col items-center">
                                        <div className="w-full h-[25%] flex items-center">
                                            <p className="font-extrabold text-6xl">{quiz[quizIndex]?.word}</p>
                                        </div>
                                        <div className="w-full h-[75%]">
                                                <div className={`w-full h-1/2 space-y-8 ${nextQuiz? "": "hidden"}`}>
                                                    <div className="w-full h-fit space-y-3 flex flex-col">
                                                        <p className="w-full h-fit font-semibold text-xl">Nhập định nghĩa đúng của từ</p>
                                                        <div className="w-full flex">
                                                            <div className={`w-3/4 h-[50px] flex items-center p-3 rounded-[20px] ${correct? "bg-[#1EF265A8]": "bg-[#F51C1F]"}`}>
                                                                <p className="font-semibold text-xl">{answer}</p>
                                                            </div>
                                                            <Check 
                                                                className={
                                                                    `w-1/5 h-[50px] ${correct? "text-[#1EF265A8]": "text-[#F51C1F]"}`
                                                                }
                                                            ></Check>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-fit space-y-3 flex flex-col">
                                                        <p className="w-full h-[10%] font-semibold text-xl">Đáp án</p>
                                                        <div className="w-full flex">
                                                            <div className="w-3/4 h-[50px] flex items-center p-3 rounded-[20px] bg-[#1EF265A8]">
                                                                <p className="font-semibold text-xl">{quiz[quizIndex]?.definition}</p>
                                                            </div>
                                                            <Check className="w-1/5 h-[50px] text-[#1EF265A8]"></Check>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea onChange={handleChange} type="text" placeholder="Nhập ..." className={`w-full h-1/2 p-5 rounded-[15px] border border-black ${nextQuiz? "hidden": ""}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end px-5">
                                    {
                                        nextQuiz?
                                        <button onClick={handleNextQuiz} className="px-4 py-2 rounded-lg bg-[#FDF24E]">
                                            Tiếp theo
                                        </button>:
                                        <button onClick={() => handleQuizAnswer(answer)} className="px-4 py-2 rounded-lg bg-[#FDF24E]">
                                            Xác nhận
                                        </button>
                                    }
                                </div>
                            </>:
                            <>
                                <div className="w-full h-[80%] flex justify-between rounded-2xl p-5" style={{ border: "1px solid #000000" }}>
                                    {
                                        vocabs.length === 0 || loading? 
                                        <div className="w-full h-full flex justify-center items-center">
                                            <Loader size={200}/>
                                        </div>:
                                        <div className="w-full h-full flex  space-x-2">
                                            <div className="w-1/3 h-full flex flex-col justify-start space-y-5">
                                                <div>
                                                    <p className="font-semibold">Tiếng Hàn</p>
                                                    <div className="flex space-x-3">
                                                        <p className="font-extrabold text-4xl">{vocabs[vocabIndex]?.vocabulary.word}</p>
                                                        <Volume2 onClick={() => playAudio(vocabs[vocabIndex]?.vocabulary.word)} size={30} color="#FFD233" />
                                                    </div>
                                                    <p>{vocabs[vocabIndex]?.vocabulary.transcription || '...'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Tiếng Việt</p>
                                                    <p className="font-extrabold text-4xl">{vocabs[vocabIndex]?.vocabulary.definition || '...'}</p>
                                                </div>
                                            </div>
                                            <div className="w-2/3 h-full flex justify-end space-x-3">
                                                <img src="/pronunciation.png" alt="" className="w-auto h-auto" />
                                            </div>
                                            <Heart onClick={() => handleMarkedVocab(vocabs[vocabIndex]?.vocabulary.id)} size={50} className={`${markedVocab? "text-red-500 fill-red-500": "text-black fill-black"}`} />
                                        </div>
                                    }
                                </div>
                                <div className="flex justify-between px-5">
                                    <button onClick={handlePrevQuestion} className="px-4 py-2 rounded-lg bg-[#D9D9D9]">
                                        Quay lại
                                    </button>
                                    <button onClick={handleNextQuestion} className="px-4 py-2 rounded-lg bg-[#FDF24E]">
                                        {vocabIndex === vocabs.length - 1 && progress === 1? "Hoàn thành": "Tiếp theo"}
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VocabLearn;