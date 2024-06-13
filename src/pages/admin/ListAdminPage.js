import { useEffect, useState } from "react";
import NavComp from "../../components/NavComp";
import AdminApi from "../../api/adminapi";

const ListAdminPage = () => {
    const token = localStorage.getItem('token');

    const [admins, setAdmins] = useState([]);;
    useEffect(() => {
        const getAdmins = async () => {
            const res = await AdminApi.getAdmins(token);
            setAdmins(res.content);
        }

        getAdmins();
    }, [token]);
    if (!admins) return (<h1>Loading...</h1>);
    return (
        <main>
            <NavComp />
            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Admin Users</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Created at</th>
                                <th>Last login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.username}</td>
                                    <td>{admin.created_at}</td>
                                    <td>{admin.last_login_at || "Haven't Login"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </main>
    )
}
export default ListAdminPage;