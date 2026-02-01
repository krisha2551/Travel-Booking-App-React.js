import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchBooking = async () => {
      try {
        const q = query(
          collection(db, "booking"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("result", result);

        setBookings(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooking();
  }, [user]);

  console.log("booking", bookings);

  return (
    <>
      {bookings.length === 0 ? (
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>No Trip Data Found</Card.Title>

                  <Button variant="primary" onClick={() => navigate("/trips")}>
                    Go to trips
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            {bookings.map((b) => (
              <Col>
                <Card className="m-5">
                  <Card.Body>
                    <Card.Title>{b.tripName}</Card.Title>
                    <Card.Text>
                      <p>{b.TravelDate}</p>
                      <p>{b.tripDestination}</p>
                      <p>Person{b.person}</p>
                      <p>Amount{b.TotalAmount}</p>
                      <p>Booked By:- {b.userName}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default MyBookings;
