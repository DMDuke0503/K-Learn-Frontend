import { FaHome, FaListUl, FaUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button"

import NavigationBar from "@/components/admin/NavigationBar";
import UserBar from "@/components/admin/UserBar";

const Dashboard = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="h-[12%] flex flex-row items-end px-20" style={{borderBottom: "4px solid #00000017"}}>
                <img src="/logo.png" alt="" style={{width: 70, height: "auto"}}/>
                <p className="font-montserrat text-4xl font-bold py-[5px]" style={{color: "#FCD24F"}}>K-LEARN</p>
            </div>
            <div className="h-screen flex flex-row">
                <NavigationBar></NavigationBar>
                <div className="w-[70%] flex flex-col items-center pt-10 overflow-y-scroll">
                    <div className="w-[90%]">
                        <p className="font-montserrat text-3xl font-bold">Dashboard</p>
                    </div>
                </div>
                <UserBar></UserBar>
            </div>
        </div>
    );
}

export default Dashboard;