import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";


const BlogList = ({ blogs }) => {

    return (
        <>
            {/* <MyNavbar /> */}
            <div className="blog-list">

                {blogs.map((blog) => (
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h2>Username: {blog.username}</h2>
                            <h2>Rolename: {blog.userRoles[0].roleName}</h2>
                            {/* <p>Username: {blog.username}</p>
                        {blog.age >= 0 && <p>Age: {blog.age}</p>}
                        <p>Address: {blog.address}</p> */}
                            {/* <button onClick={()=>handleDelete(blog.id)}>delete blog</button> */}

                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BlogList;