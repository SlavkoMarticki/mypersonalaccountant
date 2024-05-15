import { doc, getDoc} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged} from "firebase/auth";

const fetchTransactions = async () => {

    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const loggedUser = user.uid;
          const documentRef = doc(db, 'users', loggedUser);
          const docSnap = await getDoc(documentRef);
  
          if (docSnap.exists()) {
            resolve(docSnap.data());
          } else {
            reject(new Error("Document does not exist"));
          }
        } else {
          reject(new Error("User is not authenticated"));
        }
      });
    });
  };

export default fetchTransactions;