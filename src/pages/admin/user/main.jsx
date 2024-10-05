import { FaHome, FaListUl, FaUser, FaSearch } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";

import NavigationBar from "@/components/admin/NavigationBar";

const User = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="h-[12%] flex flex-row items-end px-20" style={{borderBottom: "4px solid #00000017"}}>
                <img src="/logo.png" alt="" style={{width: 70, height: "auto"}}/>
                <p className="font-montserrat text-4xl font-bold py-[5px]" style={{color: "#FCD24F"}}>K-LEARN</p>
            </div>
            <div className="h-screen flex flex-row">
                <NavigationBar></NavigationBar>
                <div className="w-[70%] flex flex-col items-center pt-10 overflow-y-scroll">
                    <div className="w-[90%] flex justify-between items-center">
                        <p className="font-montserrat text-3xl font-bold">Users</p>
                        <div className="w-1/4 flex items-center px-5 py-2 rounded-3xl" style={{border: "1px solid #CCCCCC99", boxShadow: "0px 4px 4px 0px #00000040"}}>
                            <FaSearch />
                            <Input placeholder="Tìm kiếm" className="border-0 shadow-none focus-visible:ring-0"></Input>
                        </div>
                    </div>
                </div>
                <div className="w-[15%]" style={{boxShadow: "0px 14px 42px 0px #080F340F"}}>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    )
}

export default User;