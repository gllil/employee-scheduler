import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const Scheduler = () => {
  const [users, setUsers] = useState([]);
  const [allDay, setAllday] = useState(false);
  const [schedulerForm, setSchedulerForm] = useState({});

  useEffect(() => {
    axios
      .get("https://employee-scheduler-backend.herokuapp.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users.length]);

  console.log(users);

  // const handleAllDay = (e) => {
  //   setAllday(e.target.checked);
  // };

  const handleSchedulerForm = (e) => {
    const { name, value } = e.target;
    setSchedulerForm({ ...schedulerForm, [name]: value });
  };

  return (
    <Container className="mt-3">
      <Form onChange={handleSchedulerForm}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Select Name(s)</Form.Label>
              <Form.Control name="names" as="select" multiple required>
                {users.length ? (
                  users.map((res) => (
                    <option
                      key={res.id}
                    >{`${res.first_name} ${res.last_name}`}</option>
                  ))
                ) : (
                  <option disabled>Please add employees</option>
                )}
              </Form.Control>
              <Form.Text muted>To select multiple hold CTRL</Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control name="start_date" type="date" required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    name="start_time"
                    type="time"
                    disabled={allDay}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control name="end_date" type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control name="end_time" type="time" disabled={allDay} />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-end">
          {/* <Col className="text-start">
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="All Day"
                onClick={handleAllDay}
              />
            </Form.Group>
          </Col> */}
          <Col className="text-end">
            <Button type="submit" className="mt-3" variant="secondary">
              Add Schedule
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Scheduler;
