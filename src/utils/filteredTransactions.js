
const filteredTransactions = (userData, selectedMonth) => {
    const monthMap = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4,
        'May': 5, 'June': 6, 'July': 7, 'August': 8,
        'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    const targetMonth = monthMap[selectedMonth]
   
    if(selectedMonth !== 'All Months'){
        const result = userData?.transactions.filter(transaction => {
            const dateParts = transaction.date.split('.');
            const month = parseInt(dateParts[1], 10);
            return month === targetMonth;
        });
        return result || [];

    }

    return userData?.transactions || [];
}

export default filteredTransactions;