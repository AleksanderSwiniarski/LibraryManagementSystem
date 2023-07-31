import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Book } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const [isLibrarian, setIsLibrarian] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate(); 

    useEffect(() => {
        if(username === 'librarian'){
            setIsLibrarian(true);
        }
    }, [username])

    const logOutUser = () => {
        localStorage.removeItem('username');
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Book size={40}/></Navbar.Brand>
                <Navbar.Brand>Hello {username}!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-nabar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {(!isLibrarian && <Nav.Link href="/deleteuser">Delete Account</Nav.Link>)}
                        <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;