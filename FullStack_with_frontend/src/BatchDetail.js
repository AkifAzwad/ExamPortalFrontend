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

const BatchDetail = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const history = useHistory();
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {

        fetch('http://localhost:8080/batch/' + id, {
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
        history.push("/batches/update/" + id);
    }

    const handleAssignStudent = () => {
        console.log("assign");
        history.push("/batches/assign");
    }

    const handleCreateBatch = () => {
        console.log("batch create");
        history.push("/batches/create");
    }

    const handleDelete = () => {
        fetch('http://localhost:8080/batch/' + id, {
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
                        history.push('/batches');
                    }, 2000);
                }
            )
    }


    const notify = (message) => toast(message, " !");

    return (
        <>
            <MyNavbar />

            <div className="container blog-list mt-3" >
                <div className="row">
                    <h2 className="text-center">batch Details</h2>
                    <div className=" card col-md-6 offset-md-3 blog-details2">
                        <Container className="card-body">
                            {data && (
                                <Fragment>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">batch Name:</Col>
                                        <Col className="text-center form-control">{data.batchname}</Col>
                                    </Row>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">batch Description:</Col>
                                        <Col className="text-center form-control">{data.batchdesc}</Col>
                                    </Row>
                                    <Row className="text-center" >
                                        <Col className="text-center form-control">Student List:</Col>
                                        <Col className="text-center form-control">
                                            {data.students.map((student, index) => (
                                                <span> {student.username}{index === data.students.length - 1 ? "" : ","} </span>
                                            ))}
                                        </Col>
                                    </Row>

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
                        <label >Add Student</label>
                        {/* <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        /> */}
                    </div>
                    <button onClick={handleAssignStudent}>add</button>
                </div>

                {/* {console.log(selectedOption)} */}
            </div>
        </>
    );
}

export default BatchDetail;