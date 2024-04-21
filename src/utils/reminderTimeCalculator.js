
const reminderTimeCalculator = (dateValues) => {

    const { selectedDate, selectedTime } = dateValues;

    
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const timeDifference = selectedDateTime - currentDate;

    const secondsDifference = Math.floor(Math.abs(timeDifference) / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const yearsDifference = Math.floor(daysDifference / 365);

    const remainingSeconds = secondsDifference % 60;
    const remainingMinutes = minutesDifference % 60;
    const remainingHours = hoursDifference % 24;
    const remainingDays = daysDifference % 365;

    return `Time difference: ${yearsDifference} years, ${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;


}
export default reminderTimeCalculator;