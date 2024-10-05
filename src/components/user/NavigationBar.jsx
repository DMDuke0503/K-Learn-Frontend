import { FaHome, FaBook, FaListUl } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdGolfCourse } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div className="w-fit h-full items-center px-2 pt-3 font-montserrat font-semibold text-nowrap" style={{backgroundColor: "#FFF672", border: "1px solid #959699C2"}}>
            <div className="w-full h-auto flex justify-self-start p-3">
                <FaListUl size={25}/>
            </div>
            <NavLink 
            to="/" 
            className="w-full h-auto flex flex-row items-center p-3 rounded-lg"
            style={({ isActive }) => {
                return {
                  backgroundColor: isActive? "#FFFFFF": "",
                };
            }}>
                <FaHome size={25} />
                <p className="px-2">Trang chủ</p>
            </NavLink>
            <NavLink
            to="/courses" 
            className="w-full h-auto flex flex-row items-center p-3 rounded-lg"
            style={({ isActive }) => {
                return {
                  backgroundColor: isActive? "#FFFFFF": "",
                };
            }}>
                <FaBook size={25} />
                <p className="px-2">Khóa học</p>
            </NavLink>
            <div className="w-full h-auto flex flex-row items-center p-3 rounded-lg">
                <GoFileDirectoryFill size={25} />
                <p className="px-2">Từ vựng của tôi</p>
            </div>
            <div className="w-full h-auto flex flex-row items-center p-3 rounded-lg">
                <MdGolfCourse size={25} />
                <p className="px-2">Khóa học của tôi</p>
            </div>
            <div className="w-full h-auto flex flex-row items-center p-3 rounded-lg">
                <GrTransaction size={25} />
                <p className="px-2">Giao dịch của tôi</p>
            </div>
        </div>
    )
}

export default NavigationBar;