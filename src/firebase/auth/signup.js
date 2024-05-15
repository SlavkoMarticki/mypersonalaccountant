import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import signUpFormCheck from "../../utils/signUpFormCheck";

const signUp = async (firstName, lastName, email, password, repeatPassword) => {
    const newUserData = {
        name:firstName,
        lastName: lastName,
        balance: 0,
        transactions: [],
        reminders: [],
        graphData: []
    }

    if(signUpFormCheck(firstName, lastName, email, password, repeatPassword)){
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            const uid = newUser.user.uid
            
            await setDoc(doc(db, 'users', uid), newUserData);
            return true;
           
        } catch (error) {
            alert("Failed to create user");
            return false;
        }
    }

}

export default signUp;