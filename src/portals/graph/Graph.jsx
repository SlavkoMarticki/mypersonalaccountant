import React, { useEffect, useState } from "react";
import "./graph.css";
import arrow from "../../assets/logo/nextArrow.png";
import onlyMonthDateFormat from "../../utils/onlyMonthDateFormat";
import { Chart } from "../../components";
import { fetchGraphData} from "../../firebase";


const Graph = (comand) => {

    const {openGraph, closeGraph} = comand;
    const [date, setDate] = useState(onlyMonthDateFormat(new Date()));
    const [graphData, setGraphData] = useState([]);

    const splitDate = (date) => {
     
        const splitDate = date.split(' ');
        switch (splitDate[0]) {
            case 'January': return ['01', splitDate[1]];
            case 'February': return ['02', splitDate[1]];
            case 'March': return ['03', splitDate[1]];
            case 'April': return ['04', splitDate[1]];
            case 'May': return ['05', splitDate[1]];
            case 'June': return ['06', splitDate[1]];
            case 'July': return ['07', splitDate[1]];
            case 'August': return ['08', splitDate[1]];
            case 'September': return ['09', splitDate[1]];
            case 'October': return ['10', splitDate[1]];
            case 'November': return ['11', splitDate[1]];
            case 'December': return ['12', splitDate[1]];
            default: return "Error";
        }
    }

    const takeData = async () => {
        try {
            const result = await fetchGraphData();
            
            if(result){

                const filter = result.filter(item => (item.date.split('.')[1] === splitDate(date)[0] && item.date.split('.')[2] === splitDate(date)[1]))
                
                setGraphData(filter);
                return;
            }
            return [];
         
        } catch (error) {
            alert('Error while fetching graph data')
        }
    }
    useEffect(()=>{
        takeData();
    },[date])

    if(!openGraph) return null;
  
    const selectDate = (comand) => {
        if(comand === "1"){
            setDate(onlyMonthDateFormat(new Date(date), "1"))
        }else if(comand === "0"){
            setDate(onlyMonthDateFormat(new Date(date), "0"))
        } 
    }

    return (
        <div className="graph-background"> 
            <div className="graph-wrapper">
                <div className="graph-exit">
                    <button onClick={closeGraph} >x</button>
                </div>
                <div className="graph-header">
                    <button className="left-arrow" onClick={()=>{selectDate("0")}}>
                        <img src={arrow} alt="Loading..." />
                    </button>
                    <p className="graph-year">{date}</p>
                    <button className="right-arrow" onClick={()=>{selectDate("1")}}>
                        <img src={arrow} alt="Loading..." className="rotate" />
                    </button>
                </div>
                <div className="chart-holder">
                    <Chart chartData = {graphData}/>
                </div>
            </div>  
        </div>
    );
}

export default Graph;