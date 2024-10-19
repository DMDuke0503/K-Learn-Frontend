import { useCookies } from 'react-cookie';

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';
import Topic from '@/components/user/courses/course/vocab/Topic';
import GuestNavigationBar from '@/components/user/GuestNavigationBar';

const Vocab = () => {
    const [cookies] = useCookies(['authorization']);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                {cookies.authorization? <NavigationBar></NavigationBar> : <GuestNavigationBar></GuestNavigationBar>}
                <Topic></Topic>
            </div>
        </div>
    )
}

export default Vocab;