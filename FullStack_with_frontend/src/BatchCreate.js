import MyNavbar from "./MyNavbar";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BatchCreate = () => {
    const [data, setData] = useState({ batchname: "", batchdesc: ""});
    const history = useHistory();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = { data };
        console.log(data);

        fetch('http://localhost:8080/batch/', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {

                // history.push('/batchs');
                if (!res.ok) {
                    console.log(data);
                    throw Error('You are not authorized for this action');
                }
                return res.json();

            })
            .then(() => {
                setError(null);
                notify('Creating...');
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
                        history.push('/batches');
                    }, 2000);
                }
            )

    }


    const notify = (message) => toast(message, " !");


    const handleChange = (e) => {

        console.log(e.target.batchName, e.target.value);
        setData(
            (prev) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            }
        )
    }
    return (
        <>
            <MyNavbar />
            <div className="create">
                <h2>Add a new batch</h2>
                <form onSubmit={handleSubmit}>
                    <label>batchname:</label>
                    <input
                        type="text"
                        name="batchname"
                        required
                        value={data.batchname}
                        onChange={handleChange}
                    />
                    <label>batch Description:</label>
                    <input
                        type="text"
                        name="batchdesc"
                        required
                        value={data.batchdesc}
                        onChange={handleChange}
                    />
                    <button>Add batch</button>
                    
                </form>
            </div>
        </>
    );
}

export default BatchCreate;