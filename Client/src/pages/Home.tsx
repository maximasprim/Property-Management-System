import Container from '../components/Container';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Topbanner from '../components/Topbanner';

const Home = () => {
    return (
        <div>
            <Container className="bg-base-200 flex flex-col">
                <Topbanner />
                <Navbar />
                <HeroSection />
            
            </Container>
        </div>
    )
}

export default Home;