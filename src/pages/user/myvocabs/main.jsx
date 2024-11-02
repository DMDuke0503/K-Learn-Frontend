import { Link, useLocation } from "react-router-dom";
import { CircleCheck } from 'lucide-react';
import axios from "axios";
import { useCookies } from "react-cookie";

import Header from "@/components/Header";
import NavigationBar from "@/components/user/NavigationBar";
import { useEffect, useState } from "react";
import { set } from "date-fns";

const MyVocabs = () => {
    const { state } = useLocation();
    const [cookies] = useCookies();
    const [vocabs, setVocabs] = useState([]);
    const [choosenVocab, setChoosenVocab] = useState([]);

    const handleMyVocabs = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: "http://localhost:8080/api/marked_vocabulary/list",
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            console.log(res.data);
            setVocabs(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChooseVocab = (vocab) => {
        if (choosenVocab.includes(vocab)) {
            setChoosenVocab(choosenVocab.filter((item) => item !== vocab));
        } else {
            setChoosenVocab([...choosenVocab, vocab]);
        }
    }

    useEffect(() => {
        handleMyVocabs();
    }, []);

    console.log(choosenVocab);

    return (
        <div className="h-screen w-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-screen flex flex-row" style={{height: "calc(100vh - 70px)"}}>
                <NavigationBar></NavigationBar>
                <div className="h-full px-5 flex flex-col pt-10 space-y-5"  style={{width: "calc(100vw - 250px)"}}>
                    <p className="font-extrabold text-2xl text-nowrap">TỪ VỰNG CỦA TÔI</p>
                    <div className="w-full h-3/4 overflow-y-scroll">
                        <div className="grid grid-cols-3 gap-x-[50px] gap-y-5 min-w-full mx-auto">
                            {
                                vocabs.map((vocab) => {
                                    const isSelected = choosenVocab.includes(vocab.vocabulary.id);

                                    return (
                                        <button 
                                            key={vocab.id} 
                                            onClick={() => handleChooseVocab(vocab.vocabulary.id)}
                                            className={`w-full h-[100px] flex items-center p-3 border border-black rounded-xl text-left font-semibold`}
                                        >
                                            <div className="w-3/4">
                                                <p className="text-[#AC711E]">{vocab.vocabulary.word}</p>
                                                <p className="">{vocab.vocabulary.definition}</p>
                                            </div>
                                            <div className="w-1/4 flex justify-center">
                                                <CircleCheck className={`${isSelected? "text-green-500": ""}`} />
                                            </div>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full h-1/4">
                        <div className="w-full space-x-3 flex items-center">
                            <p className="font-semibold text-xl">Đã chọn: </p>
                            <p className="font-semibold text-xl text-[#C87202]">{choosenVocab.length}</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="h-fit py-5 px-10 rounded-[15px] bg-[#FDF24E] font-extrabold text-2xl">LÀM QUIZ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyVocabs;