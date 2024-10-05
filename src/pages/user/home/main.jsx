import { useState } from "react";
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

import Header from "@/components/Header";
import NavigationBar from "@/components/user/NavigationBar";

import { Bell, EllipsisVertical, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { set } from "date-fns";

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleLogin = () => {
        removeCookie('authorization');
        navigate("/login");
    }

    console.log(cookies.authorization)

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8080/api/user/profile",
            headers: {
                "Authorization": `Bearer ${cookies.authorization}`,
            }
        })
        .then((res) => {
            console.log(res);

            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-screen flex flex-row" style={{height: "calc(100vh - 70px)"}}>
                <NavigationBar></NavigationBar>
                <div className="w-auto px-5 flex flex-col items-center pt-10 overflow-y-scroll">
                    <div className="w-full h-[400px] flex ">
                        <img src="/home_image.png" alt="" className="object-fill h-full w-full"/>
                    </div>
                    <div className="w-full flex flex-col justify-self-start">
                        <Carousel className="py-5">
                            <div className="flex justify-between items-center">
                                <p className="font-montserrat font-semibold text-lg">Học thử miễn phí</p>
                                <div className="space-x-2">
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </div>
                            </div>
                            <CarouselContent className="h-fit">
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>HỌC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>HỌC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>HỌC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>HỌC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div className="w-full flex flex-col justify-self-start">
                        <Carousel className="py-5">
                            <div className="flex justify-between items-center">
                                <p className="font-montserrat font-semibold text-lg">Tiếp tục học</p>
                                <div className="space-x-2">
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </div>
                            </div>
                            <CarouselContent className="h-fit">
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>TIẾP TỤC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                        <Progress value={33} />
                                        <p>33%</p>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>TIẾP TỤC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                        <Progress value={33} />
                                        <p>33%</p>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>TIẾP TỤC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                        <Progress value={33} />
                                        <p>33%</p>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-1/3 my-2">
                                    <div className="w-full h-auto flex flex-col rounded-xl p-5 space-y-2" style={{boxShadow: "0px 14px 40px 0px #080F340F"}}>
                                        <img src="course_image.png" alt="" className="w-full h-auto py-3" />
                                        <div className="w-fit px-3 rounded-2xl" style={{backgroundColor: "#FFF12D33"}}>
                                            <p>TIẾP TỤC</p>
                                        </div>
                                        <p className="w-full flex justify-self-start font-montserrat font-bold text-base">Từ Vựng Tiếng Hàn Sơ Cấp - Trường Học</p>
                                        <Progress value={33} />
                                        <p>33%</p>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
                <div className="w-fit flex flex-col items-end text-nowrap p-3" style={{boxShadow: "0px 14px 42px 0px #080F340F"}}>
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
                        <Button className="w-[50px] h-[50px] rounded-full" style={{backgroundColor: "#FFFFFF", border: "1px solid #9E9E9E"}}>
                            <Bell className="w-full h-full" strokeWidth={2} color="#49454F" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;