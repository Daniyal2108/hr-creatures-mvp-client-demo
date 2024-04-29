import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
import classes from "./Calendar.module.css";
import "./Calendar.css";
const Calender = () => {
  const [date, setDate] = useState(new Date(Date.now()));
  // const [date, setDate] = useState(new Date("December 21, 1983 01:15:00"));
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const ref = useRef("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleWheelScrolling = (event) => {
    event.currentTarget.scrollLeft += event.deltaY;
  };

  const handleMonth = (e) => {
    const value = e.target.innerText;
    for (let i = 0; i < months.length; i++) {
      if (value === months[i]) {
        const newDate = new Date();
        newDate.setMonth(i, 1);
        newDate.setFullYear(activeStartDate.getFullYear());
        setDate(newDate);
      }
    }
  };

  const handleMouseOver = () => {
    console.log("first");
  };

  const handleMouseOut = () => {
    console.log("outed");
  };

  return (
    <div className={`${classes.calendar}`}>
      <Calendar
        value={date}
        onActiveStartDateChange={({ activeStartDate }) => {
          setDate(activeStartDate);
          setActiveStartDate(activeStartDate);
        }}
        onClickDay={(date) => {
          alert("Clicked on day: " + date.toDateString());
        }}
        showNeighboringMonth={false}
        activeStartDate={date}
      />
      <div
        className={`${classes.months} `}
        onWheel={(e) => handleWheelScrolling(e)}
        ref={ref}
        onMouseOver={() => {
          handleMouseOver();
        }}
        onMouseOut={() => {
          handleMouseOut();
        }}
      >
        {months &&
          months.map((month, index) => (
            <span
              key={index}
              className={`${classes.months_bar} ${
                months[date.getMonth()] === month && classes.months_bar_active
              }`}
              value={month}
              onClick={(e) => {
                handleMonth(e);
              }}
            >
              {month}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Calender;
