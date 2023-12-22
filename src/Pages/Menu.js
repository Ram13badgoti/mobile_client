
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mobileimg from '../images/mobile9.jpeg'

const Menu = ({ addToCart }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    price: '',
    name: '',
    type: '',
    processor: '',
    memory: '',
    os: '',
  });

  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    fetchData();
  }, [pagination]);

  useEffect(() => {
    // Apply filters when applyFiltersFlag is true
    if (applyFiltersFlag) {
      fetchData()
      setApplyFiltersFlag(false); // Reset the flag
    }
  }, [applyFiltersFlag]);

  const fetchData = async () => {
    try {
      const queryParams = Object.keys(selectedFilters)
        .map((filterType) => {
          if (selectedFilters[filterType]) {
            return `${filterType}=${selectedFilters[filterType]}`;
          }
          return null;
        })
        .filter(Boolean)
        .join('&');
      const endpoint = 'https://mobile-server-73pi.onrender.com/api/mobiles';
      const paginationParams = `page=${pagination.page}&limit=${pagination.limit}`;
      const response = await axios.get(`${endpoint}?${queryParams}&${paginationParams}`);
      const fetchedData = response.data;
      console.log("a",)
      setMenu(fetchedData)
      setFilteredMenu(fetchedData); // Initialize filteredMenu with fetched items
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
  };



  const handleApplyFilters = () => {
    // Set the flag to apply filters
    setApplyFiltersFlag(true);
  };


  const handleKeyPress = (event) => {
    // Apply filters when Enter key is pressed
    if (event.key === 'Enter') {
      setApplyFiltersFlag(true);
    }
  };
  return (
    <div className="menu">
      <div className="filter-options">
        <div className="fields">
          <label className="name">
            Name:
          </label>
          <input
            type="text"
            className="textfield"
            placeholder="Search by name"
            value={selectedFilters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="fields">
          <label className="name">
            Price:
          </label>
          <input
            className="textfield"
            type="text"
            placeholder="Search by price"
            value={selectedFilters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="fields">
          <label className="name">
            Type:
          </label>
          <input
            className="textfield"
            type="text"
            placeholder="Search by type"
            value={selectedFilters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="fields">
          <label className="name">
            Processor:
          </label>
          <input
            className="textfield"
            type="text"
            placeholder="Search by processor"
            value={selectedFilters.processor}
            onChange={(e) => handleFilterChange('processor', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="fields">
          <label className="name">
            Memory:
          </label>
          <input
            className="textfield"
            type="text"
            placeholder="Search by memory"
            value={selectedFilters.memory}
            onChange={(e) => handleFilterChange('memory', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="fields">
          <label className="name">
            OS:
          </label>
          <input
            className="textfield"
            type="text"
            placeholder="Search by os"
            value={selectedFilters.os}
            onChange={(e) => handleFilterChange('os', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>


        <button className='filterBtn' style={{backgroundColor:"white",color:"black"}} onClick={handleApplyFilters}><span style={{fontWeight:"900"}}>Apply Filters</span></button>
      </div>
      <div className="menu-items">
        {filteredMenu.map((item) => (
          <div  key={item.id} className="menu-item" >
            
            <img className="mobile-image" src={item.img} alt="mobile" />
            <div className="description">
              <h3 className="mobile-heading">{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Type: {item.type}</p>
              <p>Processor: {item.processor}</p>
              <p>Memory: {item.memory}</p>
              <p>OS: {item.os}</p>
            <button style={{width:'80%'}} onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}

      </div>
    </div>

  );
};

export default Menu;
