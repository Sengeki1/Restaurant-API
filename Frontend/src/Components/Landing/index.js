import { useState, useEffect } from 'react';
import NavBar from '../UI/Header/NavBar'
import Hero from './Body/Hero'
import Card from './Card/Card'
import './style.css';

function LandingPage() {
  const [data, setData] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const getDishes = async () => {
      if (data.length <= 0) {
        const response = await fetch("http://localhost:3001/menu");
        setData(await response.json());   
      }
    }
    
    if (dishes.length <= 0) {
      getDishes();
      setDishes(data.slice(0, 8).map(item => { 
        return (
          <Card 
            {...item}
          />
        );
      }));
    }
  }, [data, dishes]);
  
  // inside a jsx it can handle reading the list without explicit telling him which item
  return (
    <div className="App">
      <NavBar /> 
      <Hero />
      <section className='cards-list'>
        {dishes} 
      </section>
    </div>
  );
}

export default LandingPage;
