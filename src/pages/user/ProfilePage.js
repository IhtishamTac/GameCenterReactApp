import { useEffect, useState } from 'react';
import defaultImg from '../../assets/example_game/v1/thumbnail.png';
import UserApi from '../../api/userapi';
import { Link, useNavigate, useParams } from 'react-router-dom';
const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { username } = useParams();

    const [profile, setProfile] = useState(null);
    const [highscores, setHighscores] = useState([]);
    const [authoredGames, setAuthoredGames] = useState([]);
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await UserApi.getProfile(token, username);
                setProfile(res);
                setHighscores(res.highscore);

                if (res.authoredGames) {
                    for (let i = 0; i < 3; i++) {
                        const authoredGamesDetail = await UserApi.detailGame(token, res.authoredGames[i].slug);
                        setAuthoredGames(data => [...data, ...authoredGamesDetail]);
                    }
                }
            } catch (err) {

            }
        }
        getProfile();
    }, [username]);
    if (!profile) return (<h1>Loading...</h1>);
    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-1">
                        {profile.username}
                    </h2>
                    <h5 className="mt-2">Last Login {profile.registeredTimestamp || "Haven't Login"}</h5>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <h5>Highscores per Game</h5>
                            <div className="card-body">
                                <ol>
                                    {highscores.map((hs, index) => (
                                        <li key={index}><Link to={'/detail-game/' + hs.game.slug}>{hs.game.title} ({hs.score})</Link></li>
                                    ))}
                                </ol>
                            </div>
                            <h5>Authored Games</h5>
                            {authoredGames.map((ag, index) => (
                                <Link to={'/detail-game/' + ag.slug} className="card card-default mb-3" key={index}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <img src={defaultImg} alt="Demo Game 1 Logo" style={{ width: '100%' }} />
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1">{ag.title} <small className="text-muted">By {ag.author}</small></h5>
                                                <div>{ag.description}</div>
                                                <hr className="mt-1 mb-1" />
                                                <div className="text-muted">#scores submitted : {ag.scoreCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <button onClick={() => navigate(-1)} className="btn btn-danger w-100">Back</button>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
export default ProfilePage;