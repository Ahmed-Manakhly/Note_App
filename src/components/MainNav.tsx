import Button from 'react-bootstrap/Button';
import {Stack , Col , Row} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import classes from './MainNav.module.scss' ;

//------------------------------------------- type
type NoteFormProps = { onClick: () => void ,resetFont : () => void , changeFont : (data:string) => void } ;
//---------------------------------------------
function MainNav({onClick ,resetFont , changeFont}: NoteFormProps) {
    //------------------------------------------
    const font_1style = classes['font-1'] ;
    const font_2style = classes['font-2'] ;
    const font_3style = classes['font-3'] ;
    const fonts = [{name:'font-1',style :font_1style }, {name:'font-2',style :font_2style }, {name:'font-3',style :font_3style }] ;
    
  //---------------------------------------------------------
  return (
    <header className={`${classes.header}  p__15 between__flex default-font bg__1`}>
        <div className={`${classes.brand}  p__relative`}>
            <h1 ><NavLink  to='/'> Awesome Notes </NavLink></h1>
        </div>
        <div className={`${classes.controls} p__0`}>
          <NavDropdown title="Switch Theme" id={`offcanvasNavbarDropdown-expand-${'md'}` } className={`d__flex align__center bg__1 p__0 ${classes.control}`}> 
            {fonts.map(item =>{ return(
              <NavDropdown.Item className={`${item.style} bg__1 t__c `} onClick={changeFont.bind(null,item.name)} key={item.name}>A</NavDropdown.Item>
            )})}
            <NavDropdown.Item  className='default bg__1 p__0 t__c' onClick={resetFont}>Reset</NavDropdown.Item>
          </NavDropdown>
          <Row >
              <Col xs="auto">
                <Stack gap={2} direction="horizontal" className={` ${classes.control2}`}>
                    <NavLink to="/new">
                      <Button className={`butt`} variant="primary">Create</Button>
                    </NavLink>
                    <NavLink to="..">
                      <Button className={`butt_2`} onClick={onClick} variant="outline-secondary">Edit Tags</Button>
                    </NavLink>
                </Stack>
              </Col>
          </Row>
        </div>
    </header>
)
}

export default MainNav;