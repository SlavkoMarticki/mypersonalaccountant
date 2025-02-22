import React from "react";
import "./login.css";
import logo from "../../assets/logo/logo.png";
import { BoldedWord } from "../../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase";
import { login } from "../../firebase";

const Login = () => {

    const navigate = useNavigate();

    const handleFormInput = async (data) => {
        const {email, password} = data;

        if(email || password){
            const result = await login(auth, email, password);
            if(result){
                navigate('/home');
            }
        }
    }
  
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <form onSubmit={handleSubmit(handleFormInput)} >
            <div className="loginPage">
                <div className="appNameArea">
                    <div className="nameSloganLogoHolder">
                        <h1 className="appName">MyPersonalAccountant</h1>
                        <p className="appSlogan">App that simplifies your {<BoldedWord word={'wallet'} />}and your {<BoldedWord word={'life'} />}</p>
                        <img className="appLogo" src={logo} alt="Loading..." />
                    </div>
                </div>
                <div className="inputArea">
                    <div className="inputArea-title">
                        <h1>Welcome back!</h1>
                    </div>
                    <div className="email-password-input">
                        <div className="email-holder">
                            <label htmlFor="email" className="email-label">E-mail</label>
                            <input type="email" name="email"className="email"
                                {...register('email',{required:true})}      
                            />
                        </div>
                        <div className="password-holder">
                            <label htmlFor="password" className="password-label">Password</label>
                            <input type="password" name="password" className="password" 
                                {...register('password',{required:true})}
                            />
                        </div>
                    </div>
                    <div className="create-account">
                        <a href="/signup">Create Account</a>
                    </div>
                    <div className="login-button">
                        <button type="submit" className="button">Login</button>
                    </div>
                </div>
            </div>
        </form>  
    );
}
export default Login;