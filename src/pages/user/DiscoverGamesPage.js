import { Link } from "react-router-dom";
import defaultImg from "../../assets/example_game/v1/thumbnail.png";
import NavComp from "../../components/NavComp";
import { useEffect, useState } from "react";
import UserApi from "../../api/userapi";

const DiscoverGamesPage = () => {
    const token = localStorage.getItem('token');
    const [games, setGames] = useState([]);
    const [totalElement, setElement] = useState('');

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState('title');
    const [sortDir, setSortDir] = useState('asc');

    useEffect(() => {
        const getGames = async () => {
            const res = await UserApi.getGames(token, size, page, sortBy, sortDir);
            setGames(res.content);
            setElement(res.totalElements);
        }

        getGames();
    }, [page, size, sortBy, sortDir]);
    return (
        <main>
            <NavComp />
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h1>Discover Games</h1>
                </div>
            </div>

            <div className="list-form py-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="mb-3">{totalElement} Game Avaliable</h2>
                        </div>

                        <div className="col-lg-8" style={{ textAlign: 'right' }}>
                            <div className="mb-3">
                                <div className="btn-group" role="group">
                                    <button 
                                    type="button" 
                                    onClick={() => setSortBy('popular')} 
                                    className={sortBy === 'popular' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >Popularity</button>
                                    <button 
                                    type="button" 
                                    onClick={() => setSortBy('uploaddate')} 
                                    className={sortBy === 'uploaddate' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >Recently Updated</button>
                                    <button 
                                    type="button" 
                                    onClick={() => setSortBy('title')} 
                                    className={sortBy === 'title' ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                    >Alphabetically</button>
                                </div>

                                <div className="btn-group" role="group">
                                    <button type="button" onClick={() => setSortDir('asc')} className="btn btn-secondary">ASC</button>
                                    <button type="button" onClick={() => setSortDir('desc')} className="btn btn-outline-primary">DESC</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {games.map((game, index) => ((
                            <div className="col-md-6" key={index}>
                                <Link to={'/detail-game'} className="card card-default mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <img src={defaultImg} alt="Demo Game 1 Logo" style={{ width: '100%' }}></img>
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1">{game.title} <small className="text-muted">By {game.author}</small></h5>
                                                <div>{game.description}</div>
                                                <hr className="mt-1 mb-1"></hr>
                                                <div className="text-muted">#scores submitted : {game.scoreCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )))}

                    </div>
                </div>
            </div>
        </main>
    )
}
export default DiscoverGamesPage;