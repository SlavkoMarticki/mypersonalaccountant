import {doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../firebase";

const documentId = localStorage.getItem('id')

const deleteReminder = async (id) =>{

    try {
        const documentRef = doc(db, 'users', documentId);
        const docSnap = await getDoc(documentRef);

        if(docSnap.exists()){
            const allReminders = docSnap.data();
            const newReminderList = allReminders.reminders.filter(reminder => reminder.reminderId !== id);
    
            await updateDoc(documentRef, {
                reminders: newReminderList
            });
        }
    } catch (error) {
        alert("Error")
    }
}

export default deleteReminder;