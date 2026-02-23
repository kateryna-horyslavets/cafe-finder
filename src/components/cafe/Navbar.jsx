import {NavLink} from "react-router-dom";

export default function Navbar() {
    return(
            <div className="navbar-container">
                <nav className="navbar flex items-center justify-between p-6 bg-[#4E6308] text-white">
                    <div className="navbar-logo">
                        <NavLink to="/" className="text-2xl font-bold flex items-center">
                        <img src="/Logo.png" className="inline-block items-center w-12 h-12 mr-2"/>
                        Find&Eat
                        </NavLink>
                    </div>
                </nav>
            </div>
    );
}