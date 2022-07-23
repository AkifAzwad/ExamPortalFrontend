import { Link, useHistory, useParams } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import useFetch from "./useFetch";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogDetails = () => {
    const { id } = useParams();
    // const { data: blog, error, isPending } = useFetch('http://localhost:8080/api/user/' + id);


    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const history = useHistory();


    useEffect(() => {

        fetch('http://localhost:8080/user/' + id, {
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




    const handleDelete = () => {
        fetch('http://localhost:8080/user/', {
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
            .then(data => {
                console.log(data);
                setData(data);
                setError(null);
                notify('Deleting');
                setTimeout(() => {
                    history.push('/');
                }, 2000);
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
                        history.push('/');
                    }, 2000);
                }
            )
    }

    // const handleUpdate = () => {
    //     fetch('http://localhost:8080/api/user/update', {
    //         method: 'put',
    //         headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    //     })
    //         .then(() => {
    //             history.push('/');
    //         })
    // }
    const handleEdit = () => {
        console.log(data.id);
        history.push(`/update/${data.id}`);
    }

    const notify = (message) => toast(message, " !");

    return (
        <>
            <MyNavbar />
            <div className="blog-details">
                {/* {error && <div> {error} </div>} */}

                {data && (
                    <article>
                        <p>Name: {data.fname}</p>
                        <p>Username: {data.username}</p>
                        <p>Email: {data.email}</p>
                        {/* <p style={{ marginBottom: "10px" }}>Password: {data.password}</p> */}

                        <button style={{ marginRight: "10px" }} onClick={handleEdit}>Update</button>

                        <button onClick={handleDelete}>Delete</button>
                    </article>
                )}

            </div>
            <ToastContainer autoClose={1000} />
        </>

    );
}

export default BlogDetails;