import MyNavbar from "./MyNavbar";
import { Link, useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Container, Row } from "react-bootstrap";

import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const CourseDetail = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const history = useHistory();
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {

        fetch('http://localhost:8080/course/' + id, {
            method: 'get',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        })
            .then((res) => {
                if (!res.ok) {
                    console.log(id);
                    throw Error('Something went wrong');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setError(null);
            })
            .catch((e) => {
                console.log("error begin calling");
                setError(e.message);
            })
    }, []);

    const handleEdit = () => {
        console.log(data.id);
        history.push("/courses/update/" + id);
    }

    const handleAssignTeacher = () => {
        console.log("assign");
        history.push("/courses/assign");
    }

    const handleCreateBatch = ()=>{
        console.log("batch create");
        history.push("/batches/create"); 
    }

    const handleDelete = () => {
        fetch('http://localhost:8080/course/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) {
                    console.log(id);
                    throw Error('You are not authorized for this action');
                }
                return res;
            })
            .then(() => {
                setError(null);
                notify('Deleting');
                // setTimeout(() => {
                //     history.push('/');
                // }, 2000);
            })
            .catch((e) => {
                console.log("error begin calling");
                setError(e.message);
                notify(e.message);
            })
            // .then(() => {
            //     history.push('/');
            // })
            .then(
                () => {
                    setTimeout(() => {
                        history.push('/courses');
                    }, 2000);
                }
            )
    }
    

    const notify = (message) => toast(message, " !");

    return (
        <>
            <MyNavbar />
            {/* <div className="blog-details">
                {error && <div> {error} </div>}

                {data && (
                    <article>
                        <p>Course Name: {data.courseName}</p>
                        <p>Description: {data.courseDesc}</p>

                        <p>Teacher List:
                            {data.teachers.map((teacher, index) => (

                                // <h1>{index}</h1>
                                <span> {teacher.username} </span>
                            ))}
                        </p>
                        <p>Batch List</p>
                        <p>Topics</p>

                        <button style={{ marginRight: "10px" }} onClick={handleEdit}>Update</button>

                        <button onClick={handleDelete}>Delete</button>
                    </article>
                )}

            </div> */}
            {/* <div className="container blog-list mt-5">
                <div className="row">
                    <div className="container card col-md-6 offset-md-3" style={{ backgroundColor: "#2196F3" }}>
                        <h2 className="text-center">Course Details</h2>
                        <div className=" card-body blog-details2">
                            <Container>
                                {data && (
                                    <Fragment>
                                        <Row className="text-center" >
                                            <Col className="text-center form-control">Course Name:</Col>
                                            <Col className="text-center form-control">{data.courseName}</Col>
                                        </Row>
                                        <Row className="text-center" >
                                            <Col className="text-center form-control">Course Description:</Col>
                                            <Col className="text-center form-control">{data.courseDesc}</Col>
                                        </Row>
                                        <Row className="text-center" >
                                            <Col className="text-center form-control">Teacher List:</Col>
                                            <Col className="text-center form-control">
                                                {data.teachers.map((teacher, index) => (
                                                    <span> {teacher.username}{index === data.teachers.length - 1 ? "" : ","} </span>
                                                ))}
                                            </Col>
                                        </Row>
                                        <Row className="text-center" >
                                            <Col className="text-center form-control">Batch List:</Col>
                                            <Col className="text-center form-control">
                                                {data.batches.map((batch, index) => (
                                                    <span> {batch.batchName} </span>
                                                ))}
                                            </Col>
                                        </Row>
                                        <Row className="text-center" >
                                            <Col className="text-center form-control">Topics:</Col>
                                            <Col className="text-center form-control">{data.topics}</Col>
                                        </Row>

                                    </Fragment>
                                )}
                            </Container>
                            <button onClick={handleEdit} style={{ marginRight: "10px" }}>Update</button>

                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container blog-list mt-3" >
                <div className="row">
                    <h2 className="text-center">Course Details</h2>
                    <div className=" card col-md-6 offset-md-3 blog-details2">
                        <Container className="card-body">
                            {data && (
                                <Fragment>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">Course Name:</Col>
                                        <Col className="text-center form-control">{data.courseName}</Col>
                                    </Row>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">Course Description:</Col>
                                        <Col className="text-center form-control">{data.courseDesc}</Col>
                                    </Row>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">Teacher List:</Col>
                                        <Col className="text-center form-control">
                                            {data.teachers.map((teacher, index) => (
                                                <span> {teacher.username}{index === data.teachers.length - 1 ? "" : ","} </span>
                                            ))}
                                        </Col>
                                    </Row>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">Batch List:</Col>
                                        <Col className="text-center form-control">
                                            {data.batches.map((batch, index) => (
                                                <span> {batch.batchName} </span>
                                            ))}
                                        </Col>
                                    </Row>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">Topics:</Col>
                                        <Col className="text-center form-control">{data.topics}</Col>
                                    </Row>
                                    {/* <Row className="text-center" >
                                            <Col>
                                            </Col>
                                        </Row> */}
                                </Fragment>
                            )}
                        </Container>
                        <button onClick={handleEdit}>Update</button>
                        <button onClick={handleDelete} className="mt-1 mb-3">Delete</button>
                    </div>
                </div>
            </div>
            <div className="container blog-details2 mt-3">
                <div className="card col-md-6 offset-md-3">
                    <div className="card-body">
                        <label >Add Teacher</label>
                        {/* <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        /> */}
                    </div>
                    <button onClick={handleAssignTeacher}>add teacher</button>
                </div>
                <div className="card col-md-6 offset-md-3">
                    <div className="card-body">
                        <label >Add Batch</label>
                        {/* <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        /> */}
                    </div>
                    <button onClick={handleCreateBatch}>add Batch</button>
                </div>
                {/* {console.log(selectedOption)} */}
            </div>
        </>
    );
}

export default CourseDetail;