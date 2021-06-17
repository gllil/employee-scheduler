import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  const [fullName, setFullname] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsLength, setEventsLength] = useState(null);
  const [mountCalendar, setMountCalendar] = useState(false);
  const [usersReady, setUsersReady] = useState(false);
  const [eventsReady, setEventsReady] = useState(false);

  const convertHour = (hour, ampm) => {
    if (hour <= 12 && ampm === "pm") {
      return (12 + hour).toString();
    } else if (hour < 12 && ampm === "am") {
      return "0" + hour.toString();
    } else {
      return hour.toString();
    }
  };

  const convertMinute = (min) => {
    if (min === 0) {
      return "00";
    } else {
      return min.toString();
    }
  };

  const adjustDateTime = (date, hour, min, ampm) => {
    let partDate = date;
    let time = `${convertHour(hour, ampm)}:${convertMinute(min)}:00`;
    let fullDate = `${partDate}T${time}`;

    return fullDate;
  };

  useEffect(() => {
    let eventList = [];
    axios
      .get("/users")
      .then((res) => {
        return res.data;
      })
      .then((users) => {
        axios.get("/workdays").then((workdays) => {
          setEventsLength(workdays.data.length);
          workdays.data.map((workday) => {
            let selectedUser =
              users && users.filter((user) => user.id === workday.user_id);
            if (selectedUser[0].first_name && selectedUser[0].last_name) {
              eventList.push({
                id: workday.id,
                title:
                  selectedUser[0].first_name + " " + selectedUser[0].last_name,
                start: adjustDateTime(
                  workday.date,
                  workday.start_hour,
                  workday.start_min,
                  workday.start_am_or_pm
                ),
                end: adjustDateTime(
                  workday.date,
                  workday.end_hour,
                  workday.end_min,
                  workday.end_am_or_pm
                ),
              });
            }
          });
        });
      })
      .catch((err) => console.log(err));

    setEvents(eventList);

    setTimeout(() => {
      setMountCalendar(true);
    }, 3000);
  }, []);

  return (
    <>
      {mountCalendar ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dayMaxEvents={true}
          headerToolbar={{
            left: "prev, next, today",
            center: "title",
            right: "dayGridMonth, timeGridWeek, timeGridDay",
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Calendar;
