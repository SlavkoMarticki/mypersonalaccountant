import {doc,getDoc} from "firebase/firestore";
import { db } from "../firebase";

const documentId = localStorage.getItem('id');

const fetchReminders = async () => {

    try {
        const documentRef = doc(db, 'users', documentId);
        const docSnap = await getDoc(documentRef);
    
        if(docSnap.exists()){
            
            return docSnap.data().reminders || [];
        }
        return [];
    } catch (error) {
        alert("Fetch reminders error")
    }

   
}

export default fetchReminders;