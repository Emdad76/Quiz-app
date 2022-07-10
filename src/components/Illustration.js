import classes from '../styles/Illustration.module.css';
import signup from '../assets/images/signup.svg';

export default function Illustration(){

    return(
        <div className={classes.illustration}>
             <img src={signup}  alt=""/>  
    
          </div>
    );
}