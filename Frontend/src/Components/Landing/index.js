import NavBar from '../UI/Header/NavBar'
import Hero from './Body/Hero'
import Card from './Card/Card'
import data from './data.js'
import './style.css';

function LandingPage() {
  const cards = data.map(item => { 
    return (
      <Card 
        {...item}
      />
    )
  })
  
  // inside a jsx it can handle reading the list without explicit telling him which item
  return (
    <div className="App">
      <NavBar /> 
      <Hero />
      <section className='cards-list'>
        {cards} 
      </section>
    </div>
  );
}

export default LandingPage;
