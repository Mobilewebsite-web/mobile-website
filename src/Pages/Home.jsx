import Navbar from "../components/HomeComponents/Navbar"
import Display from "../components/HomeComponents/Display";
import HomeUtils from "../components/HomeComponents/HomeUtils";
import FloatingApps from "../components/HomeComponents/FloatingApps";
import Products from "../components/HomeComponents/Products";
import Why from "../components/HomeComponents/Why";
import About from "../components/HomeComponents/About";
import React from "react";
const Home = ()=> {
          return (
                    <div className="p-4">
                              <Navbar />
                              <Display />
                              <HomeUtils/>
                              <FloatingApps />
                              <Products/>
                              <Why/>
                              <About/>
                    </div>
          )
}
export default Home;