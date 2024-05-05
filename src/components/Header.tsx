import '../css/header.css';

function Header() {
    return (
        <header>
            <h1>ChatRoom90's</h1>
            <button onClick={() => location.reload()}>X</button>
        </header>
    )
}

export default Header;