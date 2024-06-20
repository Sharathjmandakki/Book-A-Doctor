import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Display() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function data() {
            const response = await axios.get("http://localhost:8080/allusers");
            setUsers(response.data)
        }
        data()
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Username</th>
                    {/* <th>pass</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    users.map((u) => (
                        <tr>
                            <td>
                                {(u.img===true)?<img src={`http://localhost:8080/users/${u.username}/image`} alt={u.username} style={{ maxWidth: '200px' }} />
                            :<img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' style={{ maxWidth: '200px' }} />}
                            </td>
                            <td>{u.username}</td>
                            {/* <td>{u.password}</td> */}
                        </tr>
                    ))
                }
            </tbody>

        </table>
    )
}
