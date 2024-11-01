import { useCookies } from 'react-cookie';

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';
import UserVocab from '@/components/user/courses/course/vocab/UserVocab';
import GuestNavigationBar from '@/components/user/GuestNavigationBar';
import GuestVocab from '@/components/user/courses/course/vocab/GuestVocab';

const Vocab = () => {
    const [cookies] = useCookies(['authorization']);

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                {
                    cookies.authorization? 
                    <>
                        <NavigationBar></NavigationBar> 
                        <UserVocab></UserVocab>
                    </>: 
                    <>
                        <GuestNavigationBar></GuestNavigationBar>
                        <GuestVocab></GuestVocab>
                    </>
                }
            </div>
        </div>
    )
}

export default Vocab;