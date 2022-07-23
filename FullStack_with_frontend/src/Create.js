import { useState } from "react";
import { useHistory } from "react-router-dom";
import MyNavbar from "./MyNavbar";
const Create = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { username, password };

        setIsPending(true);
        fetch('http://localhost:8080/user/', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new user added');
            setIsPending(false);
            // history.go(-1);
            history.push('/');
        })

    }

    // const handleUpdate = (e) => {
    //     fetch('http://localhost:8080/api/user/update' + id, {
    //         method: "PUT",
    //     })
    //         .then((res) => {
    //             if (!res.ok) {
    //                 console.log(id);
    //                 throw Error('could not fetch data');
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log(data);
    //             setData(data);
    //             setIsError(null);
    //         })
    //         .then(() => {
    //             history.push('/');
    //         })
    // }


    return (
        <>
            <MyNavbar />
            <div className="create">
                <h2>Add a new user</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <label>Password:</label>
                    <input
                        type="text"
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    {/* <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => { setAuthor(e.target.value) }}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select> */}
                    {!isPending && <button>Add User</button>}
                    {isPending && <button disabled>Adding User...</button>}
                </form>
            </div>
        </>


    );
}

export default Create;