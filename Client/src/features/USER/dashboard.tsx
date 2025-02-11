import Layout from "./layout";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
    return (
        <div className="h-screen">
            <Navbar />
            <Layout />
            <Footer />
        </div>

    );
}  