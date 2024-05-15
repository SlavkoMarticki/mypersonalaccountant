
const onlyMonthDateFormat = (date, comand) => {

    let month = date.getMonth();
    let year = date.getFullYear();
    
    if(comand === "1"){
        month += 1;
        if(month > 11){
            month = 0;
            year += 1;
        }
    }
    if(comand === "0"){
        month -= 1; 
        if(month < 0){
            month = 11;
            year -=1;
        }  
    }
    
    const format = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return months[month] +' '+ year

    }

    switch (month) {
        case 0: return format(new Date("January " + year).toString());
        case 1: return format(new Date("February " + year).toString());
        case 2: return format(new Date("March " + year).toString());
        case 3: return format(new Date("April " + year).toString());
        case 4: return format(new Date("May " + year).toString());
        case 5: return format(new Date("June " + year).toString());
        case 6: return format(new Date("July " + year).toString());
        case 7: return format(new Date("August " + year).toString());
        case 8: return format(new Date("September " + year).toString());
        case 9: return format(new Date("October " + year).toString());
        case 10: return format(new Date("November " + year).toString());
        case 11: return format(new Date("December " + year).toString());
        default: return "Error: Invalid month";
    }
}

export default onlyMonthDateFormat