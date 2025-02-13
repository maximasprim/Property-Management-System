import About from '../components/About'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Reviews from '../features/Reviews/Review'

const AboutPage =()=>{
    return (
    <div>
    <Navbar />
    <About />
    <Reviews />
    <Footer />
    </div>
    )
}

export default AboutPage;