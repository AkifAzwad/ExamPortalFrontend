import { useState } from "react";
import { useHistory } from "react-router-dom";
import MyNavbar from "./MyNavbar";

const AddCourseToTrainer = () => {
    const [username, setUsername] = useState('');
    const [coursename, setCoursename] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { username, coursename };

        setIsPending(true);
        fetch('http://localhost:8080/course/course-to-user', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new user added');
            setIsPending(false);
            // history.go(-1);
            history.push('/courses');
        })

    }

    return (
        <>
            <MyNavbar/>
            <div className="create">
                <h2>Add a course to trainer</h2>
                <form onSubmit={handleSubmit}>
                    <label>User:</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <label>Course:</label>
                    <input
                        type="text"
                        required
                        value={coursename}
                        onChange={(e) => { setCoursename(e.target.value) }}
                    />

                    {!isPending && <button>Assign Course</button>}
                    {isPending && <button disabled>Assigning Course to trainer</button>}
                </form>
            </div>
        </>

    );
}

export default AddCourseToTrainer;