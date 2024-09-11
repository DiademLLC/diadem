import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Modal from "../components/reuseables/Modal";
import HomeHero from "../components/HomeHero";
import Popular from "../components/Popular";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Zobo from "../components/Zobo";

const Home = () => {
  const { hash } = useLocation();

  useEffect(()=> {
    if(hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if(element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })
  
  return (
    <div className="relative">        
        <HomeHero />
        <Popular />
        <Menu />
        <Zobo />        
    </div>
  )
}

export default Home