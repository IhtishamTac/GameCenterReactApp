import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminApi from "../../api/adminapi";

const UpdateUserPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const { id, paramUsername } = useParams();

    const [username, setUsername] = useState(paramUsername);
    const [password, setPassword] = useState('');

    const handleInputChange = (e, setValue) => {
        setValue(e.target.value);
    }

    const hadnleUpdateUser = (e) => {
        e.preventDefault();
        AdminApi.updateuser(token, id, username, password, navigate);
    }
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-3">
                        Manage User - Administrator Portal
                    </h2>
                    <div className="text-muted">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </div>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <form onSubmit={hadnleUpdateUser}>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="username" className="mb-1 text-muted">Username <span className="text-danger">*</span></label>
                                            <input id="username" type="text" placeholder="Username" defaultValue={username} className="form-control" name="username" onChange={(e) => handleInputChange(e, setUsername)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item card card-default my-4">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="password" className="mb-1 text-muted">Password <span className="text-danger">*</span></label>
                                            <input id="password" type="password" placeholder="Password" className="form-control" name="userpasswordname" onChange={(e) => handleInputChange(e, setPassword)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col">
                                        <button className="btn btn-primary w-100">Submit</button>
                                    </div>
                                    <div className="col">
                                        <p onClick={() => navigate(-1)} className="btn btn-danger w-100">Back</p>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
export default UpdateUserPage;