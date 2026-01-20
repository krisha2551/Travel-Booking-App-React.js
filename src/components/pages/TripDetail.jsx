import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import { trips } from "../../data/TripsData";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const trip = trips.find((t) => t.id === Number(id));

  if (!trip) {
    return (
      <Container className="py-5 text-center">
        <h3>Trip not found</h3>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Back to Trips
        </Button>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="p-0"
      style={{ backgroundColor: "#F4EFEA" }}
    >
      
      <div className="position-relative">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-100"
          style={{
            height: "480px",
            objectFit: "cover",
            filter: "brightness(0.9)",
          }}
        />

        <div
          className="position-absolute bottom-0 start-0 w-100 p-5 text-white"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 90, 90, 0.95), transparent)",
          }}
        >
          <Container>
            <h1 className="fw-bold display-5">{trip.name}</h1>
            <p className="fs-5">{trip.destination}</p>

            <div className="d-flex flex-wrap gap-2">
              <Badge bg="light" text="dark">
                {trip.duration}
              </Badge>
              <Badge bg="warning" text="dark">
                ⭐ {trip.rating}
              </Badge>
              <Badge bg="secondary">{trip.difficulty}</Badge>
              <Badge bg="success">₹ {trip.price}</Badge>
            </div>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        <Row className="g-5">
          {/* Left Content */}
          <Col lg={8}>
            <Card
              className="border-0 shadow-sm mb-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Card.Body>
                <Card.Title
                  className="fw-bold fs-4"
                  style={{ color: "#0A5A5A" }}
                >
                  About the Trip
                </Card.Title>
                <Card.Text className="mt-3">{trip.overview}</Card.Text>
              </Card.Body>
            </Card>

            <Card
              className="border-0 shadow-sm mb-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Card.Body>
                <Card.Title
                  className="fw-bold fs-4"
                  style={{ color: "#0A5A5A" }}
                >
                  Trip Highlights
                </Card.Title>
                <Row className="mt-3 g-3">
                  {trip.highlights.map((item, index) => (
                    <Col md={6} key={index}>
                      <div
                        className="p-3 rounded-3"
                        style={{
                          backgroundColor: "#E8F3F1",
                          borderLeft: "5px solid #0A5A5A",
                        }}
                      >
                        ✅ {item}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            <Card
              className="border-0 shadow-sm mb-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Card.Body>
                <Card.Title
                  className="fw-bold fs-4"
                  style={{ color: "#0A5A5A" }}
                >
                  Day-wise Itinerary
                </Card.Title>
                <Accordion className="mt-3">
                  {trip.itinerary.map((day, index) => (
                    <Accordion.Item eventKey={String(index)} key={index}>
                      <Accordion.Header>
                        <strong>Day {day.day}</strong> — {day.title}
                      </Accordion.Header>
                      <Accordion.Body>{day.description}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>

            <Row className="g-4 mb-4">
              <Col md={6}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <Card.Body>
                    <Card.Title
                      className="fw-bold"
                      style={{ color: "#0A5A5A" }}
                    >
                      Inclusions
                    </Card.Title>
                    <ListGroup variant="flush">
                      {trip.inclusions.map((item, i) => (
                        <ListGroup.Item key={i}>✔ {item}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <Card.Body>
                    <Card.Title
                      className="fw-bold"
                      style={{ color: "#0A5A5A" }}
                    >
                      Exclusions
                    </Card.Title>
                    <ListGroup variant="flush">
                      {trip.exclusions.map((item, i) => (
                        <ListGroup.Item key={i}>✖ {item}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card
              className="border-0 shadow-sm mb-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Card.Body>
                <Card.Title
                  className="fw-bold"
                  style={{ color: "#0A5A5A" }}
                >
                  Best Time to Visit
                </Card.Title>
                <Card.Text>{trip.bestTimeToVisit}</Card.Text>
              </Card.Body>
            </Card>

            <Button
              style={{ backgroundColor: "#0A5A5A", border: "none" }}
              onClick={() => navigate(-1)}
            >
              ← Back to Trips
            </Button>
          </Col>

          {/* Right Booking Sidebar */}
          <Col lg={4}>
            <Card
              className="border-0 shadow sticky-top"
              style={{
                top: "90px",
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
              }}
            >
              <Card.Body>
                <h2 className="fw-bold" style={{ color: "#0A5A5A" }}>
                  ₹ {trip.price}
                </h2>
                <p className="text-muted">
                  {trip.duration} • {trip.difficulty}
                </p>

                <Button
                  size="lg"
                  className="w-100 mb-2"
                  style={{ backgroundColor: "#0A5A5A", border: "none" }}
                >
                  Book Now
                </Button>

                <Button
                  variant="outline-dark"
                  className="w-100"
                  style={{ borderColor: "#0A5A5A", color: "#0A5A5A" }}
                >
                  Enquire
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default TripDetail;
