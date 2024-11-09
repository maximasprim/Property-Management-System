import Container from '../components/Container';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Topbanner from '../components/Topbanner';
import FeaturedProperties from '../components/Featured properties';

const Home = () => {
    return (
        <div>
            <Container className="bg-base-200 flex flex-col">
                <Topbanner />
                <Navbar />
                <HeroSection />
                <FeaturedProperties />
            
            </Container>
        </div>
    )
}

export default Home;