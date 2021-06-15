import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const Scheduler = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users.length]);

  return (
    <Container className="mt-3">
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Select Name(s)</Form.Label>
              <Form.Control as="select" multiple required>
                {users.length ? (
                  users.map((res) => (
                    <option
                      key={res.id}
                    >{`${res.first_name} ${res.last_name}`}</option>
                  ))
                ) : (
                  <option disabled>Please add Employees</option>
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
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button className="mt-3" variant="secondary">
          Add Schedule
        </Button>
      </Form>
    </Container>
  );
};

export default Scheduler;
