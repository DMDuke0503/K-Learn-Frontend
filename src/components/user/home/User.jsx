import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import NavigationBar from "@/components/user/NavigationBar";

import { Bell, EllipsisVertical, LogOut } from "lucide-react";
import { set } from "date-fns";

const HomeUser = () => {
    const [cookies, setCookies, removeCookie] = useCookies(['authorization']);
    const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);
    const [progress, setProgress] = useState([]);
    const navigate = useNavigate();

    const handleLogin = () => {
        removeCookie('authorization');
        navigate(0);
    }

    const handleUser = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: "http://localhost:8080/api/user/profile",
                headers: {
                    "Authorization": `Bearer ${cookies.authorization}`,
                }
            })
            
            console.log(res.data);

            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTopic = async () => {
        try {
            const topicRes = await axios({
                method: "GET",
                url: `http://localhost:8080/api/homepage/topic-section`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`,
                },
            });
 
            setTopics(topicRes.data.grammar.concat(topicRes.data.topic_vocab));

            const progressRes = await axios({
                method: "GET",
                url: `http://localhost:8080/api/homepage/progress-section`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`,
                },
            });

            console.log(progressRes.data);
            setProgress(progressRes.data.grammar.concat(progressRes.data.vocab));
        } catch (err) {
            console.log(err);
        }
    }

    const handleCourse = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: "http://localhost:8080/api/course",
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`,
                },
            });

            setCourses(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleCourse();
        handleUser();
    }, []);
    
    useEffect(() => {
        if (user.id) {
            handleTopic(user.id);
        }
    }, [user]);

    return (
        <>
            <NavigationBar></NavigationBar>
            <div className="px-5 flex flex-col items-center pt-10 overflow-y-scroll"  style={{width: "calc(100vw - 20vw - 250px)"}}>
                <div className="w-full h-[400px] flex ">
                    <img src="/home_image.png" alt="" className="object-fill h-full w-full"/>
                </div>
                <div className="w-full flex flex-col justify-self-start">
                    <Carousel className="py-5">
                        <div className="flex justify-between items-center">
                            <p className="font-montserrat font-semibold text-lg">Khoá học đề cử</p>
                            <div className="space-x-2">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </div>
                        <CarouselContent className="">
                            {
                                courses.map((course, index) => (
                                    <CarouselItem key={index} className="basis-1/3 my-2">
                                        <Link 
                                            to={`courses/${course.id}`}
                                            state={{
                                                course: course
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
                <div className={`w-full flex flex-col justify-self-start ${!progress.length && 'hidden'}`}>
                    <Carousel className="py-5">
                        <div className="flex justify-between items-center">
                            <p className="font-montserrat font-semibold text-lg">Tiếp tục học</p>
                            <div className="space-x-2">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </div>
                        <CarouselContent className="">
                        {
                                progress.map((topic, index) => (
                                    'grammar_progress' in topic? 
                                    <CarouselItem key={index} className="basis-1/3 my-2">
                                        <Link 
                                            to={`courses/${topic.course_id}/grammar`}
                                            state={{
                                                parent_course: courses[topic.course_id - 1]
                                            }}
                                            className="w-full min-h-[200px] flex flex-col justify-between rounded-xl p-5 space-y-2" 
                                            style={{boxShadow: "0px 14px 40px 0px #080F340F"}}
                                            >
                                                <div className="space-y-2">
                                                    <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                                    <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                                        <p>HỌC</p>
                                                    </div>
                                                    <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Ngữ Pháp {topic.course_name}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <Progress value={topic.grammar_progress} />
                                                    <p className="font-semibold">{topic.grammar_progress} %</p>
                                                </div>
                                        </Link>
                                    </CarouselItem>:
                                    <CarouselItem key={index} className="basis-1/3 my-2">
                                        <Link 
                                            to={`courses/${topic.course_id}/vocab`}
                                            state={{
                                                parent_course: courses[0]
                                            }}
                                            className="w-full min-h-[200px] flex flex-col justify-between rounded-xl p-5 space-y-2" 
                                            style={{boxShadow: "0px 14px 40px 0px #080F340F"}}
                                            >
                                                <div className="space-y-2">
                                                    <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                                    <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                                        <p>HỌC</p>
                                                    </div>
                                                    <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng {topic.course_name} - Chủ đề {topic.topic_name}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <Progress value={topic.vocabulary_progress} />
                                                    <p className="font-semibold">{topic.vocabulary_progress} %</p>
                                                </div>
                                        </Link>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
            <div className="w-1/5 flex flex-col items-end text-nowrap p-3" style={{boxShadow: "0px 14px 42px 0px #080F340F"}}>
                <Popover>
                    <PopoverTrigger asChild>
                        <EllipsisVertical className="mb-5"></EllipsisVertical>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-5 space-y-3">
                        <div className="py-4 px-4 space-y-1 bg-[#FFFCD9] rounded-lg" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
                            <p className="font-extrabold text-[#111111]">{user.fullname}</p>
                            <p className="text-[#4B5563]">{user.email}</p>
                            <Button className="w-[200px] bg-[#FEE440] text-[#4B5563] rounded-2xl hover:bg-[#FEE440]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>Thông tin cá nhân</Button>
                        </div>
                        <Button onClick={handleLogin} variant="outline" className="flex items-center space-x-3">
                            <LogOut size={25} />
                            <p>Đăng xuất</p>
                        </Button>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-col items-center space-y-2">
                    <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-extrabold text-[#202020]">Xin chào {user.fullname}</p>
                    <p className="font-extrabold text-center text-[#7E7E7E] text-wrap">Tiếp tục học và đạt đến mục tiêu của bạn</p>
                </div>
            </div>
        </>
    )
}

export default HomeUser;