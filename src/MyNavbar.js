import { useEffect, useState, } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const MyNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    // const loginHandler = ()=>{
    //     console.log("logged in");
    //     setLoggedIn(true);
    // }
    const logoutHandler = () => {
        console.log("logged out");
        localStorage.removeItem('token');
        setLoggedIn(false);
        notify('Logging you out');
        setTimeout(() => {
            // history.pushState('/login');
        }, 2000);
    }

    const notify = (message) => toast(message, " !");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [localStorage.getItem('token')])

    return (
        <>
            {/* <nav className="navbar">
                <h1>The Stack</h1>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/create">Add User</Link>
                    <Link to="/course/assign">Add Course</Link>
                    <Link to="/course/course-list">Course List</Link>
                    {
                        !loggedIn && <Link to="/">Login</Link>
                    }

                    {
                        loggedIn && <Link onClick={() => logoutHandler()} to='/login'>Logout</Link>
                    }
                </div>
            </nav> */}


            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        <Nav.Link ><Link to="/courses">Course</Link></Nav.Link>
                        <Nav.Link ><Link to="/students">Student</Link></Nav.Link>
                        <Nav.Link ><Link to="/teachers">Teacher</Link></Nav.Link>
                        <Nav.Link ><Link to="/batches">Batch</Link></Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {/* Signed in as: <a href="#login">Mark Otto</a> */}
                            {
                                !loggedIn && <Link to="/">Login</Link>
                            }

                            {
                                loggedIn && <Link onClick={() => logoutHandler()} to='/login'>Logout</Link>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <Navbar>
                <Container>
                    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}

            <ToastContainer autoClose={1000} />
        </>
    );
}

export default MyNavbar;


