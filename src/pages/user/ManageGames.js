import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import defaultImg from "../../assets/example_game/v1/thumbnail.png";
import NavComp from "../../components/NavComp";
import UserApi from '../../api/userapi';

const ManageGames = () => {
    const token = localStorage.getItem('token');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCreatedGames = async () => {
            const res = await UserApi.getCreatedGames(token);
            setGames(res.games);
        }
        getCreatedGames();
    }, [token]);

    if (!games) return (<h1>Loading...</h1>);

    return (
        <main>
            <NavComp />

            <div className="hero py-5 bg-light">
                <div className="container">
                    <a href="manage-games-form.html" className="btn btn-primary">
                        Add Game
                    </a>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <h6 className="mb-3">List Games</h6>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th width="100">Thumbnail</th>
                                <th width="200">Title</th>
                                <th width="500">Description</th>
                                <th width="180">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((games, index) => ((
                                <tr key={index}>
                                    <td><img src={games.thumbnail ?? defaultImg} alt="Demo Game 1 Logo" style={{ width: '100%' }} /></td>
                                    <td>{games.title}</td>
                                    <td>{games.description}</td>
                                    <td>
                                        <Link to={'/detail-game/' + games.slug} className="btn btn-sm btn-primary">Detail</Link>
                                        <a href="manage-games-form-update.html" className="btn btn-sm btn-secondary">Update</a>
                                        <button className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>

                </div>
            </div>

        </main>
    )
}
export default ManageGames;