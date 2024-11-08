import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Header = () => {
    const [cookies] = useCookies(['authorization']);

    return (
        <div className="h-[70px] flex justify-between items-center px-20" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
            <Link to={"/"} className="flex items-end">
                <img src="/logo.png" alt="" style={{width: 70, height: "auto"}}/>
                <p className="font-montserrat text-4xl font-bold py-[5px]" style={{color: "#FCD24F"}}>K-LEARN</p>
            </Link>
            {!cookies.authorization ? 
            <Link 
            to="/login"
            className="w-[150px] h-[40px] flex justify-center items-center bg-[#FDF24E] rounded-[20px] font-semibold"
            >
                <p>ĐĂNG NHẬP</p>
            </Link> :
            <></>}
        </div>
    )
}

export default Header;