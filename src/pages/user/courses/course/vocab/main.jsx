import { useCookies } from 'react-cookie';

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';
import GuestTopic from '@/components/user/courses/course/vocab/Guest';
import GuestNavigationBar from '@/components/user/GuestNavigationBar';

const Vocab = () => {
    const [cookies] = useCookies(['authorization']);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                {cookies.authorization? <NavigationBar></NavigationBar> : <GuestNavigationBar></GuestNavigationBar>}
                <GuestTopic></GuestTopic>
            </div>
        </div>
    )
}

export default Vocab;