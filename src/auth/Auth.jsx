import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FcGoogle } from "react-icons/fc";

import { auth, googleProvider } from "../Firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState("");
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (identifier, e) => {
    setAuthData((prev) => ({
      ...prev,
      [identifier]: e.target.value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(
          auth,
          authData.email,
          authData.password
        );
        setUser(result.user.email);
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          authData.email,
          authData.password
        );
        setUser(result.user.email);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Card className="p-4 shadow-sm" style={{ width: "360px" }}>
          <h4 className="text-center mb-3">
            {isLogin ? "Login" : "Create Account"}
          </h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {user && <Alert variant="success">Welcome: {user}</Alert>}

          <Form onSubmit={handleForm}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={authData.email}
                onChange={(e) => handleChange("email", e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={authData.password}
                onChange={(e) => handleChange("password", e)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100 mb-2"
              disabled={loading}
            >
              {isLogin ? "Login" : "Signup"}
            </Button>
          </Form>

          <Button
            onClick={handleGoogleLogin}
            variant="light"
            className="w-100 border d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>

          <div className="text-center mt-3">
            {isLogin ? (
              <>
                New user?{" "}
                <Button variant="link" onClick={() => setIsLogin(false)}>
                  Create Account
                </Button>
              </>
            ) : (
              <>
                Already have account?{" "}
                <Button variant="link" onClick={() => setIsLogin(true)}>
                  Login
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Auth;
