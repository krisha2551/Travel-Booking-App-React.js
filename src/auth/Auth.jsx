import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/config";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleAuthData = (e, identifier) => {
    setAuthData((prevData) => {
      return {
        ...prevData,
        [identifier]: e.target.value,
      };
    });
  };

  console.log("authdata", authData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(
          auth,
          authData.email,
          authData.password,
        );
        if (result) {
          navigate("/trips");
        }
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          authData.email,
          authData.password,
        );
        if (result) {
          navigate("/trips");
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

       if (result) {
          navigate("/trips");
        }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <Card className="shadow  p-4" style={{ width: "400px" }}>
            <Card.Title className="text-center">
            <h4>  {isLogin ? "Login" : "Sign up"}</h4>
            </Card.Title>
            <Form
              className="d-flex justify-content-center align-items-center flex-column"
              onSubmit={handleFormSubmit}
            >
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={authData.email}
                  onChange={(e) => handleAuthData(e, "email")}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={authData.password}
                  onChange={(e) => handleAuthData(e, "password")}
                ></Form.Control>
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" className="mb-2">
                  {isLogin ? "Login" : "create new account"}
                </Button>
                <br />
                <Button variant="outline-secondary" onClick={handleGoogleLogin}>
                  Login With Google
                </Button>
                <br />
                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin
                    ? "do not have account ? "
                    : "already have an account"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
