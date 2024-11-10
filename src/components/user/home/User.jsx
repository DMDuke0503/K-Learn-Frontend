import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { format, set } from 'date-fns'

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

import { EllipsisVertical, LogOut, User, Settings, X } from "lucide-react";

const HomeUser = () => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies(['authorization']);
    const [user, setUser] = useState({});
    const [tempUser, setTempUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);
    const [progress, setProgress] = useState([]);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showUploadAvatar, setShowUploadAvatar] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [loading, setLoading] = useState(false);

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
            setUser(res.data);
            setTempUser(res.data);
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
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateUser = async () => {
        try {
            const res = await axios({
                method: "PUT",
                url: "http://localhost:8080/api/user/update-profile",
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`,
                },
                data: tempUser
            });

            console.log(res.data);

            setUser(tempUser);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangePassword = async () => {
        try {
            const res = await axios({
                method: "PUT",
                url: "http://localhost:8080/api/user/change-password",
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`,
                },
                data: password
            });

            setPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            console.log(err);
        }
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a FileReader to preview the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result); // Set preview URL to display the image locally
        };
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadedUrl(response.data.url);

            const changeAvatarRes = await axios({
                method: "PUT",
                url: "http://localhost:8080/api/user/update-profile",
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`,
                },
                data: {
                    fullname: user.fullname,
                    email: user.email,
                    dob: user.dob,
                    gender: user.gender,
                    avatar: response.data.url,
                }
            });

            setLoading(false);
            setShowUploadAvatar(false);
            setPreviewUrl("");
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCourse();
        handleUser();
    }, []);

    useEffect(() => {
        handleCourse();
        handleUser();
    }, [showUploadAvatar]);
    
    useEffect(() => {
        if (user.id) {
            handleTopic(user.id);
        }
    }, [user]);

    console.log(progress.length);

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
                                                course_id: course.id
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
                                                parent_course_id: topic.course_id
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
                                                parent_course_id: topic.course_id
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
                            <Button 
                                onClick={() => setShowProfilePopup(true)}
                                className="w-[200px] bg-[#FEE440] text-[#4B5563] rounded-2xl hover:bg-[#FEE440]" style={{boxShadow: "0px 4px 4px 0px #00000040"}}
                            >Thông tin cá nhân</Button>
                        </div>
                        <Button onClick={handleLogin} variant="outline" className="flex items-center space-x-3">
                            <LogOut size={25} />
                            <p>Đăng xuất</p>
                        </Button>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-col items-center space-y-2">
                    <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-extrabold text-[#202020]">Xin chào {user.fullname}</p>
                    <p className="font-extrabold text-center text-[#7E7E7E] text-wrap">Tiếp tục học và đạt đến mục tiêu của bạn</p>
                </div>
            </div>

            {showProfilePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-2/3 h-2/3 p-6 text-center flex justify-center border border-[#0000001A] rounded-lg" style={{ boxShadow: "0px 4px 4px 0px #00000040" }}>
                        <div className="w-1/3 h-full border-r border-[#0000001A]">
                            <div className="w-full h-auto p-5 flex space-x-5 border-b">
                                <Avatar onClick={() => setShowUploadAvatar(true)} className="w-[100px] h-[100px]">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="w-full h-[100px] flex flex-col items-start justify-center">
                                    <p className="font-bold text-xl text-[#1F2937]">{user.fullname}</p>
                                    <p className="text-[#6B7280]">@{user.username}</p>
                                </div>
                            </div>
                            <div className="w-full h-full py-5 space-y-5 flex flex-col items-start">
                                <button 
                                    onClick={() => setActiveTab("profile")} 
                                    className={`w-full h-fit px-5 py-3 flex items-center ${activeTab === "profile" ? "bg-[#00000014]" : ""}`}
                                >
                                    <User size={40} />
                                    <p className="text-xl ml-3">Thông tin cá nhân</p>
                                </button>
                                <button 
                                    onClick={() => setActiveTab("changePassword")} 
                                    className={`w-full h-fit px-5 py-3 flex items-center ${activeTab === "changePassword" ? "bg-gray-300" : ""}  ${user.type === "email" && 'hidden'}`}
                                >
                                    <Settings size={40} />
                                    <p className="text-xl ml-3">Đổi mật khẩu</p>
                                </button>
                            </div>
                        </div>
                        <div className="w-2/3 h-full">
                            <X onClick={() => setShowProfilePopup(false)} size={40} className="justify-self-end"></X>
                            {
                                activeTab === "profile"
                                    ? (
                                        <div className="w-full h-full py-5 flex flex-col items-center">
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 p-3 flex justify-between text-lg">
                                                <p className="w-fit">Họ và tên</p>
                                                <input onChange={(e) => setTempUser((prevUser) => ({ ...prevUser, fullname: e.target.value }))} value={tempUser.fullname} className="w-1/2 text-right"></input>
                                            </div>
                                            <div className={`w-4/5 h-1 bg-[#F3F4F6] ${user.type === "email" && 'hidden'}`}></div>
                                            <div className={`w-4/5 p-3 flex justify-between text-lg ${user.type === "email" && 'hidden'}`}>
                                                <p>Email</p>
                                                <input type="email" onChange={(e) => setTempUser((prevUser) => ({ ...prevUser, email: e.target.value }))} value={tempUser.email} className="w-1/2 text-right"></input>
                                            </div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 p-3 flex justify-between text-lg">
                                                <p>Ngày sinh</p>
                                                <input type="date" onChange={(e) => setTempUser((prevUser) => ({ ...prevUser, dob: e.target.value }))} value={tempUser.dob} className="w-1/2 text-right"></input>
                                            </div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 p-3 flex justify-between text-lg">
                                                <p>Giới tính</p>
                                                <select 
                                                    name="gender" 
                                                    id="gender" 
                                                    onChange={(e) => setTempUser((prevUser) => ({ ...prevUser, gender: e.target.value }))}
                                                    value={tempUser.gender}
                                                    className="w-1/2 text-right"
                                                >
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </select>
                                            </div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <button onClick={() => handleUpdateUser()} className="mt-10 px-10 py-5 bg-[#FBFF24] rounded-[20px]">THAY ĐỔI</button>
                                        </div>
                                    )
                                    : (
                                        <div className="w-full h-full py-5 flex flex-col items-center">
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 p-3 flex justify-between text-lg">
                                                <p className="w-fit">Mật khẩu hiện tại</p>
                                                <input 
                                                    type="password" 
                                                    onChange={(e) => setPassword((prevUser) => ({ ...prevUser, currentPassword: e.target.value }))} 
                                                    value={password.currentPassword} 
                                                    className="w-1/2 text-right"
                                                />
                                            </div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 p-3 flex justify-between text-lg">
                                                <p className="w-fit">Mật khẩu mới</p>
                                                <input 
                                                    type="password" 
                                                    onChange={(e) => setPassword((prevUser) => ({ ...prevUser, newPassword: e.target.value }))} 
                                                    value={password.newPassword} 
                                                    className="w-1/2 text-right"
                                                />
                                            </div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 p-3 flex justify-between text-lg">
                                                <p className="w-fit">Nhập lại mật khẩu</p>
                                                <input 
                                                    type="password" 
                                                    onChange={(e) => setPassword((prevUser) => ({ ...prevUser, confirmPassword: e.target.value }))} 
                                                    value={password.confirmPassword} 
                                                    className="w-1/2 text-right"
                                                />
                                            </div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <div className="w-4/5 h-1 bg-[#F3F4F6]"></div>
                                            <button onClick={() => handleChangePassword()} className="mt-10 px-10 py-5 bg-[#FBFF24] rounded-[20px]">CẬP NHẬT</button>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            )}

            {
                showUploadAvatar && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-2/3 h-2/3 p-6 text-center flex flex-col justify-center border border-[#0000001A] rounded-lg" style={{ boxShadow: "0px 4px 4px 0px #00000040" }}>
                            <h2 className="text-2xl font-bold text-center mb-6">Upload Image</h2>
                            <div className="w-full space-y-5 flex flex-col items-center justify-center">
                                <div className="flex justify-center w-full mb-4">
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange} 
                                        className="w-fit"
                                    />
                                </div>

                                {previewUrl && (
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">Image Preview:</p>
                                        <img 
                                            src={previewUrl} 
                                            alt="Preview" 
                                            className="w-[100px] h-auto rounded-md mb-2"
                                        />
                                    </div>
                                )}
                                
                                <button 
                                    onClick={handleUpload} 
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default HomeUser;