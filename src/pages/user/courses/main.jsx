import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "@/components/Header";
import NavigationBar from "@/components/user/NavigationBar";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [cookies] = useCookies('authorization');

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8080/api/course",
            headers: {
                Authorization: `Bearer ${cookies.authorization}`
            }
        })
        .then(res => {
            setCourses(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <NavigationBar></NavigationBar>
                <div className="w-full h-full flex flex-col items-center space-y-5 overflow-y-scroll">
                    {courses.map(course => 
                        <div key={course.id} className="w-auto h-auto p-5 flex space-x-3">
                            <Link 
                            to={`/courses/${course.id}`} 
                            state={{course: course}}
                            className="p-3 space-x-2 flex items-center border rounded-2xl font-montserrat"
                            >
                                <img src="course_logo.png" alt="" className="w-[216px] h-[216px] rounded-lg" />   
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <p className="font-extrabold text-2xl">{course.course_name.toUpperCase()}</p> 
                                        <p className="font-bold text-2xl" style={{color: "#FFAB10"}}>${course.course_price}</p>
                                    </div>
                                    <p className="whitespace-pre-line">
                                        {course.course_description}
                                    </p>
                                </div>
                            </Link>   
                            <Button className="w-auto h-auto text-wrap rounded-2xl" style={{backgroundColor: "#FFD7004D", color: "#000000", border: "1px solid #D9D9D9"}}>ĐĂNG KÝ NGAY</Button> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Courses;