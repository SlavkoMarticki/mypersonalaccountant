import React from "react";
import "./signUp.css";
import logo from "../../assets/logo/logo.png";
import { BoldedWord } from "../../components";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import signUpFormCheck from "../../utils/signUpFormCheck";


const SignUp = () => {

    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    
    const createUser = async (firstName, lastName, email, password) => {
        
        const newUserData = {
            name:firstName,
            lastName: lastName,
            balance: 0,
            transactions: [],
            reminders: []
        }
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            const uid = newUser.user.uid
            const collectionRef = collection(db,'users');
            
            await setDoc(doc(db, 'users', uid), newUserData);
          
            navigate('/');
        } catch (error) {
            alert("Failed to create user");
            console.log(error);
        }
    }

    const handleSignUpForm = (data) => {
        
        const {firstName, lastName, email, password, repeatPassword } = data;
        
        if(signUpFormCheck(firstName, lastName, email, password, repeatPassword )){
            createUser(firstName, lastName, email,password);
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