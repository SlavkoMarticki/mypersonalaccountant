import React,{useState, useEffect} from "react";
import "./home.css";
import deleteButton from "../../assets/logo/deleteButton.png";
import whiteArrow from "../../assets/logo/white-arrow.svg";
import book from "../../assets/logo/book.png";
import gearWheel from "../../assets/logo/gearwheel.png";
import { 
    BoldedWord, 
    MonthsList,
    CurrencyList
} from "../../components";
import { useNavigate } from "react-router-dom"
import { logOut } from "../../firebase/auth";
import { 
    CreateTransaction, 
    CreateReminder,
    RemindersList
} from "../../portals";
import dateFormat from "../../utils/dateFormat";
import {fetchTransactions, deleteTransaction} from "../../firebase/transactions";




const Home = () => {

    const [isOpenTransaction, setIsOpenTransaction] = useState(false);
    const [isOpenReminder, setIsOpenReminder] = useState(false);
    const [isOpenReminderList, setIsOpenReminderList] = useState(false);
    const [render, setRender] = useState(false);
    const [isOpenCurrencyDropdown, setIsOpenCurrencyDropdown] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencyLogo, setCurrencyLogo] = useState('RSD')
    const [isOpenMonthList, setIsOpenMonthList] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('Select Month');

    const [userData, setUserData] = useState({
        status: null,
        balance:0,
        transactions:[]
    });
   

    const navigate = useNavigate();


    const logOutHandler = async() =>{
        const result = await logOut();
       
        if(result){
            navigate('/')
        }
         
    }

    useEffect(()=>{
        

        const getData = async () => {
           try {
            const result = await fetchTransactions();
            //filteredTransactions(result);
            setUserData(result)
             
           } catch (error) {
             console.error("Error fetching transactions:", error);
             alert("Error while fetching data");
           }
         
        }

        getData();
       // filteredTransactions();
        
    },[render, selectedMonth]);

    const filteredTransactions = () => {

        const monthMap = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4,
            'May': 5, 'June': 6, 'July': 7, 'August': 8,
            'September': 9, 'October': 10, 'November': 11, 'December': 12
        };

        const targetMonth = monthMap[selectedMonth]
      
        
         if(selectedMonth !== 'Select Month'){
            const result = userData.transactions.filter(transaction => {
                const dateParts = transaction.date.split('.');
                const month = parseInt(dateParts[1], 10);
                return month === targetMonth;
            });
            return result || [];

         }

        return userData.transactions || [];     
    }
  

    const deleteTransactionHandler = async (id) => {
   
        await deleteTransaction(id);
        setRender(!render);
    }

    return(
        <> 
        
        <div className="home-page">
            
            <div className="side-menu"> 
                <div className="side-menu-title">
                    <h1>My Personal Accountant</h1>
                </div>
                <div className="side-menu-option-buttons">
                    <button className="option-button" onClick={()=>setIsOpenTransaction(true)}>
                        <img 
                            src={whiteArrow} 
                            alt='Loading...'
                            className="button-image"
                            
                        />
                        Add Transaction
                    </button>
                 
                    <button className="option-button" onClick={()=>setIsOpenReminder(true)}>
                        <img 
                            src={whiteArrow} 
                            alt='Loading...'
                            className="button-image"
                        />
                        Add a Reminder
                    </button>
                    <button className="option-button" onClick={()=>setIsOpenReminderList(true)}>
                        <img 
                            src={book} 
                            alt='Loading...'
                            className="button-image"
                        />
                        My Reminders
                    </button>
                    <button className="option-button" onClick={()=>setIsOpenReminderList(true)}>
                        <img 
                            src={gearWheel} 
                            alt='Loading...'
                            className="button-image"
                        />
                        Edit Profil
                    </button>
                </div>

            </div>
            <div className="main-view">
                <div className="sign-out-bar">
                    <button className="sign-out-button" onClick={logOutHandler} > Sign Out</button>
                </div>
                <div className="date-balance-bar">
                    <div className="date-side">
                        <p>Date: {dateFormat(new Date())} 
                            <button 
                                className="select-month-button"
                                onClick={()=>setIsOpenMonthList(!isOpenMonthList)}
                            >
                                {selectedMonth}
                            {
                                isOpenMonthList ? 
                                <MonthsList 
                                    pickMonth={setSelectedMonth}
                                    filter={filteredTransactions()}
                                />  
                                : <></>
                            }
                            </button> 
                        </p>
                    </div>
                    <div className="balance-side">
                        <p>Balance: {<BoldedWord word={(userData.balance * exchangeRate).toFixed(2)}/> }
                        <button 
                            className="select-currency-button"
                            onClick={()=>setIsOpenCurrencyDropdown(!isOpenCurrencyDropdown)}>{currencyLogo}
                        </button></p>
                        
                        {isOpenCurrencyDropdown ? 
                            <CurrencyList 
                                pickExchangeRate={setExchangeRate}
                                pickCurrencyLogo={setCurrencyLogo}
                                closeList={setIsOpenCurrencyDropdown}
                            />
                             : <></>
                        }
                    </div>
                </div>
                <div className="data-view">
                    <table>
                        <thead>
                            <tr>
                                <th>Num</th>
                                <th>Date</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredTransactions()?.map((user,num) => {
                                    return ( 
                                    <tr>
                                        <th>{num+1}.</th>
                                        <th> {user.date} </th>
                                        <th className="reason-tr">{user.reason}</th>
                                        <th> {  <BoldedWord word={user.status}/> } </th>
                                        <th>{(user.amount * exchangeRate).toFixed(2)} {currencyLogo}</th>
                                        <button 
                                            className="deleteButton" 
                                            onClick={() => {deleteTransactionHandler(user.transactionId)}}
                                        >                                            
                                            <img src={deleteButton} alt="Delete" />
                                        </button>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
       {isOpenReminderList ? <RemindersList openReminderList = {isOpenReminderList} closeReminderList = {()=>setIsOpenReminderList(false)} /> :<></>}
       <CreateTransaction 
            openTransaction={isOpenTransaction} 
            closeTransaction={() => {
                setRender(!render);
                setIsOpenTransaction(false);
                
            }}
        
            
        />
       <CreateReminder openReminder={isOpenReminder} closeReminder={()=>setIsOpenReminder(false)}/>
       
        </>
       
    );
}
export default Home;

