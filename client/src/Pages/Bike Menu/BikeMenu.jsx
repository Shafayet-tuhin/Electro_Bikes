import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import SingleEbike from '../Shared/Ebikes/SingleEbike';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useBikes from '../../Hooks/useBikes';
import { Helmet } from 'react-helmet-async'


const BikeMenu = () => {
    const [drop, setDrop] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 2700]);
    const [sortOption, setSortOption] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14;

    const [Bikes, loading, refetch] = useBikes()

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePriceChange = (range) => {
        setPriceRange(range);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    let filteredItems = Bikes.filter((item) => {
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
        return matchesCategory && matchesSearch && matchesPrice;
    });


    if (sortOption === 'lowToHigh') {
        filteredItems = filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
        filteredItems = filteredItems.sort((a, b) => b.price - a.price);
    }

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setDrop(value.length > 0);
    };

    const inputSuggestion = (item) => {
        setSearchTerm(item.name);
        setDrop(false);
        navigate(`/bikeSpecs/${item._id}`);
    };

    return (
        <div className="mb-32 lg:mb-40">

            <Helmet>
                <title>Menu Page</title>
            </Helmet>

            <div className="bg-[url('./assets/Menu/banner.png')] w-full lg:mt-8 mb-8 lg:mb-32 bg-cover bg-center flex justify-center items-center h-56 lg:h-96">
                <p className="text-[#23272F] font-semibold text-xl md:text-3xl lg:text-[4rem]">
                    Choose the best <span className="text-[#db8e36]">Ebike</span> for you
                </p>
            </div>


            <p className=" font-semibold text-xl md:text-2xl lg:text-[2.5rem] text-center">
                Browse Our <span className="text-[#14C9C9]">Ebike Collection</span>
            </p>

            <hr className="border-2 mt-4 lg:mt-8 w-1/2 mx-auto" />


            <div className="flex flex-col lg:flex-row gap-8 mt-8 lg:mt-12">

                <div className="lg:w-1/3 w-full">
                    <div className="shadow-lg shadow-slate-500 rounded-lg p-6">

                        <h2 className="text-lg font-semibold mb-4">Sort by Price</h2>
                        <select
                            className="select select-bordered w-full mb-6 font-abc"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="">Select</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>


                        <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === '' && 'bg-black text-white'}`}
                                >
                                    All Bikes
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('folding')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'folding' && 'bg-black text-white'}`}
                                >
                                    Folding Bikes
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('comfort')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'comfort' && 'bg-black text-white'}`}
                                >
                                    Comfort Bikes
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('light trail')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'light trail' && 'bg-black text-white'}`}
                                >
                                    Light Trail Bikes
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('full suspension')}
                                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-slate-300 ${selectedCategory === 'full suspension' && 'bg-black text-white'}`}
                                >
                                    Full Suspension Bikes
                                </button>
                            </li>
                        </ul>


                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
                            <div className="flex justify-between mb-4 font-abc font-extrabold">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <Slider
                                marks={{ 0: '$0', 2700: '$2700' }}
                                range
                                min={0}
                                max={2700}
                                step={10}
                                value={priceRange}
                                onChange={handlePriceChange}
                                allowCross={false}
                                railStyle={{ backgroundColor: '#e4e4e4' }}
                            />
                        </div>
                    </div>
                </div>


                <div className="w-full">

                    <div className="flex justify-center mt-8 relative">
                        <input
                            type="text"
                            placeholder="Search Bikes Here"
                            className=" input input-bordered w-1/2 lg:w-3/4 text-center "
                            value={searchTerm}
                            onChange={handleInputChange}
                            onFocus={() => setDrop(searchTerm.length > 0)}
                            onBlur={() => setTimeout(() => setDrop(false), 100)}
                        />
                        {drop && (
                            <div className="absolute top-full mt-2 w-full lg:w-3/4 z-50 bg-base-100 shadow-lg rounded-lg max-h-60 overflow-y-auto">
                                {Bikes.filter((item) =>
                                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center p-2 cursor-pointer hover:bg-base-300"
                                        onMouseDown={() => inputSuggestion(item)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 lg:w-16 lg:h-16 mr-2 rounded-3xl"
                                        />
                                        <div className="font-abc text-sm lg:text-base">{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-4 lg:mt-12">
                        {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <SingleEbike key={item._id} item={item} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-600">
                                No bikes found.
                            </div>
                        )}
                    </div>


                    <div className="mt-8 lg:mt-12 flex justify-center space-x-2">
                        {pageNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`px-4 py-2 rounded-lg ${pageNumber === currentPage ? 'bg-black text-white' : 'bg-gray-200'}`}
                                onClick={() => handleClick(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeMenu;
