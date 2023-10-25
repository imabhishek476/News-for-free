import React from 'react'
import {Link} from "react-router-dom";

const Navbar=(props)=>{
    const {name, setName} = props;
    const handleChange = (event) => {
        localStorage.setItem( "search", event.target.value);
        setName(localStorage.getItem("search"));
    };
    

    return (
      <>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand pt-0 pb-0" to="/"><img src="https://drive.google.com/uc?export=view&id=1dFBGneaAUyxrTdBR1389UbL_m13LaR1w" alt="" srcSet="" height={50} width={150}/> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input value = {name} onChange={handleChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <Link className="btn btn-outline-success" to={`/search`} type="submit">Search</Link>
                    </form>
                </div>
            </div>
        </nav>
      </>
    )
}

export default Navbar