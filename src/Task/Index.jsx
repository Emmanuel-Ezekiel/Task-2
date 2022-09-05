import React, { useState, useEffect } from 'react';
// import styles from './style.module.css';
import ReactApexChart from "react-apexcharts";
import axios from "axios";
const Task = () => {
  const [ year , setYear ] = useState([]);


  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/actors/get-awards',
    params: {nconst: 'nm0001667'},
    headers: {
      'X-RapidAPI-Key': '10a4ffc562mshaa4d1d30c089239p1a1266jsnec71f151e298',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };


  useEffect(() => {
    const Yearsb = [];
    const Counts = []
    axios.request(options).then(function (response) {
      console.log(response.data.resource.awards);
      for(const obj of response.data.resource.awards) {
        console.log("here", obj)
        Yearsb.push(obj.year)
        Counts.push(obj.instanceWithinYear)

      }
      setYear(Yearsb)
    }).catch(function (error) {
      console.error(error);
    });
  }, [])

  //year field
  const Years = [...new Set(year)]



const foo  = (array)  => {
    let b = [],
      // b = [],
      arr = [...array],
      prev;
  
    arr.sort();
    for (let element of arr) {
      if (element !== prev) {
        // a.push(element);
        b.push(1);
      }
      else ++b[b.length - 1];
      prev = element;
    }
  
    return b;
  }
  
  // the number of occurrences of each year.
  const count = foo(year);



  

  const chartData = { 
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories:  Years,
        title: {
          text: "Year",
          style: {
            color: undefined,
            fontSize: '20px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        }
      },
      yaxis: {
        show: true,
        title: {
          text: "Count",
          style: {
            color: undefined,
            fontSize: '20px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        }
      }
    },
    series: [
      {
        name: "series-1",
        data: count
      }
    ]
  };
  
  
  return (
    <>
    <div className="app">
        <div className="row">
          <h1>Task 2</h1>
          <div className="mixed-chart">
            < ReactApexChart 
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Task;