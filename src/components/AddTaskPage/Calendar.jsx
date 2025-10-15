import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment-jalaali";

// مسیر CSS درست برای FullCalendar v5
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export default function JalaliCalendar({ selectedDate, onDateChange }) {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
  }, []);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) calendarApi.gotoDate(selectedDate);
  }, [selectedDate]);

  const handleDateClick = (info) => {
    onDateChange(info.date);
  };

  return (
    <div className="w-full h-screen">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={selectedDate}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        locale="fa"
        firstDay={6}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}
        dayCellContent={(args) => moment(args.date).format("jD")}
        height="100vh"
      />
    </div>
  );
}
