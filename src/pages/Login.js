import styles from '../styles/login.module.css';
import {useToasts} from 'react-toast-notifications';
import { useState } from 'react';
import { login } from '../api'; 
import { useAuth } from '../hooks';
import { useNavigate,Navigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loggingIn,setloggingIn] = useState(false);
    const {addToast} = useToasts();
    const auth = useAuth();
    console.log(auth);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setloggingIn(true);
        if(!email || !password){
            return addToast('Please enter both email and password',
            {appearance:'error'}); 
        }

        const response = await auth.login(email,password);
        if(response.success){
          addToast('Successfully Logged In!',
            {appearance:'success'});
        }else{
          addToast(response.message,
          {appearance:'error'});
        }
        setloggingIn(false);
    };

    if(auth.user){
      return <Navigate to="/" />
    
    } 
    
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      </div>

      <div className={styles.field} >
        <button disabled={loggingIn}>{loggingIn ? "Logging in..." :"Log In"}</button>
      </div>
    </form>
  );
};

export default Login;
