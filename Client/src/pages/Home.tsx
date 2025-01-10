import Container from '../components/Container';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Topbanner from '../components/Topbanner';
import FeaturedProperties from '../components/Featured properties';
import Footer from '../components/Footer';
import About from '../components/About';

const Home = () => {
    return (
        <div>
            <Container className="bg-base-200 flex flex-col">
                <Topbanner />
                <Navbar />
                <HeroSection />
                <FeaturedProperties />
                <About />
                <Footer />
            
            </Container>
        </div>
    )
}

export default Home;