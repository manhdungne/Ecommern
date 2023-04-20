import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");

  const [signup, { error, isLoading, isError }] = useSignupMutation();
  function handleSignup(e) {
    e.preventDefault()
    signup({name, email, password, age, location, mobile})
  }
  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1>Create an account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                value={age}
                required
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile"
                value={mobile}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Sign Up
              </Button>
            </Form.Group>
            <p className="pt-3 text-center">
              You already have a account ?<Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
