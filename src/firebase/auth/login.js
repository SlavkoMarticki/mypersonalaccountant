import { signInWithEmailAndPassword } from "firebase/auth";

const login = async (auth, email, password) => {

    try {
        const loggedUser = await signInWithEmailAndPassword(auth, email, password);
        const uid = loggedUser.user.uid;
        localStorage.setItem('id',uid);
        return true
        
    } catch (error) {
        alert("User not found");
        return false
    }
}

export default login;