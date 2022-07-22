import { useState, useEffect, Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASEURL } from "./Constants";
import Table from 'react-bootstrap/Table';
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { Col, Container, Row } from "react-bootstrap";


const CourseList = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const notify = (message) => toast(message, " !");
    const api = "http://localhost:8080";
    const authAxios = axios.create({
        baseURL: api,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })






    useEffect(() => {
        console.log("this is use");
        const fetchData = async () => {
            try {
                const result = await authAxios.get("/course/");
                console.log("this is fetch ");
                console.log(result.data);
                setCourses(result.data);
            } catch (error) {
                console.log("this is the error");
                setError(error.message);
            }
        }
        fetchData();
    }, []);


    const handleEdit = () => {
        console.log(data.id);
        history.push("/courses/create/");
    }

    return (

        <>
            <MyNavbar />
            <div className="container blog-list mt-3" >
                <div className="row">
                    <h2 className="text-center">Course List</h2>
                    <div className=" card col-md-6 offset-md-3 blog-details2">
                        <Container className="card-body">
                            <Row className="text-center" >
                                <Col className="text-center form-control">Course Id</Col>
                                <Col className="text-center form-control">Course Name</Col>
                                <Col className="text-center form-control">Actions</Col>
                            </Row>
                            {courses.length > 0 && courses.map((course) => (
                                <Row  >
                                    <Col className="text-center form-control">{course.courseId}</Col>
                                    <Col className="text-center form-control">{course.courseName}</Col>
                                    <Col className="text-center form-control">
                                        <Link className="btn btn-info" to={`/courses/${course.courseId}`}>
                                            Details</Link>
                                    </Col>
                                </Row>

                            ))}
                        </Container>
                        <button onClick={handleEdit}>Create Course</button>
                        {/* <button onClick={handleDelete} className="mt-1 mb-3">Delete</button> */}
                    </div>
                </div>
            </div>

            {/* <div className="container">
                <h2 className="text-center">List of Courses</h2>
                <Link to={"/courses/create"} className="btn btn-primary mb-2 mt-2 text-center">Create Course</Link>
                <form>
                    <Table striped bordered hover className="blog-preview">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {courses.length > 0 && courses.map((course) => (

                                // <Fragment>
                                //     {editCourseId === course.courseId ? 
                                //     (<EditableRow editFormData={editFormData} 
                                //         handleEditFormChange={handleEditFormChange}
                                //     />) :
                                //         (<ReadOnlyRow course={course} handleEdit={handleEdit} />)}
                                // </Fragment>

                                <tr >
                                    <td>{course.courseId}</td>
                                    <td>{course.courseName}</td>
                                    <Link className="btn btn-info" to={`/courses/${course.courseId}`}>
                                        Details</Link>
                                </tr>
                            ))}



                        </tbody>
                    </Table>
                </form>

            </div> */}
        </>

    );
}

export default CourseList;