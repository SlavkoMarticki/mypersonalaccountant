import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const logOut = async () => {

    try {
        await signOut(auth);
        localStorage.removeItem('id');
        return true;
    } catch (error) {
        alert("Log out error")
        return false;
    }
}

export default logOut;