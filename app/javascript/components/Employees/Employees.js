import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

const Employees = () => {
  const [openAddTitleModal, setOpenAddTitleModal] = useState(false);
  const [jobTitle, setJobTitle] = useState(null);
  const [titleList, setTitleList] = useState([]);

  const handleClose = () => {
    setOpenAddTitleModal(false);
  };

  const titleForm = document.getElementById("titleForm");

  const handleTitleInput = (e) => {
    setJobTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    let jobList = [];
    if (jobTitle) {
      jobList.push(jobTitle);
      setTitleList([...titleList, jobList]);
      titleForm.reset();
    }
  };
  return (
    <Container className="mt-3">
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Job Title</Form.Label>
            <InputGroup>
              <Form.Control as="select">
                <option>Choose Job Title</option>
                {titleList.length ? (
                  titleList.map((res) => <option>{res}</option>)
                ) : (
                  <option disabled>Please add Job Titles</option>
                )}
              </Form.Control>
              <InputGroup.Append>
                <Button
                  variant="secondary"
                  onClick={() => setOpenAddTitleModal(true)}
                >
                  Edit Titles
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Button className="mt-3" variant="secondary">
          Add Employee
        </Button>
      </Form>
      <Modal show={openAddTitleModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Titles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="titleForm">
            <InputGroup>
              <Form.Control
                type="text"
                name="jobTitle"
                onChange={handleTitleInput}
              />
              <InputGroup.Append>
                <Button variant="secondary" onClick={handleTitleSubmit}>
                  Add Title
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <ListGroup className="mt-5">
            {titleList ? (
              titleList.map((res) => <ListGroup.Item>{res}</ListGroup.Item>)
            ) : (
              <ListGroup.Item>Please add Job Titles</ListGroup.Item>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Employees;
