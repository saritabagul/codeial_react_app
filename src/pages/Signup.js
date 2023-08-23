import styles from '../styles/login.module.css';
import {useToasts} from 'react-toast-notifications';
import { useState } from 'react';
import { signup } from '../api'; 
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirm_password,setConfirmPassword] = useState('');
    const [isSignup,setSignup] = useState(false);
    const {addToast} = useToasts();
    const auth = useAuth();
    // console.log(auth);
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
       
        e.preventDefault();
        setSignup(true);
        let error = false;
        if(!email || !password || !name || !confirm_password){
            addToast('Please fill all the field',
            {appearance:'error',
            autoDismiss:true}); 
            error=true;
        }

        if(password !== confirm_password){
            addToast('Make sure password and confirm password matches!',
            {appearance:'error',
            autoDismiss:true}); 
            error=true;
        }

        if(error){
            return setSignup(false);
        }

        const response = await auth.signup(name,email,password,confirm_password);
        if(response.success){
            navigate("/login");
            setSignup(false);
            return addToast('Successfully Signed Up!',
            {
                appearance:'success',
                autoDismiss:true
            });
           
        }else{
          addToast(response.message,
          {appearance:'error',
            autoDismiss:true});
        }
        setSignup(false);
    };


  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>

      <div className={styles.field}>
        <input type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
      </div>
      <div className={styles.field}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </div>
      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      </div>
      <div className={styles.field}>
        <input type="password" placeholder="Confirm Password" value={confirm_password} onChange={(e)=> setConfirmPassword(e.target.value)} />
      </div>
      <div className={styles.field} >
        <button disabled={isSignup}>{isSignup ? "Signing up..." :"Sign Up"}</button>
      </div>
    </form>
  );
};

export default Signup;
