import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button';

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';

const Course = () => {
    const { state } = useLocation();

    console.log(state);

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                <NavigationBar></NavigationBar>
                <div className="w-auto h-auto p-5 space-x-3">
                    <div className="w-full h-full flex">
                        <Link 
                        to=".."
                        relative="path" 
                        className="justify-self-start"
                        >
                            <ArrowLeft size={30}></ArrowLeft>
                        </Link>
                        <div className="flex flex-col items-center space-y-5 font-montserrat">
                            <p className="font-extrabold text-4xl">{state.course.course_name.toUpperCase()}</p>
                            <div className="p-3 space-x-2 flex items-center border rounded-2xl">
                                <img src="/course_logo.png" alt="Course Logo" className="w-[216px] h-[216px] rounded-lg" />   
                                <div className="flex flex-col space-y-3">
                                    <div className="flex justify-between items-center">
                                        <p className="font-extrabold text-2xl">{state.course.course_name}</p> 
                                        <p className="font-bold text-2xl" style={{color: "#FFAB10"}}>${state.course.course_price}</p>
                                    </div>
                                    <p className="whitespace-pre-line">{state.course.course_description}</p>
                                </div>
                            </div>
                            <Button className="font-semibold rounded-2xl p-5" style={{backgroundColor: "#FDF24E", color: "#000000"}}>ĐĂNG KÝ NGAY</Button>
                            <div className="w-full flex flex-col items-start space-y-5">
                                <Link 
                                to={`/courses/${state.course.id}/vocab/`}
                                state={{
                                    parent_course: state.course
                                }}
                                className="flex items-center space-x-2">
                                    <img src="/vocab_logo.png" alt="" />
                                        <p className="font-extrabold text-2xl">{"Từ Vựng " + state.course.course_name}</p>
                                </Link>
                                <Link 
                                to={`/courses/${state.course.id}/grammar/`}
                                state={{
                                    parent_course: state.course
                                }}
                                className="flex items-center space-x-2">
                                    <img src="/vocab_logo.png" alt="" />
                                        <p className="font-extrabold text-2xl">{"Ngữ Pháp " + state.course.course_name}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course;