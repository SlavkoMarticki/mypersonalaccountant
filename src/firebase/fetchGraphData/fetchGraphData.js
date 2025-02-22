import {doc,getDoc} from "firebase/firestore";
import { db } from "../firebase";

const documentId = localStorage.getItem('id');

const fetchGraphData = async () => {
    try {
        const documentRef = doc(db, 'users', documentId);
        const docSnap = await getDoc(documentRef);
    
        if(docSnap.exists()){
            
            return docSnap.data().graphData || [];
        }
        return [];
    } catch (error) {
        alert("Fetch reminders error")
    }
}

export default fetchGraphData;