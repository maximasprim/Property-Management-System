import Container from '../components/Container';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Topbanner from '../components/Topbanner';
import FeaturedProperties from '../components/Featured properties';
import Footer from '../components/Footer';
import About from '../components/About';
import ImageUploadWidget from '../components/CloudinaryUploadForm';
import ParentComponent from '../components/parent';


const Home = () => {
    return (
        <div>
            <Container className="bg-base-200 flex flex-col">
                <Topbanner />
                <Navbar />
                {/* <LoginUser /> */}
                <HeroSection />
                <FeaturedProperties />
                <About />
                <Footer />
                {/* <ImageUploadWidget />
                <ParentComponent /> */}
               
            
            </Container>
        </div>
    )
}

export default Home;