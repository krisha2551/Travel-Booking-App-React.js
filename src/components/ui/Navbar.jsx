import { Container, Navbar, Nav } from "react-bootstrap";
import {NavLink} from "react-router-dom";

function NavbarMenu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Travelia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> 
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="trips">
              Trips
            </Nav.Link>
            <Nav.Link href="#link">Destinations</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
