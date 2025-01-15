import { Link, useNavigate } from "react-router-dom";
import Api from "../api/api";

const NavComp = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleSignout = () => {
        Api.signout(token, navigate);
    }
    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/dashboard'}>Gaming Portal</Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    {localStorage.getItem('username').includes('admin') ?
                        <>
                            <li><Link to={'/list-admin'} className="nav-link px-2 text-white">List Admin</Link></li>
                            <li><Link to={'/list-user'} className="nav-link px-2 text-white">List User</Link></li>
                        </>
                        :
                        <>
                            <li><Link to={'/discover-games'} className="nav-link px-2 text-white">Discover Games</Link></li>
                            <li><Link to={'/manage-games'} className="nav-link px-2 text-white">Manage Games</Link></li>
                            <li><Link to={'/profile/' + localStorage.getItem('username')} className="nav-link px-2 text-white">User Profile</Link></li>
                        </>
                    }

                    <li className="nav-item">
                        <Link className="nav-link active bg-dark" to={'/'}>Welcome, {localStorage.getItem('username') || 'Username not found'}</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleSignout} className="btn bg-white text-primary ms-4">Sign Out</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavComp;