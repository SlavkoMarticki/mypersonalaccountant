import React from 'react';
import "./boldedWord.css";

export default function BoldedWord({word}) {

  if(word === 'Expenditure') return (<b className='expenditure'>{word} </b>);
  if(word === 'Income') return (<b className='income'>{word} </b>);
  
  return <b>{word} </b>
  
}
