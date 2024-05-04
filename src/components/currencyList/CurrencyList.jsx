import React from "react";
import "./currencyList.css";

const CurrencyList = (data) => {

    const {pickExchangeRate,pickCurrencyLogo, closeList} = data

    return (
        <div className="currency-dropdown-list">
            <button onClick={
                () => {
                    pickExchangeRate(1);
                    pickCurrencyLogo('RSD');
                    closeList(false);
                }}
            >RSD</button>
            <button onClick={
                () => {
                    pickExchangeRate(0.0085)
                    pickCurrencyLogo('EUR');
                    closeList(false);
                }}>EUR</button>
            <button onClick={
                ()=>{
                    pickExchangeRate(0.86)
                    pickCurrencyLogo('RUB');
                    closeList(false);
                }
            }>RUB</button>
            <button onClick={
                ()=>{
                    pickExchangeRate(0.0091)
                    pickCurrencyLogo('USD');
                    closeList(false);
                }}>USD</button>
        </div>
    );
}

export default CurrencyList;

