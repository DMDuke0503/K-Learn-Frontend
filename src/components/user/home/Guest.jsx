import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import GuestNavigationBar from "../GuestNavigationBar";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const HomeGuest = () => {
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);

    const handleTopic = async () => {
        try {
            const topicRes = await axios({
                method: "GET",
                url: `http://localhost:8080/api/homepage/topic-section`,
            });
 
            setTopics(topicRes.data.grammar.concat(topicRes.data.topic_vocab));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { 
        axios({
            method: "GET",
            url: "http://localhost:8080/api/course",
        }).then((res) => {
            setCourses(res.data);
        }).catch((err) => {
            console.log(err);
        })

        handleTopic();
    }, []);

    return (
        <>
            <GuestNavigationBar></GuestNavigationBar>
            <div className="w-full px-5 flex flex-col items-center pt-10 overflow-y-scroll">
                <div className="w-full h-[400px] flex ">
                    <img src="/home_image.png" alt="" className="object-fill h-full w-full"/>
                </div>
                <div className="w-full flex flex-col justify-self-start">
                    <Carousel className="py-5">
                        <div className="flex justify-between items-center">
                            <p className="font-montserrat font-semibold text-lg">Chủ đề</p>
                            <div className="space-x-2">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </div>
                        <CarouselContent className="h-full">
                            {
                                courses.map((course, index) => (
                                    <CarouselItem key={index} className="basis-1/3 my-2">
                                        <Link 
                                            to={`courses/${course.id}/grammar`}
                                            state={{
                                                parent_course: courses[course.id - 1]
                                            }}
                                            className="w-full min-h-[200px] flex flex-col rounded-xl p-5 space-y-2" 
                                            style={{boxShadow: "0px 14px 40px 0px #080F340F"}}
                                            >
                                                <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                                <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                                    <p>HỌC</p>
                                                </div>
                                                <p className="w-full flex justify-self-start font-montserrat font-bold text-base">{course.course_name}</p>
                                        </Link>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default HomeGuest;