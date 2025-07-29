import './home.css'
import HeroImage from '../../../../assets/hero-image.jpg'
import {useColorMode} from "../../../../util/theme/ThemeContext.jsx";
import {NavLink} from "react-router-dom";
import logo from '../../components/header/logo.png'


const Home = () => {
    const { mode, toggleColorMode } = useColorMode();

    const newsItems = [
        {
            link:"https://miro.medium.com/v2/resize:fit:1024/1*ma5jvnktmd1LYVJFPeN0sQ.png",
            title: "HopeHealth Launches AI-Powered Patient Diagnosis Tool",
            description: "HopeHealth has unveiled its new AI-powered diagnostic assistant, enabling doctors to receive faster and more accurate preliminary analysis for patient symptoms. This innovation is aimed at reducing patient wait times and improving treatment precision, especially in rural areas."
        },
        {
            link:"https://www.shutterstock.com/image-photo/asian-beautiful-woman-visit-consult-600nw-2480568789.jpg",
            title: "HopeHealth Crosses 1 Million Patient Consultations",
            description: "In a major milestone, HopeHealth has officially completed over 1 million patient consultations across its digital and physical platforms. The milestone reflects the trust patients place in HopeHealth’s commitment to accessible, affordable, and quality care."
        },
        {
            link:"https://www.americanprogress.org/wp-content/uploads/sites/2/2010/10/mentalhealth_onpage.jpg",
            title: "HopeHealth Expands Free Mental Health Services Nationwide",
            description: "Recognizing the growing need for mental well-being, HopeHealth has expanded its free online counseling services. This initiative now covers all major cities and includes 24/7 support from certified mental health professionals."
        }
    ];
    const services = [
        {
            title: "Online Booking 24/7",
            description: "Easily book your appointments at any time, day or night, with our seamless online booking system.",
            image: "https://demigos.com/media/cache/61/e8/61e8be99d482c40c4f294b577a7d2e92.jpg"
        },
        {
            title: "Certified Consultants & Friendly Support Staff",
            description: "Receive trusted medical care from our team of licensed and experienced consultants across specialties. Our compassionate and trained support staff are always here to assist you with a smile and professionalism.",
            image: "https://d2c0db5b8fb27c1c9887-9b32efc83a6b298bb22e7a1df0837426.ssl.cf2.rackcdn.com/23214286-doctor-at-home-1251x763.jpeg"
        },
        {
            title: "Mental Health Counseling",
            description: "Access confidential sessions with certified counselors for anxiety, stress, depression, and more.",
            image: "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2645292.jpg"
        },

    ];

    // Sample customer reviews
    const reviews = [
        {
            name: "Amit Sharma",
            rating: 5,
            text: "Excellent service! The doctors are very professional and caring. Highly recommended!"
        },
        {
            name: "Priya Singh",
            rating: 4,
            text: "Very satisfied with the consultation. The staff was friendly and helpful."
        },
        {
            name: "Rahul Verma",
            rating: 5,
            text: "Great experience. Booking appointments was quick and easy."
        },
        {
            name: "Amit Sharma",
            rating: 5,
            text: "Excellent service! The doctors are very professional and caring. Highly recommended!"
        },
        {
            name: "Priya Singh",
            rating: 4,
            text: "Very satisfied with the consultation. The staff was friendly and helpful."
        },
        {
            name: "Rahul Verma",
            rating: 5,
            text: "Great experience. Booking appointments was quick and easy."
        },
        {
            name: "Amit Sharma",
            rating: 5,
            text: "Excellent service! The doctors are very professional and caring. Highly recommended!"
        },
        {
            name: "Priya Singh",
            rating: 4,
            text: "Very satisfied with the consultation. The staff was friendly and helpful."
        },
        {
            name: "Rahul Verma",
            rating: 5,
            text: "Great experience. Booking appointments was quick and easy."
        }
    ];

    return (
        <>
            <div className="home-header" style={{
                backgroundColor: mode  ==="dark" ? "var(--color-dark4)" : "var(--color-light-green)",
            }}>
                <ul className="links" style={{}}>
                    <li><a style={{
                        color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                    }} href="#news-welcome">News</a></li>


                    <li><a style={{
                        color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                    }} href="#services">Services</a></li>


                    <li><a style={{
                        color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                    }} href="#reviews">Reviews</a></li>

                    <li><a style={{
                        color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                    }} href="#contact">Contact</a></li>


                </ul>
                <div className="info">
                    <li>
                        <i className="fa-solid fa-tty"></i>
                        <p> 0112212211</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-envelope"></i>
                        <p>hopehealth@info.lk</p>
                    </li>
                    <li>
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-linkedin-in"></i>
                    </li>
                </div>
            </div>

            <div className="home">
                <div className="hero" id="hero">

                        <h1>Experience the Best Healthcare of Hope Health with Us</h1>
                        <p style={{
                            color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                        }}>Connect with us today to learn more about our services and how we can help you.</p>
                        <NavLink to="/context/appointments">Book an Appointment</NavLink>

                </div>
                <div className="news-welcome" id="news-welcome">
                    <div className="welcome">
                        <h1>Welcome to Hope Health</h1>
                        <p style={{
                            color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                        }}>We are a team of experienced healthcare professionals dedicated to providing high-quality
                            care to our patients.
                            We believe in creating a welcoming and supportive environment for our patients to
                            feel comfortable and cared for. Our goal is to provide the best possible care while also
                            educating and empowering our patients to take control of their health.
                        </p>
                    </div>
                    <div className="news">
                        <h1 style={{

                            fontSize: "3rem",
                            marginBottom: "0px"
                        }}>Latest News</h1>
                        <p>Checkout for the latest news from Hope Health</p>

                        <div className="cards">


                        {newsItems.map((item, index) => (
                            <div className="news-item" style={{
                                backgroundColor: mode === "dark" ? "var(--color-dark4)" : "var(--color-cream)",
                            }} key={index}>
                                <div className="image">
                                    <img src={item.link} alt=""/>
                                </div>
                                <h2 style={{
                                    color: mode === "dark" ? "var(--color-gray)" : "var(--color-dark4)",
                                }}>{item.title}</h2>
                                <p style={{
                                    color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                                }}>{item.description}</p>
                            </div>
                        ))}
                        </div>
                    </div>

                </div>
                <div className="services" id="services">
                    <h1 style={{

                        fontSize: "3rem",
                        marginBottom: "0px"
                    }}>Our Services</h1>
                    <p>Checkout for the latest news from Hope Health</p>

                    <div className="cards">


                        {services.map((item, index) => (
                            <div className="service-item" style={{
                                backgroundColor: mode === "dark" ? "var(--color-dark4)" : "var(--color-cream)",
                            }} key={index}>
                                <div className="image">
                                    <img src={item.image} alt=""/>
                                </div>
                                <h2 style={{
                                    color: mode === "dark" ? "var(--color-gray)" : "var(--color-dark4)",
                                }}>{item.title}</h2>
                                <p style={{
                                    color: mode === "dark" ? "var(--color-text)" : "var(--color-dark4)",
                                }}>{item.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="reviews" id="reviews">
                    <h1 style={{

                        fontSize: "3rem",
                        marginBottom: "0px"
                    }}>Customer Reviews</h1>
                    <p>Here are some of our customer reviews</p>

                    <div className="cards">
                        {reviews.map((review, idx) => (
                            <div className="review-card" key={idx} style={{
                                background: mode === "dark" ? "var(--color-dark4)" : "#fff",
                                color: mode === "dark" ? "var(--color-text)" : "var(--color-dark1)",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                                padding: "1.5rem",

                            }}>
                                <div style={{fontWeight: 600, fontSize: "1.2rem", marginBottom: "0.5rem"}}>{review.name}</div>
                                <div style={{color: "#FFD700", marginBottom: "0.5rem"}}>
                                    {Array.from({length: review.rating}).map((_, i) => <span key={i}>★</span>)}
                                    {Array.from({length: 5 - review.rating}).map((_, i) => <span key={i} style={{color: '#ccc'}}>★</span>)}
                                </div>
                                <div style={{fontSize: "1rem"}}>{review.text}</div>
                            </div>
                        ))}
                    </div>


                </div>
                <div className="contact" id="contact">
                    <div className="logo" style={{
                        background: mode === "dark" ? "var(--color-dark4)" : "#fff",
                        color: mode === "dark" ? "var(--color-text)" : "var(--color-dark1)",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                        padding: "1.5rem",
                    }}>
                        <div className="image">
                            <img src={logo} alt="" width="100px" height="100px" style={{
                                objectFit: "cover"
                            }}/>
                        </div>
                        <p>Hope Health is a private healthcare provider committed to delivering exceptional
                            healthcare across a range of specialties for more than 75 years.
                        </p>
                    </div>
                    <div className="contact-details" style={{
                        background: mode === "dark" ? "var(--color-dark4)" : "#fff",
                        color: mode === "dark" ? "var(--color-text)" : "var(--color-dark1)",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                        padding: "1.5rem",
                    }}>
                        <h2>CONTACT US</h2>
                        <div className="phone">
                            <p>Phone numbers</p>
                            <p>+(123) 456-7890</p>
                            <p>+(123) 456-7890</p>
                        </div>
                        <div className="email">
                            <p>Email</p>
                            <p>7mG9E@example.com</p>
                        </div>
                    </div>
                    <div className="icons" style={{
                        background: mode === "dark" ? "var(--color-dark4)" : "#fff",
                        color: mode === "dark" ? "var(--color-gray)" : "var(--color-dark1)",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                        padding: "1.5rem",
                    }}>
                        <h2>HOPE HEALTH</h2>
                        <div className="icon-list">
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-youtube"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;