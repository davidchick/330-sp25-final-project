import { Link } from "react-router-dom";

function Home() {

    return (
        <>
            <h2>Welcome</h2>

            <p>
            <Link to="fe-stores">Stores</Link><br/>
            <Link to="fe-items">Items</Link>
            </p>

        </>
    );

}

export default Home;