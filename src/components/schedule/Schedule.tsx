import React from 'react'
import Moment from 'react-moment';
import ScheduleShowline from './ScheduleShowline'
import './Schedule.css'

function Schedule() {
    return (
        <div className='schedule-container'>
            <div className='schedule-headline-container'>        
                <div className='schedule-title'>
                    <p>SCHEDULE</p>
                </div>
                <div className='schedule-day'>
                    <button className='schedule-day-button'>MON</button>
                    <button className='schedule-day-button'>TUE</button>
                    <button className='schedule-day-button'>WED</button>
                    <button className='schedule-day-button'>THU</button>
                    <button className='schedule-day-button'>FRI</button>
                    <button className='schedule-day-button'>SAT</button>
                    <button className='schedule-day-button'>SUN</button>

                </div>
            </div>
            <div className='Monday'>
                <ScheduleShowline />
                <ScheduleShowline />
            </div>
            <div className='Tuesday'>
                <ScheduleShowline />
                <ScheduleShowline />
                <ScheduleShowline />
                <ScheduleShowline />
                <ScheduleShowline />
                <ScheduleShowline />
            </div>
            </div>
    )
  }
  
  export default Schedule