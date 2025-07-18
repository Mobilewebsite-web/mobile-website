import Navbar from "../components/HomeComponents/Navbar";
import Display from "../components/HomeComponents/Display";
import HomeUtils from "../components/HomeComponents/HomeUtils";
import FloatingApps from "../components/HomeComponents/FloatingApps";
import Products from "../components/HomeComponents/Products";
import Why from "../components/HomeComponents/Why";
import About from "../components/HomeComponents/About";

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* Main content with correct padding-top to offset fixed navbar */}
      <div className=" px-4 sm:px-4 md:px-10 lg:px-20">
        <div className="pt-10">
        <Display />
        </div>
        <HomeUtils />
        <FloatingApps />
        <Products />
        <Why />
        <About />
      </div>
    </div>
  );
};

export default Home;
