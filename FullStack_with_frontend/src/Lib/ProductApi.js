import axios from "axios";

const baseURL = "http://localhost:8080";


export async function getTableByID(id, tableName) {
    const url = `${baseURL}/${tableName}/${id}`;
    const token = localStorage.getItem("token");
    const data = await axios
        .get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
        .then((res) => {
            const { data } = res;
            console.log("this is check ", res);
            return data;
        })
        .catch((res) => (
            console.log(res)
        ))
    return data;
}

export async function getTable(tableName) {
    const url = `${baseURL}/${tableName}/`;
    const token = localStorage.getItem("token");
    const data = await axios
        .get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
        .then((res) => {
            const { data } = res;
            console.log("this is check ", res);
            return data;
        })
        .catch((res) => (
            console.log(res)
        ))
    return data;
}