import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"


const documentId = localStorage.getItem('id');

const deleteTransaction = async (id) => {

    
    try {
        const documentRef = doc(db, 'users', documentId);
        const docSnapshot = await getDoc(documentRef);
        let newBalance = 0;

        if (docSnapshot.exists()) {
    
            const dbData = docSnapshot.data();

            const selectedTransaction = dbData.transactions.filter(transaction => transaction.transactionId === id);
            const removeTransaction = dbData.transactions.filter(transaction => transaction.transactionId !== id);
             
            const oldGraphData = dbData.graphData;
            

            if(selectedTransaction[0].status === 'Income'){
                newBalance = Number(docSnapshot.data().balance) - Number(selectedTransaction[0].amount)
            }else{
                newBalance = Number(docSnapshot.data().balance) + Number(selectedTransaction[0].amount)
            }
            let newGraphData = {
                amount: newBalance,
                date: selectedTransaction[0].date
            }
         
            await updateDoc(documentRef, {
                transactions: removeTransaction,
                balance: newBalance,
                graphData: [...oldGraphData, newGraphData]

            });
     
        } else {
            alert("Document do not exist!");
        }

    } catch (error) {
        alert("Error")
    }
}

export default deleteTransaction