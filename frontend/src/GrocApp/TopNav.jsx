import { Link } from "react-router-dom";

function TopNav() {

    return (
        <>
            <div>
            <Link to="/">Home</Link> | <Link to="fe-stores">Stores</Link> | <Link to="fe-items">Items</Link> | <Link to="fe-login">Login</Link>
            </div>
        </>
    );

}

export default TopNav;