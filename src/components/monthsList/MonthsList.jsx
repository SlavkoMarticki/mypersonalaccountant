import React from "react";
import "./monthsList.css";

const MonthsList = ({pickMonth}) => {

    return (
        <div className="months-dropdown-list">
            <button onClick={ ()=>{pickMonth('All Months') }}>All Months</button>
            <button onClick={ ()=>{pickMonth('January') }}>January</button>
            <button onClick={ ()=>{pickMonth('February') }}>February</button>
            <button onClick={ ()=>{pickMonth('March') }}>March</button>
            <button onClick={ ()=>{pickMonth('April') }}>April</button>
            <button onClick={ ()=>{pickMonth('May') }}>May</button>
            <button onClick={ ()=>{pickMonth('June') }}>June</button>
            <button onClick={ ()=>{pickMonth('July') }}>July</button>
            <button onClick={ ()=>{pickMonth('August') }}>August</button>
            <button onClick={ ()=>{pickMonth('September') }}>September</button>
            <button onClick={ ()=>{pickMonth('October') }}>October</button>
            <button onClick={ ()=>{pickMonth('November') }}>November</button>
            <button onClick={ ()=>{pickMonth('December') }}>December</button>
        </div> 
    );
}

export default MonthsList