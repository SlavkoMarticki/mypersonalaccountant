import React, { useEffect, useState } from "react";
import "./remindersList.css";
import deleteButton from "../../assets/logo/deleteButton.png"
import {deleteReminder,fetchReminders} from "../../firebase/reminders";

const RemindersList = (comand) => {

    const {openReminderList, closeReminderList} = comand;
    const [remindersList, setRemindersList] = useState([]);

    const convertMiliseconds = (item) => {
        const [day, month, year] = item.date.split('.')
        const [minutes, hours] = item.time.split(':')
        const dateObject = new Date(year, month - 1, day, hours, minutes);
        
        return dateObject.getTime();
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const reminders = await fetchReminders();
                
                setRemindersList (reminders);  
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };
    
        getData();
    
      }, []); 

    const deleteReminderHandler = async (id) =>{
        try {
            await deleteReminder(id);
            const updatedReminders = await fetchReminders();
            setRemindersList(updatedReminders);
        } catch (error) {
            console.error("Error deleting reminder:", error);
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
                                   return (  (convertMiliseconds(reminder) > Date.now()) ? <tr>
                                        <th className="reminder-number" >{num+1}.</th>
                                        <th className="reminder-name">{reminder.name}</th>
                                        <th className="date-reminder">{reminder.date}</th>
                                        <th className="reminder-time">{reminder.time}</th>
                                        <th >
                                            <button
                                                onClick={() => {deleteReminderHandler(reminder.reminderId)}}
                                                className="reminder-delete-button"
                                            > 
                                            <img   
                                                src={deleteButton} 
                                                alt="Loading..."
                                                className="reminder-delete-button-image" 
                                                />   
                                            </button>
                                        </th>
                                    </tr>:<tr className="finished-reminder">
                                        <th className="reminder-number" >{num+1}.</th>
                                        <th className="reminder-name">{reminder.name}</th>
                                        <th className="date-reminder">{reminder.date}</th>
                                        <th className="reminder-time">{reminder.time}</th>
                                        <th >
                                            <button
                                                onClick={() => {deleteReminderHandler(reminder.reminderId)}}
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