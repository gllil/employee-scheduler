import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const Employees = () => {
  return (
    <Container className="mt-3">
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Select Name(s)</Form.Label>
              <Form.Control as="select" multiple required></Form.Control>
              <Form.Text muted>To select multiple hold CTRL</Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" required />
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

export default Employees;
