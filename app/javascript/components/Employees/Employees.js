import axios from "axios";
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
  const [employeeForm, setEmployeeForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
  });

  const handleClose = () => {
    setOpenAddTitleModal(false);
  };

  const titleForm = document.getElementById("titleForm");
  const employeeFormId = document.getElementById("employeeFormId");

  const handleTitleInput = (e) => {
    setJobTitle(e.target.value);
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  console.log(employeeForm);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios
      .post("/users", employeeForm)
      .then((res) => {
        console.log(res);
        employeeFormId.reset();
      })
      .catch((err) => console.log(err));
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
      <Form
        id="employeeFormId"
        onChange={handleFormInput}
        onSubmit={handleFormSubmit}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Job Title</Form.Label>
            <InputGroup>
              <Form.Control as="select" name="job_title">
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

        <Button className="mt-3" variant="secondary" type="submit">
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
