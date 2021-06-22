import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Table, Form, Col, Row, Button } from "react-bootstrap";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [mountCalendar, setMountCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState("");
  const [openEventModal, setOpenEventModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState("");

  const convertTo24Hour = (hour, ampm) => {
    if (hour <= 12 && ampm === "pm") {
      return (12 + hour).toString();
    } else if (hour < 12 && ampm === "am") {
      return "0" + hour.toString();
    } else {
      return hour.toString();
    }
  };
  const convertTo12HourFull = (time) => {
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
  const convertTo12Hour = (time) => {
    let hour = parseInt(time);
    if (hour > 12) {
      let convertedHour = hour - 12;
      hour = convertedHour.toString();
    } else if (hour < 12) {
      hour = hour.toString();
    } else if (hour === 12) {
      hour = hour.toString();
    } else if (hour === 0 || hour === 24) {
      hour = "12";
    }
    return hour;
  };
  const findAmOrPm = (time) => {
    let hour = parseInt(time);
    let ampm = "";
    if (hour > 12) {
      ampm = "pm";
    } else if (hour < 12) {
      ampm = "am";
    } else if (hour === 12) {
      ampm = "pm";
    } else if (hour === 0 || hour === 24) {
      ampm = "am";
    }
    return ampm;
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

  const pickUserAndDate = (eventsList, selectedDate, userId) => {
    let eventsDateAndUser = eventsList.filter(
      (e) => splitDateFromTime(e.start) === selectedDate && e.id === userId
    );
    return eventsDateAndUser;
  };

  const handleModalClose = () => {
    setOpenEventModal(false);
    setEdit(false);
    calendar.render();
  };

  const editSchedule = (userId) => {
    setUserId(userId);
    setEdit(true);
  };

  const handleSchedulerForm = (e) => {
    console.log(e.currentTarget.value);
  };

  let calendarEl = document.getElementById("calendar");

  let calendar = new FullCalendar(calendarEl, {
    plugins: [dayGridPlugin],
  });

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
      {console.log(<FullCalendar />)}
      {mountCalendar ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dayMaxEvents={true}
          dateClick={function (info) {
            setCalendarDate(info.dateStr);
            setOpenEventModal(true);
          }}
          id="calendar"
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
          {edit ? (
            pickUserAndDate(events, calendarDate, userId).map((res) => (
              <Form
                className="mt-3"
                onChange={(e) => handleSchedulerForm(e)}
                key={res.id}
              >
                <strong className="ml-5">{res.title}</strong>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        name="date"
                        type="date"
                        required
                        defaultValue={splitDateFromTime(res.start)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Group className="row align-items-center">
                      <Form.Control
                        className="col"
                        name="start_hour"
                        as="select"
                        required
                        defaultValue={convertTo12Hour(
                          splitTimeFromDate(res.start)[0]
                        )}
                        custom
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </Form.Control>
                      :
                      <Form.Control
                        className="col"
                        name="start_min"
                        as="select"
                        required
                        defaultValue={splitTimeFromDate(res.start)[1]}
                        custom
                      >
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                      </Form.Control>
                      <Form.Control
                        className="col"
                        name="start_am_or_pm"
                        as="select"
                        required
                        custom
                        defaultValue={findAmOrPm(
                          splitTimeFromDate(res.start)[0]
                        )}
                      >
                        <option>am</option>
                        <option>pm</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="ml-2">
                    <Form.Label>End Time</Form.Label>
                    <Form.Group className="row align-items-center">
                      <Form.Control
                        className="col"
                        name="end_hour"
                        as="select"
                        required
                        defaultValue={convertTo12Hour(
                          splitTimeFromDate(res.end)[0]
                        )}
                        custom
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </Form.Control>
                      :
                      <Form.Control
                        className="col"
                        name="end_min"
                        as="select"
                        required
                        defaultValue={splitTimeFromDate(res.end)[1]}
                        custom
                      >
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                      </Form.Control>
                      <Form.Control
                        className="col"
                        name="end_am_or_pm"
                        as="select"
                        required
                        custom
                        defaultValue={findAmOrPm(splitTimeFromDate(res.end)[0])}
                      >
                        <option>am</option>
                        <option>pm</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Button onClick={() => setEdit(false)}>Update</Button>
                <Button onClick={() => setEdit(false)}>Cancel</Button>
              </Form>
            ))
          ) : (
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
                  <tr key={res.id} onClick={() => editSchedule(res.id)}>
                    <th>{res.title}</th>
                    <th>{convertTo12HourFull(splitTimeFromDate(res.start))}</th>
                    <th>{convertTo12HourFull(splitTimeFromDate(res.end))}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Calendar;
