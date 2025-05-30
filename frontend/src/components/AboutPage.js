/**
 * Renders a static About page with information about the Word Game,
 * gameplay instructions, and creator contact details.
 *
 * @component
 * @returns {JSX.Element} About page content.
 */
const About = () => {
    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">🎮 Word Game</h2>
                    <p>
                        <strong>Welcome to the ultimate word guessing challenge!</strong><br />
                        This interactive web app lets you test your vocabulary and speed by guessing words.
                    </p>
                    <p>
                        On the <strong>Home</strong> page, you’ll enter your nickname and select a category.
                        A secret word will be randomly chosen from that category.
                    </p>
                    <p>
                        In the <strong>Game</strong> page, you can guess one letter at a time.
                        Use your logic and the hint provided to solve the word before you run out of attempts.
                    </p>
                    <p>
                        After finishing, your score will be calculated based on several factors:
                        <ul>
                            <li>Whether you used the hint</li>
                            <li>The number of tries it took you</li>
                            <li>How much time passed</li>
                        </ul>
                    </p>
                    <p>
                        Check out the <strong>Leaderboard</strong> to see how you rank among other players!
                    </p>
                    <p>
                        Admins can use the <strong>Word Manager</strong> to add, edit, or delete words and categories from the game.
                    </p>
                    <hr />
                    <div className="text-center">
                        <p className="mb-1"><strong>Created by:</strong> Idit Halevi</p>
                        <p><strong>Email:</strong> iditha@edu.jmc.ac.il</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
