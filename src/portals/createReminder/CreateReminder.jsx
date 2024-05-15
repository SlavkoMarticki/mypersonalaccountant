import React,{useState} from "react";
import "./createReminder.css";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from "../../utils/dateFormat";
import { db } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CreateReminder = (comand) => {

    const {openReminder, closeReminder} = comand;
    const [selectedDate,setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');

    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    const addReminder = async (formData) => {
        
        const {reminderName} = formData
        const formatedDate = dateFormat(selectedDate);

        const documentId = localStorage.getItem('id');

        const newReminder = {
            reminderId: uuidv4(),
            name: reminderName,
            date: formatedDate,
            time: selectedTime
        }
        
        try {
            
            const documentRef = doc(db, 'users', documentId);
            const docSnapshot = await getDoc(documentRef);

            if(docSnapshot.exists()){

                const existingReminders = docSnapshot.data().reminders || [];
                const updatedReminders = [...existingReminders, newReminder];

                await updateDoc(documentRef,{
                    reminders: updatedReminders
                })
                closeReminder();
            }else{
                alert("File not found");
            }

        } catch (error) {
            alert("Error " + error)
        }
        closeReminder();
    }

    if(!openReminder) return null;

    return (
        <form onSubmit={handleSubmit(addReminder)}>
            <div className="create-reminder-background">
                <div className="reminder-wrapper">
                    <div className="reminder-wrapper-title">
                        <h1>Add a Reminder</h1>
                    </div>
                    <div className="reminder-text">
                        <label htmlFor="reminder-text-input">Reminder text</label>
                        <input 
                            type="text" 
                            id="reminder-text-input"
                            {...register('reminderName',{required:true})}
                        />
                    </div>
                    <div className="reminder-date">
                        <label htmlFor="date">Set date</label>
                        <DatePicker 
                            className="date-picker-reminder"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat={"dd-MM-yyyy"}
                            minDate={new Date()}
                            name="date"
                            value={selectedDate} 
                        />
                    </div>
                    <div className="reminder-hours">
                        <label htmlFor="hours">Set hours</label>
                        <TimePicker 
                            value={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                        />
                    </div>
                    <div className="reminder-footer">
                        <div className="reminder-button-holder">
                            <button 
                                className="reminder-save-button"
                                type="submit"
                            >Save</button>
                            <button 
                                className="reminder-exit-button"
                                type="button"
                                onClick={closeReminder}
                            >Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>   
    );
}

export default CreateReminder;