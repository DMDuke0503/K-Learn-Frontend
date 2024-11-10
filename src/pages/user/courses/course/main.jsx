import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';
import GuestNavigationBar from '@/components/user/GuestNavigationBar';

const Course = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['authorization'])
    const { state } = useLocation();
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");

    const formatCurrency = (value) => {
        value = value / 100;

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handleRegister = async (course_id) => {
        if (cookies.authorization) {
            if (paymentStatus === "") {
                try {
                    setLoading(true);
        
                    const res = await axios({
                        method: "GET",
                        url: `http://localhost:8080/api/mycourse/enroll/${course_id}`,
                        headers: {
                            Authorization: `Bearer ${cookies.authorization}`
                        }
                    });
        
                    console.log(res.data);
                    setPaymentStatus("pending");
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                }
            } else if (paymentStatus === "pending") {
                navigate("/payment", {state: {parent_course: course}});
            }
        } else {
            navigate("/login");
        }
    }

    const handlePaymentStatus = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/mycourse/payment_status/${course.id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            console.log(res.data);
            setPaymentStatus(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCourse = async () => {
        try {
            setLoading(true);

            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/course/${state.course_id}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            console.log(res.data);
            setCourse(res.data);

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleCourse();
    }, []);

    useEffect(() => {
        handlePaymentStatus();
    }, [course]);

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                {cookies.authorization? <NavigationBar></NavigationBar> : <GuestNavigationBar></GuestNavigationBar>}
                <div className="w-full h-auto p-5 space-x-3">
                    {
                        loading? 
                        <div className="w-full h-full flex justify-center items-center">
                            <Loader size={200}/>
                        </div>:
                        <div className="w-full h-full flex">
                            <Link 
                            to=".."
                            relative="path" 
                            className="justify-self-start"
                            >
                                <ArrowLeft size={30}></ArrowLeft>
                            </Link>
                            <div className="flex flex-col items-center space-y-5 font-montserrat">
                                <p className="font-extrabold text-4xl">{course.course_name?.toUpperCase()}</p>
                                <div className="p-3 space-x-2 flex items-center border rounded-2xl">
                                    <img src="/course_logo.png" alt="Course Logo" className="w-[216px] h-[216px] rounded-lg" />   
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="font-extrabold text-2xl">{course.course_name}</p> 
                                            <p className="font-bold text-2xl" style={{color: "#FFAB10"}}>{formatCurrency(course.course_price)}</p>
                                        </div>
                                        <p className="whitespace-pre-line">{course.course_description}</p>
                                    </div>
                                </div>
                                <Button onClick={() => handleRegister(course.id)} className={`font-semibold rounded-2xl p-5 ${paymentStatus === "success" && "cursor-not-allowed"}`} style={{backgroundColor: "#FDF24E", color: "#000000"}}>
                                    {
                                        paymentStatus === ""? "ĐĂNG KÝ NGAY": (paymentStatus === "pending"? "NÂNG CẤP KHOÁ HỌC": "ĐÃ NÂNG CẤP KHOÁ HỌC")
                                    }
                                </Button>
                                <div className="w-full flex flex-col items-start space-y-5">
                                    <Link 
                                        to={`/courses/${course.id}/vocab/`}
                                        state={{
                                            parent_course_id: course.id
                                        }}
                                        className="flex items-center space-x-2"
                                    >
                                        <img src="/vocab_logo.png" alt="" />
                                        <p className="font-extrabold text-2xl">{"Từ Vựng " + course.course_name}</p>
                                    </Link>
                                    <Link 
                                        to={`/courses/${course.id}/grammar/`}
                                        state={{
                                            parent_course_id: course.id
                                        }}
                                        className="flex items-center space-x-2"
                                    >
                                        <img src="/vocab_logo.png" alt="" />
                                        <p className="font-extrabold text-2xl">{"Ngữ Pháp " + course.course_name}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Course;