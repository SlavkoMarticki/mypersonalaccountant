import React, { useEffect, useState } from "react";
import "./remindersList.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import deleteButton from "../../assets/logo/deleteButton.png"


const RemindersList = (comand) => {

    const {openReminderList, closeReminderList} = comand;
    const [remindersList, setRemindersList] = useState([]);
    const documentId = localStorage.getItem('id');

    

    useEffect(() => {
        
        
        const getData = async () => {
            
            const documentRef = doc(db, 'users', documentId);
            const docSnap = await getDoc(documentRef);

            if(docSnap.exists()){
                setRemindersList(docSnap.data().reminders)
            }
        }

        getData();
        
    },[remindersList]);

    const deleteReminder = async (id) => {

        try {
            
            const documentRef = doc(db, 'users', documentId);
            const docSnap = await getDoc(documentRef);

            if(docSnap.exists()){

                const allReminders = docSnap.data();
                const newReminderList = allReminders.reminders.filter(reminder => reminder.reminderId !== id)

                await updateDoc(documentRef, {
                    reminders: newReminderList
                });

            }

        } catch (error) {
            alert("Error");
        }

    }


    if(!openReminderList) return null;
    return (
        <div className="reminders-list-background">
            <div className="reminders-list-wrapper">
                <div className="reminders-list-header">
                    <h1>My reminders list</h1>      
                    <button onClick={closeReminderList} >X</button>
                </div>
                <div className="reminders-list">
                    <table className="reminders-list-table">
                        <thead >
                            <tr>
                                <th  className="num-thead" >Num</th>
                                <th className="text-thead">Text</th>
                                <th className="date-thead">Date</th>
                                <th className="time-thead">Time</th>
                                <th className="delete-thead">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                remindersList?.map((reminder,num) => {
                                   return ( <tr>
                                        <th className="reminder-number" >{num+1}.</th>
                                        <th className="reminder-name">{reminder.name}</th>
                                        <th className="date-reminder">{reminder.date}</th>
                                        <th className="reminder-time">{reminder.time}</th>
                                        <th >
                                            <button
                                                onClick={() => {deleteReminder(reminder.reminderId)}}
                                                className="reminder-delete-button"
                                            > 
                                            <img   
                                                src={deleteButton} 
                                                alt="Loading..."
                                                className="reminder-delete-button-image" 
                                                /> 
                                            
                                            </button>
                                        
                                        </th>
                                    </tr>)
                                })
                            }
                          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RemindersList;