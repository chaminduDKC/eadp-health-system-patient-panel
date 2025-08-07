import './context.css'
import Header from "./components/header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import TopHeader from "./components/top header/TopHeader.jsx";

const Context = () => {

    return (
        <div className="context">
            {/*<TopHeader />*/}
            <div className="header-div">

            <Header />
            </div>
            <div className="outlet">
            <Outlet />
            </div>
            <div className="footer-div">

            <Footer />
            </div>
        </div>
    )
}
export default Context;