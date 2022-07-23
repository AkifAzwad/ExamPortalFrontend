import React from 'react'
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
const BatchUpdate = () => {
  const { id } = useParams();

    const [data, setData] = useState({ batchname: "", batchdesc: "" });
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();


    const handleUpdate = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/batch/' + id, {
            method: "PUT",
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
                return res.json();
            })

            .then(() => {
                setError(null);
                notify('Updating your data');
                // setTimeout(() => {
                //     history.push('/');
                // }, 2000);
            })
            .catch(
                (err) => {
                    setError(err.message);
                    notify(err.message);
                }
            )
            .then(
                () => {
                    setTimeout(() => {
                        history.push('/batches/'+id);
                    }, 2000);
                }
            )
    }

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value);
        setData(
            (prev) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            }
        )
    }

    const notify = (message) => toast(message, " !");

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
                // console.log("line 73");
                console.log(data);
                setData(data);
                setError(null);
            })
            .catch((e) => {
                console.log("error begin calling");
                setError(e.message);
            })
    }, []);




    return (

        <>
            <MyNavbar />
            <div className="create">
                <h2>Update batch Info</h2>
                <form onSubmit={handleUpdate}>

                    <label>batch Name</label>
                    <input
                        type="text"
                        name="batchname"
                        required
                        value={data.batchname}
                        onChange={handleChange}
                    ></input>
                    <label>batch Description</label>
                    <input
                        type="text"
                        name="batchdesc"
                        required
                        value={data.batchdesc}
                        onChange={handleChange}
                    ></input>
                    
                    

                    {!isPending && <button>Update</button>}
                    {isPending && <button disabled>Adding Blog...</button>}
                </form>
            </div>
            <ToastContainer autoClose={1000} />
        </>

    );
}

export default BatchUpdate