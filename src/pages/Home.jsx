import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HomeHero from "../components/HomeHero";
import Popular from "../components/Popular";
import Blocks from "../components/Blocks";
import Menu from "../components/Menu";
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
        <Blocks />
        <Menu />
        <Zobo />        
    </div>
  )
}

export default Home