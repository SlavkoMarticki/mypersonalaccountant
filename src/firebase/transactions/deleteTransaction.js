import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"


const documentId = localStorage.getItem('id');

const deleteTransaction = async (id) => {

    try {
        const documentRef = doc(db, 'users', documentId);
        const docSnapshot = await getDoc(documentRef);
        let newBalance = 0;

        if (docSnapshot.exists()) {
    
            const selectAllTransactions = docSnapshot.data();
            const selectedTransaction = selectAllTransactions.transactions.filter(transaction => transaction.transactionId === id);
            const removeTransaction = selectAllTransactions.transactions.filter(transaction => transaction.transactionId !== id);
             

            if(selectedTransaction[0].status === 'Income'){
                newBalance = Number(docSnapshot.data().balance) - Number(selectedTransaction[0].amount)
            }else{
                newBalance = Number(docSnapshot.data().balance) + Number(selectedTransaction[0].amount)
            }

            await updateDoc(documentRef, {
                transactions: removeTransaction,
                balance: newBalance
            });

            
           
        } else {
            alert("Document does not exist!");
        }

    } catch (error) {
        alert("Error")
    }
    

}

export default deleteTransaction