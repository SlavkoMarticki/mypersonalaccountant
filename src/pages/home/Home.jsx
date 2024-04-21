import React,{useState, useEffect} from "react";
import "./home.css";
import deleteButton from "../../assets/logo/deleteButton.png";
import whiteArrow from "../../assets/logo/white-arrow.svg";
import { BoldedWord } from "../../components";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom"
import { signOut, onAuthStateChanged} from "firebase/auth";
import { 
    CreateTransaction, 
    CreateReminder,
    RemindersList
} from "../../portals";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import dateFormat from "../../utils/dateFormat";


const Home = () => {

    const [isOpenTransaction, setIsOpenTransaction] = useState(false);
    const [isOpenReminder, setIsOpenReminder] = useState(false);
    const [isOpenReminderList, setIsOpenReminderList] = useState(false);
    const [render, setRender] = useState(false);
    const [isOpenCurrencyDropdown, setIsOpenCurrencyDropdown] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencyLogo, setCurrencyLogo] = useState('RSD')

    const [userData, setUserData] = useState({
        status: null,
        balance:0,
        transactions:[]
    });
   

    const navigate = useNavigate();
    const logOut = async () =>{
        try {
            await signOut(auth);
            localStorage.setItem('id','')
            navigate('/');
        } catch (error) {
            alert("Log out error");
        }
        
    }
    const toggleTransactionClosed = () => {
        setRender(!render);
    }

    useEffect(()=>{
        const getData = async () => {
          
            onAuthStateChanged(auth,async (user) =>{
                if(user){

                    const loggedUser = user.uid;

                    const documentRef = doc(db, "users", loggedUser)
                    const docSnap = await getDoc(documentRef);
                
                    console.log(docSnap);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    
                    } else {
                        alert("Loading data error");
                    }
                }
            })            
        }

        getData();
    },[render]);
    

    const deleteTransaction = async (id) => {

        const documentId = localStorage.getItem('id');

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
    
                
                toggleTransactionClosed();
            } else {
                alert("Document does not exist!");
            }

        } catch (error) {
            alert("Error")
        }
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
                            className="button-arrow"
                            
                        />
                        Add Transaction
                    </button>
                 
                    <button className="option-button" onClick={()=>setIsOpenReminder(true)}>
                        <img 
                            src={whiteArrow} 
                            alt='Loading...'
                            className="button-arrow"
                        />
                        Add a Reminder
                    </button>
                    <button className="option-button" onClick={()=>setIsOpenReminderList(true)}>
                        <img 
                            src={whiteArrow} 
                            alt='Loading...'
                            className="button-arrow"
                        />
                        My Reminders
                    </button>
                </div>

            </div>
            <div className="main-view">
                <div className="sign-out-bar">
                    <button className="sign-out-button" onClick={logOut} > Sign Out</button>
                </div>
                <div className="date-balance-bar">
                    <div className="date-side">
                        <p>Date: {dateFormat(new Date())}</p>
                    </div>
                    <div className="balance-side">
                        <p>Balance: {<BoldedWord word={(userData.balance * exchangeRate).toFixed(2)}/> }
                        <button 
                            className="select-currency-button"
                            onClick={()=>setIsOpenCurrencyDropdown(!isOpenCurrencyDropdown)}>{currencyLogo}
                        </button></p>
                        {isOpenCurrencyDropdown ? 
                            <div className="currency-dropdown-list">
                                <button onClick={
                                    () => {
                                        setExchangeRate(1)
                                        setIsOpenCurrencyDropdown(!isOpenCurrencyDropdown)
                                        setCurrencyLogo('RSD');
                                    }}
                                >RSD</button>
                                <button onClick={
                                    () => {
                                        setExchangeRate(0.0085)
                                        setIsOpenCurrencyDropdown(!isOpenCurrencyDropdown)
                                        setCurrencyLogo('EUR');
                                    }}>EUR</button>
                                <button onClick={
                                    ()=>{
                                        setExchangeRate(0.86)
                                        setIsOpenCurrencyDropdown(!isOpenCurrencyDropdown)
                                        setCurrencyLogo('RUB');
                                    }
                                }>RUB</button>
                                <button onClick={
                                    ()=>{
                                        setExchangeRate(0.0091)
                                        setIsOpenCurrencyDropdown(!isOpenCurrencyDropdown)
                                        setCurrencyLogo('USD');
                                    }}>USD</button>
                            </div> : <></>
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
                                userData.transactions?.map((user,num) => {
                                    return ( 
                                    <tr>
                                        <th>{num+1}.</th>
                                        <th> {user.date} </th>
                                        <th className="reason-tr">{user.reason}</th>
                                        <th> {  <BoldedWord word={user.status}/> } </th>
                                        <th>{(user.amount * exchangeRate).toFixed(2)} {currencyLogo}</th>
                                        <button 
                                            className="deleteButton" 
                                            onClick={() => {deleteTransaction(user.transactionId)}}
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
       <RemindersList openReminderList = {isOpenReminderList} closeReminderList = {()=>setIsOpenReminderList(false)} />
       <CreateTransaction 
            openTransaction={isOpenTransaction} 
            closeTransaction={() => {
                toggleTransactionClosed();
                setIsOpenTransaction(false);
                
            }}
        
            
        />
       <CreateReminder openReminder={isOpenReminder} closeReminder={()=>setIsOpenReminder(false)}/>
       
        </>
       
    );
}
export default Home;

