import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "@/components/Header";
import NavigationBar from "@/components/user/NavigationBar";
import GuestNavigationBar from "@/components/user/GuestNavigationBar";

import { Button } from "@/components/ui/button";
import axios from "axios";

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [cookies] = useCookies(['authorization']);
    const [paymentStatus, setPaymentStatus] = useState({});
    const [loading, setLoading] = useState(false);

    const formatCurrency = (value) => {
        value = value / 100;
    
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handlePaymentStatus = async (courseId) => {
        try {
            const res = await axios({
                method: "GET",
                url: `http://localhost:8080/api/mycourse/payment_status/${courseId}`,
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            setPaymentStatus((prevStatus) => ({
                ...prevStatus,
                [courseId]: res.data
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleRegister = async (course) => {
        if (cookies.authorization) {
            if (paymentStatus === "") {
                try {
                    setLoading(true);
        
                    const res = await axios({
                        method: "GET",
                        url: `http://localhost:8080/api/mycourse/enroll/${course.id}`,
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

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: "http://localhost:8080/api/course",
                    headers: {
                        Authorization: `Bearer ${cookies.authorization}`
                    }
                });
                setCourses(res.data);

                // Fetch payment status for each course
                res.data.forEach((course) => handlePaymentStatus(course.id));
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourses();
    }, [cookies.authorization]);

    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                {cookies.authorization ? <NavigationBar /> : <GuestNavigationBar />}
                <div className="w-full h-full flex flex-col items-center space-y-5 overflow-y-scroll">
                    {courses.map((course) => (
                        <div key={course.id} className="w-auto h-auto p-5 flex space-x-3">
                            <Link 
                                to={`/courses/${course.id}`} 
                                state={{ course_id: course.id }}
                                className="p-3 space-x-2 flex items-center border rounded-2xl font-montserrat"
                            >
                                <img src="course_logo.png" alt="" className="w-[216px] h-[216px] rounded-lg" />   
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <p className="font-extrabold text-2xl">{course.course_name.toUpperCase()}</p> 
                                        <p className="font-bold text-2xl" style={{color: "#FFAB10"}}>{formatCurrency(course.course_price)}</p>
                                    </div>
                                    <p className="whitespace-pre-line">
                                        {course.course_description}
                                    </p>
                                </div>
                            </Link>   
                            <Button 
                                onClick={() => handleRegister(course)}
                                className="w-[10%] h-auto text-wrap rounded-2xl" 
                                style={{ backgroundColor: "#FFD7004D", color: "#000000", border: "1px solid #D9D9D9" }}
                            >
                                {
                                    !paymentStatus[course.id] ? "ĐĂNG KÝ NGAY" 
                                    : (paymentStatus[course.id] === "pending" ? "NÂNG CẤP KHOÁ HỌC" : "ĐÃ NÂNG CẤP KHOÁ HỌC")
                                }
                            </Button> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Courses;