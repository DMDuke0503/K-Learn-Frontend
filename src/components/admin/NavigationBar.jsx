import { FaHome, FaListUl, FaUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
    let location = useLocation();

    return (
        <div className="w-auto h-[100%] flex flex-col items-center px-5 pt-3" style={{backgroundColor: "#FFF672", border: "1px solid #959699C2"}}>
            <div className="w-full h-auto flex justify-self-start p-3">
                <FaListUl size={25}/>
            </div>
            <Link to="/admin" className="w-full h-auto flex flex-row items-center p-3 rounded-lg" style={location.pathname == "/admin"? {backgroundColor: "#FFFFFF"}: {}}>
                <FaHome size={25} />
                <p className="px-2 font-montserrat font-extrabold text-md">Dashboard</p>
            </Link>
            <Link to="/admin/transaction" className="w-full h-auto flex flex-row items-center p-3 rounded-lg" style={location.pathname == "/admin/transaction"? {backgroundColor: "#FFFFFF"}: {}}>
                <GrTransaction size={25} />
                <p className="px-2 font-montserrat font-extrabold text-md">Giao dịch</p>
            </Link>
            <Link to="/admin/user" className="w-full h-auto flex flex-row items-center p-3 rounded-lg" style={location.pathname == "/admin/user"? {backgroundColor: "#FFFFFF"}: {}}>
                <FaUser size={25} />
                <p className="px-2 font-montserrat font-extrabold text-md">User</p>
            </Link>
        </div>
    )
}

export default NavigationBar;