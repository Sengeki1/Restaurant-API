// import NavBar from './Components/UI/Header/NavBar'
// import Hero from './Components/UI/Body/Hero'
// import Card from './Components/UI/Card/Card'
// import data from './data.js'
import PaymentForm from './Components/Dashboard/public/Payment';
import './App.css';

function App() {
  // const cards = data.map(item => { 
  //   return (
  //     <Card 
  //       {...item}
  //     />
  //   )
  // })
  
  // inside a jsx it can handle reading the list without explicit telling him which item
  return (
    // <div className="App">
    //   <NavBar /> 
    //   <Hero />
    //   <section className='cards-list'>
    //     {cards} 
    //   </section>
    // </div>
    <div>
      <PaymentForm/>
    </div>
  );
}

export default App;
