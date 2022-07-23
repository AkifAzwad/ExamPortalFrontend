
import BlogList from './BlogList';
import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import MyNavbar from './MyNavbar';
const Home = () => {

    // const { data: blogs, isPending, error } = useFetch("http://localhost:8000/blogs");
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const history = useHistory();


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/login');
        }
        fetch('http://localhost:8080/user/', {
            method: 'get',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('could not fetch data');
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


    return (
        <>
            <MyNavbar />
            <div className="home">
                {/* {error && <div> {error} </div>}
            {isPending && <div> Loading... </div>}
            {blogs && <BlogList blogs={blogs} title="All blogs" />} */}
                {error && <div> {error} </div>}
                {data && <BlogList blogs={data} />}
            </div>
        </>
    );
}

export default Home;