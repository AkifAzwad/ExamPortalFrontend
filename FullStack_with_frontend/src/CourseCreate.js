import MyNavbar from "./MyNavbar";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseCreate = () => {
    const [data, setData] = useState({ courseName: "", courseDesc: "", topics: "" });
    const history = useHistory();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = { data };
        console.log(data);

        fetch('http://localhost:8080/course/', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {

                // history.push('/courses');
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
                        history.push('/courses');
                    }, 2000);
                }
            )

    }


    const notify = (message) => toast(message, " !");


    const handleChange = (e) => {

        console.log(e.target.courseName, e.target.value);
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
                <h2>Add a new Course</h2>
                <form onSubmit={handleSubmit}>
                    <label>Coursename:</label>
                    <input
                        type="text"
                        name="courseName"
                        required
                        value={data.courseName}
                        onChange={handleChange}
                    />
                    <label>Course Description:</label>
                    <input
                        type="text"
                        name="courseDesc"
                        required
                        value={data.courseDesc}
                        onChange={handleChange}
                    />
                    <label>Topics:</label>
                    <input
                        type="text"
                        name="topics"
                        required
                        value={data.topics}
                        onChange={handleChange}
                    />
                    <button>Add Course</button>
                    
                </form>
            </div>
        </>
    );
}

export default CourseCreate;