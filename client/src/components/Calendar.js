import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Table } from "react-bootstrap";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [mountCalendar, setMountCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState("");
  const [openEventModal, setOpenEventModal] = useState(false);

  const convertTo24Hour = (hour, ampm) => {
    if (hour <= 12 && ampm === "pm") {
      return (12 + hour).toString();
    } else if (hour < 12 && ampm === "am") {
      return "0" + hour.toString();
    } else {
      return hour.toString();
    }
  };
  const convertTo12Hour = (time) => {
    let hour = parseInt(time[0]);
    let min = time[1];
    let ampm = "";
    if (hour > 12) {
      let convertedHour = hour - 12;
      hour = convertedHour.toString();
      ampm = "pm";
    } else if (hour < 12) {
      hour = hour.toString();
      ampm = "am";
    } else if (hour === 12) {
      hour = hour.toString();
      ampm = "pm";
    } else if (hour === 0 || hour === 24) {
      hour = "12";
      ampm = "am";
    }
    return hour + ":" + min + ampm;
  };

  const convertMinute = (min) => {
    if (min === 0) {
      return "00";
    } else {
      return min.toString();
    }
  };

  const convertDate = (dateString) => {
    let selectedDate = new Date(dateString);
    let month = selectedDate.getMonth();
    let day = selectedDate.getDate();
    let year = selectedDate.getFullYear();
    let fullDate = `${month}/${day}/${year}`;
    return fullDate;
  };

  const splitDateFromTime = (startDate) => {
    let reducedDate = startDate.split("T");
    return reducedDate[0];
  };
  const splitTimeFromDate = (startDate) => {
    let reducedDate = startDate.split("T");
    let reduceTime = reducedDate[1].split(":");
    return reduceTime;
  };

  const pickDate = (eventsList, selectedDate) => {
    let eventsDate = eventsList.filter(
      (e) => splitDateFromTime(e.start) === selectedDate
    );
    return eventsDate;
  };

  const handleModalClose = () => {
    setOpenEventModal(false);
  };

  useEffect(() => {
    let eventList = [];
    const adjustDateTime = (date, hour, min, ampm) => {
      let partDate = date;
      let time = `${convertTo24Hour(hour, ampm)}:${convertMinute(min)}:00`;
      let fullDate = `${partDate}T${time}`;

      return fullDate;
    };
    axios
      .get("https://employee-scheduler-backend.herokuapp.com/users")
      .then((res) => {
        return res.data;
      })
      .then((users) => {
        axios
          .get("https://employee-scheduler-backend.herokuapp.com/workdays")
          .then((workdays) => {
            workdays.data.forEach((workday) => {
              let selectedUser =
                users && users.filter((user) => user.id === workday.user_id);
              if (selectedUser[0].first_name && selectedUser[0].last_name) {
                eventList.push({
                  id: workday.id,
                  title:
                    selectedUser[0].first_name +
                    " " +
                    selectedUser[0].last_name,
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
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          ev
          dayMaxEvents={true}
          dateClick={function (info) {
            setCalendarDate(info.dateStr);
            setOpenEventModal(true);
          }}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            right: "prev,next today",
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <Modal size="xl" show={openEventModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{convertDate(calendarDate)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table hover striped bordered>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {pickDate(events, calendarDate).map((res) => (
                <tr key={res.id}>
                  <th>{res.title}</th>
                  <th>{convertTo12Hour(splitTimeFromDate(res.start))}</th>
                  <th>{convertTo12Hour(splitTimeFromDate(res.end))}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Calendar;
