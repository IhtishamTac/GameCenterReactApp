import { useEffect, useState } from "react";
import NavComp from "../../components/NavComp";
import AdminApi from "../../api/adminapi";
import { Link } from "react-router-dom";

const ListUserPage = () => {
    const token = localStorage.getItem('token');

    const [users, setusers] = useState([]);

    const getUsers = async () => {
        const res = await AdminApi.getUsers(token);
        setusers(res.content);
    }

    const blockUser = async (id, delete_reason) => {
        await AdminApi.blockUser(token, id, delete_reason);
        getUsers();
    }

    const unblockUser = async (id) => {
        await AdminApi.unblockUser(token, id);
        getUsers();
    }

    const deleteUser = async (id) => {
        await AdminApi.deleteUser(token, id);
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, [token]);
    if (!users) return (<h1>Loading...</h1>);
    return (
        <main>
            <NavComp />
            <div className="hero py-5 bg-light">
                <div className="container">
                    <Link to={'/add-user'} className="btn btn-primary">
                        Add User
                    </Link>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Users</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Created at</th>
                                <th>Last login</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td><a href="../Gaming Portal/profile.html" target="_blank">{user.username}</a></td>
                                    <td>{user.created_at}</td>
                                    <td>{user.last_login_at || "Haven't Login"}</td>
                                    {user.delete_reason === null ? (
                                        <td><span className="bg-success text-white p-1 d-inline-block">Active</span></td>
                                    ) : (
                                        <td><span className="bg-danger text-white p-1 d-inline-block">Blocked</span></td>
                                    )}
                                    <td>
                                        {user.delete_reason === null ? (
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Lock
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button type="submit" onClick={() => blockUser(user.id, 'Spamming')} className="dropdown-item" name="reason" value="spamming">Spamming</button>
                                                    </li>
                                                    <li>
                                                        <button type="submit" onClick={() => blockUser(user.id, 'Cheating')} className="dropdown-item" name="reason" value="cheating">Cheating</button>
                                                    </li>
                                                    <li>
                                                        <button type="submit" onClick={() => blockUser(user.id, 'Other')} className="dropdown-item" name="reason" value="other">Other</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <button onClick={() => unblockUser(user.id)} type="submit" className="btn btn-primary btn-sm">Unlock</button>
                                        )}
                                        <Link to={'/update-user/' + user.id +'/'+ user.username} className="btn btn-sm btn-secondary">Update</Link>
                                        <button onClick={()=>deleteUser(user.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </main>
    )
}
export default ListUserPage;