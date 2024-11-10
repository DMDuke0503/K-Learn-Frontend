import { useCookies } from "react-cookie";

import Header from "@/components/Header";
import HomeUser from "@/components/user/home/User";
import HomeGuest from "@/components/user/home/Guest";

const Home = () => {
    const [cookies] = useCookies(['authorization']);

    return (
        <div className="h-screen w-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-screen flex flex-row" style={{height: "calc(100vh - 70px)"}}>
                {cookies.authorization? <HomeUser></HomeUser> : <HomeGuest></HomeGuest>}
            </div>
        </div>
    )
}

export default Home;