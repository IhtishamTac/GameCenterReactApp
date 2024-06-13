import { useEffect, useState } from 'react';
import defaultImg from '../../assets/example_game/v1/thumbnail.png';
import UserApi from '../../api/userapi';
import { useNavigate, useParams } from 'react-router-dom';
const DetailGamePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { slug } = useParams();

    const [game, setGame] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const getDetail = async () => {
            const res = await UserApi.detailGame(token, slug);
            setGame(res[0]);
        }
        const getScores = async () => {
            const res = await UserApi.getScores(token, slug);
            setScores(res.scores);
        }
        getDetail();
        getScores();
    }, [slug]);
    if (!game) return (<h1>Loading...</h1>);

    const localStorageUsername = localStorage.getItem('username');

    const firstTenScores = scores.slice(0, 10);
    const isUserInFirstTen = firstTenScores.some(score => score.username === localStorageUsername);
    let userScore = null;

    if (!isUserInFirstTen) {
        userScore = scores.find(score => score.username === localStorageUsername);
    }

    return (
        <main>
            <div className="hero py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-1">
                        {game.title}
                    </h2>

                    <a href="profile.html" className="btn btn-success">By Dev1</a>
                    <div className="text-muted">
                        {game.description}
                    </div>
                    <h5 className="mt-2">Last Versions {game.thumbnail.split('/')[2]} ({game.uploadTimestamp})</h5>
                </div>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row justify-content-center ">
                        <div className="col-lg-5 col-md-6">

                            <div className="row">
                                <div className="col">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5>Top 10 Leaderboard</h5>
                                            <ol>
                                                {firstTenScores.map((score, index) => (
                                                    <li key={index}>
                                                        {score.username === localStorage.getItem('username') ? (
                                                            <b>{score.username} ({score.score})</b>
                                                        ) : (
                                                            <>{score.username} ({score.score})</>
                                                        )}
                                                    </li>
                                                ))}
                                                {!isUserInFirstTen && userScore && (
                                                    <li key="user-score">
                                                        <b>{localStorageUsername} ({userScore.score})</b>
                                                    </li>
                                                )}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={defaultImg} alt="Demo Game 1 Logo" style={{ width: '100%' }} />
                                    <a href="../example_game/v1//game.zip" className="btn btn-primary w-100 mb-2 mt-2">Download Game</a>
                                </div>
                            </div>


                            <button onClick={() => navigate(-1)} className="btn btn-danger w-100">Back</button>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
export default DetailGamePage;