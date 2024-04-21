import React, { useState } from "react";
import "./createTransaction.css";
import logo from "../../assets/logo/logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import dateFormat from "../../utils/dateFormat";
import { v4 as uuidv4 } from 'uuid';


const CreateTransaction = (comand) => {
    const {openTransaction, closeTransaction } = comand
    const [selectedDate, setSelectedDate] = useState(new Date());

 
   
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    const addTransaction = async (data) => {
        const {transactionReason, status, amount} = data;

      
        const newTransactionData = {
            date: dateFormat(selectedDate),
            status: status,
            amount: Number(amount),
            reason: transactionReason,
            transactionId: uuidv4()
        }

        const documentId = localStorage.getItem('id');


        try {
            
            const documentRef = doc(db, 'users', documentId);
            const docSnapshot = await getDoc(documentRef);

            if (docSnapshot.exists()) {
              const existingTransactions = docSnapshot.data().transactions || [];
              const existingBalanc = docSnapshot.data().balance;
              let newBalanc = 0;
        
              
              const updatedTransactions = [...existingTransactions, newTransactionData];
              if(status === "Income"){
                newBalanc = Number(existingBalanc) + Number(amount);
              }else{
                newBalanc = Number(existingBalanc) - Number(amount);
              }

              await updateDoc(documentRef, {
                transactions: updatedTransactions,
                balance: Number(newBalanc)
              });
        
              
              closeTransaction();
            } else {
              alert("Document does not exist!");
            }
          } catch (error) {
            alert("Error adding transaction: ", error);
          }

        
    }

    if(!openTransaction) return null;

    return(
        <form onSubmit={handleSubmit(addTransaction)}>
            <div className="create-transaction-background">
                <div className="transaction-wrapper">
                    <div className="logo-side">
                        <div className="logo-side-decoratin">
                            <img 
                                src={logo} 
                                alt="" 
                                className="logo"
                            />
                        </div>
                    </div>

                    <div className="transaction-data-side">
                        <div className="transaction-title">
                            <h1>Add Transaction</h1>
                        </div>
                        <div className="transaction-input-holder">
                            <div className="transaction-date">
                                <label 
                                    htmlFor="date-picker"
                                    className="label-date-picker"
                                >Pick a date</label>
                                <DatePicker 
                                    className="date-picker"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat={"dd-MM-yyyy"}
                                    name="date"
                                />
                            </div>
                            <div className="transaction-reason">
                                <label 
                                    htmlFor="transaction-reason"
                                    className="label-transaction-reason"
                                >Transaction reason</label>
                                <textarea 
                                    name="transaction-reason" 
                                    id="" cols="30" 
                                    rows="10"
                                    className="transaction-reason-textare"
                                    maxLength={40}
                                    {...register('transactionReason',{required:true})}

                                ></textarea>
                            </div>
                            <div className="transaction-status">
                                <label 
                                    htmlFor=""
                                    className="label-transaction-status"
                                >Select status</label>
                                <div className="radio-button-holder" >
                                    <div className="income-input-holder">
                                        <label htmlFor="income-status">Income</label>
                                        <input 
                                            type="radio" 
                                            value="Income"
                                            name="status"
                                            id="income-status"
                                            className="input-radio-button"
                                            {...register('status',{required:true})}
                                        /> 
                                    </div>
                                    <div className="expenditure-input-holder">
                                        <label htmlFor="expenditure-label">Expenditure</label>
                                        <input 
                                            type="radio" 
                                            value="Expenditure"
                                            name="status"
                                            id="expenditure-status"
                                            {...register('status',{required:true})}
                                        /> 
                                    </div>

                                </div>

                            </div>
                            <div className="transaction-amount">
                                <label 
                                    htmlFor="transaction-amount"
                                    className="label-transaction-amount"
                                >Amount</label>
                                <input 
                                    type="number" 
                                    name="transaction-amount" 
                                    id="" 
                                    className="amount-input"
                                    {...register('amount',{required:true})}
                                />
                            </div>
                        </div>
                        <div className="button-holder">
                            <button 
                                type="submit"
                                className="save-button"
                                
                            >Save</button>
                            <button 
                                type="button"
                                className="exit-button"
                                onClick={closeTransaction}
                            >Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        
    );
}

export default CreateTransaction;