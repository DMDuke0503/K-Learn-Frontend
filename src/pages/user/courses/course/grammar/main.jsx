import { useCookies } from 'react-cookie';

import Header from '@/components/Header';
import NavigationBar from '@/components/user/NavigationBar';
import GuestNavigationBar from '@/components/user/GuestNavigationBar';
import UserGrammar from '@/components/user/courses/course/grammar/UserGrammar';
import GuestGrammar from '@/components/user/courses/course/grammar/GuestGrammar';

const Grammar = () => {
    const [cookies] = useCookies('authorization');

    return (
        <div className="w-screen h-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="flex" style={{height: "calc(100vh - 70px)"}}>
                {
                    cookies.authorization? 
                    <>
                        <NavigationBar></NavigationBar> 
                        <UserGrammar></UserGrammar>
                    </>: 
                    <>
                        <GuestNavigationBar></GuestNavigationBar>
                        <GuestGrammar></GuestGrammar>
                    </>
                }
            </div>
        </div>
    )
}

export default Grammar;