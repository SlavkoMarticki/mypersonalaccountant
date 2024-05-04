import React from "react";
import "./signUp.css";
import logo from "../../assets/logo/logo.png";
import { BoldedWord } from "../../components";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import {signUp} from "../../firebase/auth";


const SignUp = () => {

    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    
    

    const handleSignUpForm = async (data) => {
        
        const {firstName, lastName, email, password, repeatPassword } = data;
        

        const result = await signUp(firstName, lastName, email, password, repeatPassword);
        if(result){
            navigate('/');
        }

        
    }

    return (
        <form onSubmit={handleSubmit(handleSignUpForm)}>
            <div className="signUpPage">
                <div className="signUpAppNameArea">
                    <div className="signUpNameSloganLogoHolder">
                        <h1 className="signUpAppName">MyPersonalAccountant</h1>
                        <p className="signUpAppSlogan">App that simplifies your {<BoldedWord word={'wallet'} />}and your {<BoldedWord word={'life'} />}</p>
                        <img className="signUpAppLogo" src={logo} alt="Loading..." />
                    </div>
                </div>
                <div className="signUpInputArea">
                    <div className="signUpInputArea-title">
                        <h1>Create Account</h1>
                    </div>
                    <div className="signUpEmail-password-input">
                        <div className="email-holder">
                            <label htmlFor="firstName" className="email-label">First Name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                className="email"
                                {...register('firstName',{required:true})}
                            />
                        </div>
                        <div className="password-holder">
                            <label htmlFor="lastName" className="email-label">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                className="signUpEmail"
                                {...register('lastName',{required:true})}
                            />
                        </div>
                        <div className="password-holder">
                            <label htmlFor="email" className="email-label">E-mail</label>
                            <input 
                                type="email" 
                                name="email"
                                className="signUpEmail"
                                {...register('email',{required:true})}
                            />
                        </div>
                        <div className="password-holder">
                            <label htmlFor="password" className="email-label">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                className="signUpEmail"
                                {...register('password',{required:true})}
                            />
                        </div>
                        <div className="password-holder">
                            <label htmlFor="repeatPassword" className="email-label">Repeat Password</label>
                            <input 
                                type="password" 
                                name="repeatPassword"
                                className="signUpEmail"
                                {...register('repeatPassword',{required:true})}
                            />
                        </div>
                    </div>
                    <div className="logiIn-link">
                        <a href="/">I already have account</a>
                    </div>
                    <div className="sign-up-button">
                        <button type="submit" className="button">Create Account</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignUp;