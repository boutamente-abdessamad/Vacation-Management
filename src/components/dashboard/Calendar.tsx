"use client";
import React from 'react'
// make sure you include the timeline stylesheet or the timeline will not be styled
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridWeek from '@fullcalendar/timegrid' // a plugin!
import moment from 'moment'
import {getEmployees} from "@api/client/employees"
import { Alert, Space } from 'antd';
import { useQuery} from '@tanstack/react-query'


export default function Calendar() {

    const { data : employees, isLoading, isError } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
        staleTime: 10000, 
        refetchInterval: 5000,
    })
    



    const items = employees?.map((employee) => {
       return  employee.vacations.length > 0 && employee.vacations.map((vacation) => {
            return {
                title: employee.first_name + " " + employee.last_name,
                start: moment(vacation.start_at).format('YYYY-MM-DD'),
                end: moment(vacation.end_at).format('YYYY-MM-DD'),
                status : vacation.status
            }
        })
       
    } ).filter(Boolean).flat()


  return (
    <>
        {
            isError &&  <Space direction="vertical" className="w-full mb-5">
                <Alert
                    message="An error occurred while fetching Employees"
                    type="error"
                />
            </Space>
        }

        <FullCalendar
            plugins={[ dayGridPlugin ,timeGridWeek  ]}
            initialView="dayGridMonth"
            weekends={true}
            events={items}
            headerToolbar= {{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            }}

            eventDidMount={function(info) {
                const extendedProps = info.event.extendedProps;
                if(extendedProps.status == "PENDING"){
                    info.el.style.backgroundColor = "#2db7f5";
                    info.el.style.color = "white";
                    }else if(extendedProps.status == "APPROVED"){
                        info.el.style.backgroundColor = "#87d068";
                        info.el.style.color = "white";
                }   else if(extendedProps.status == "REJECTED"){
                    info.el.style.backgroundColor = "#f50";
                    info.el.style.color = "white";
                }

             }}
            
        />
    </>
  )
}