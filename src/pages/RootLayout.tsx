import {Outlet } from 'react-router-dom' ;
import MainNav from '../components/MainNav' ;
import classes from './RootLayout.module.scss' ;
type NoteFormProps = { onClick: () => void ,resetFont : () => void , changeFont : (data:string) => void }

const RootLayout = ({onClick ,resetFont ,changeFont}:NoteFormProps) => {
    //-------------------------------------------------
    return <>
        <div className={`${classes.page}  `}>
        <MainNav onClick= {onClick} resetFont={resetFont} changeFont={changeFont}/>
            <main className={`${classes.content} w__full ovh generated__font`}>
                <Outlet/>
            </main>
        </div>
    </>
} ;
export default RootLayout ;