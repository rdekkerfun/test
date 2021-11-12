import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import '../styles/_app.scss';
import axios from 'axios';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleDarkMode = () => {
    document.getElementById('root').className = '';
    setDarkMode(!darkMode)
    if (darkMode === true) {
      document.getElementById('root').className = '';
    } else {
      document.getElementById('root').className = 'dark-mode';
    }
  }

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://api-prod.workhorsescs.pro/api/taxes"
      );
      setCities(response.data.data);
      setLoading(false);
    };

    loadCities();
  }, []);

  console.log(cities)

  return (
    <div className="app">
      <div className="level">
        <div>
          <h1 className="title">Dark Mode Challenge</h1>
        </div>

        {/* --The button that should toggle dark mode-- */}
        <button
          className="app__dark-mode-btn icon level-right"
          onClick={handleDarkMode}
        >
          <FontAwesomeIcon color={darkMode ? '#FFA500' : '#000000'} icon={darkMode ? faSun : faMoon} />
        </button>

      </div>

      <div className="columns">
        <div className="column">
          <p>Lollipop powder powder. Cotton candy caramels chupa chups halvah muffin caramels apple pie topping cake. Topping chocolate bar pastry chocolate cake. Cupcake tart jujubes dragée jelly-o icing sugar plum. Chocolate bar lollipop candy canes. Biscuit croissant apple pie pudding caramels wafer tart tootsie roll macaroon. Croissant tiramisu chocolate bar carrot cake lemon drops halvah.</p>
        </div>
        <div className="column">
          <p>Marshmallow tiramisu liquorice bear claw chocolate bar bear claw tart. Muffin chupa chups pie. Brownie apple pie topping lemon drops marzipan toffee. Pudding macaroon icing ice cream bonbon cake tart. Pudding sugar plum chocolate cake cake biscuit pastry pastry chocolate bar tart. Lemon drops dessert gummies icing.</p>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Name" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Email" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Search Zip code"
            onChange={e => {
              setSearchTerm(e.target.value)
            }} />
        </div>
      </div>

      {loading ?
        <h4>Loading ...</h4>
        :
        <div class="select">
          <select>
            {cities
              .filter((value) => {
                if (searchTerm === "") {
                  return '';
                } else if (
                  value.zip_code.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return value;
                } else if (
                  value.city.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return value;
                }
                else if (
                  value.state.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((item) => <option key={item.zip_code}>{item.zip_code}, {item.city}, {item.state}</option>)}
          </select>
        </div>
      }
      <section className="section">
        <div className="buttons level-right">
          <button type="button" className="button is-primary">Save</button>
          <button type="submit" className="button is-link">Submit</button>
        </div>
      </section>
    </div>
  );
}

export default App;
