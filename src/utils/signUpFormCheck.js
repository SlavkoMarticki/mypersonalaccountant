
const signUpFormCheck = (firstName, lastName, email, password, repeatPassword ) => {

    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/;

    if(!firstName || !lastName || !email|| !password || !repeatPassword){
        alert("All fields must be filled");
        return false;
    }
    if(password !== repeatPassword){
        alert("Passwords and Repeat Password must be the same");
        return false;
    }
    if (!passwordPattern.test(password)) {
        alert("Password should contains at least one capital letter, numbers, and special characters.");
        return false;
    } 
    if (!email.includes('@')){
        alert("Email error");
        return false;
    }

    return true;

}

export default signUpFormCheck;