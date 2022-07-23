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


const BatchList = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [batches, setbatches] = useState([]);
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
                const result = await authAxios.get("/batch/");
                console.log("this is fetch ");
                console.log(result.data);
                setbatches(result.data);
            } catch (error) {
                console.log("this is the error");
                setError(error.message);
            }
        }
        fetchData();
    }, []);


    const handleEdit = () => {
        console.log(data.id);
        history.push("/batches/create/");
    }

    return (

        <>
            <MyNavbar />
            <div className="container blog-list mt-3" >
                <div className="row">
                    <h2 className="text-center">Batch List</h2>
                    <div className=" card col-md-6 offset-md-3 blog-details2">
                        <Container className="card-body">
                            <Row className="text-center" >
                                <Col className="text-center form-control">Batch Id</Col>
                                <Col className="text-center form-control">Batch Name</Col>
                                <Col className="text-center form-control">Actions</Col>
                            </Row>
                            {batches.length > 0 && batches.map((Batch) => (
                                <Row  >
                                    <Col className="text-center form-control">{Batch.batchId}</Col>
                                    <Col className="text-center form-control">{Batch.batchname}</Col>
                                    <Col className="text-center form-control">
                                        <Link className="btn btn-info" to={`/batches/${Batch.batchId}`}>
                                            Details</Link>
                                    </Col>
                                </Row>

                            ))}
                        </Container>
                        <button onClick={handleEdit}>Create Batch</button>
                        {/* <button onClick={handleDelete} className="mt-1 mb-3">Delete</button> */}
                    </div>
                </div>
            </div>

            
        </>

    );
}

export default BatchList;