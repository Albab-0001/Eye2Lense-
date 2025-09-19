import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSearch, FaMapMarkerAlt, FaStar, FaFilter, FaCamera, FaVideo, 
  FaArrowRight, FaChevronDown, FaChevronUp, FaSort, FaArrowUp,
  FaSortAmountDown, FaSortAmountUpAlt, FaLocationArrow, FaDollarSign
} from 'react-icons/fa';
import '../styles/ServicesPage.css';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ServicesPage = () => {
  const location = useLocation();
  const isPhotographyPage = location.pathname === '/services/photography';
  const selectedCategory = isPhotographyPage ? 'photography' : 'videography';
  
  // State variables
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const vendorsPerPage = 6;


  // Mock data for vendors
  const mockVendors = [
    {
      id: 1,
      name: 'Emily Johnson',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      rating: 5,
      reviewCount: 48,
      city: 'New York',
      price: 350,
      specialties: ['Wedding', 'Portrait', 'Fashion'],
      featured: true,
      description: 'Award-winning photographer with over 10 years of experience specializing in capturing timeless moments with a blend of artistic vision and technical excellence.'
    },
    {
      id: 2,
      name: 'Michael Davis',
      category: 'videography',
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80',
      rating: 4.8,
      reviewCount: 32,
      city: 'Los Angeles',
      price: 500,
      specialties: ['Events', 'Commercial', 'Music Videos'],
      featured: true,
      description: 'Cinematic videographer with a creative eye for detail, known for dynamic storytelling through the lens of film and commercial productions.'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1533973860717-d49dfd14cf64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      rating: 5,
      reviewCount: 56,
      city: 'Chicago',
      price: 280,
      specialties: ['Portrait', 'Family', 'Newborn'],
      featured: false,
      description: 'Passionate photographer specializing in authentic portraiture that celebrates the genuine beauty of connections and milestones in life.'
    },
    {
      id: 4,
      name: 'David Wilson',
      category: 'videography',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      rating: 4.7,
      reviewCount: 29,
      city: 'Miami',
      price: 450,
      specialties: ['Weddings', 'Corporate', 'Real Estate'],
      featured: false,
      description: 'Cinematic storyteller who transforms ordinary events into extraordinary films with a perfect blend of technical skill and artistic vision.'
    },
    {
      id: 5,
      name: 'Jessica Brown',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b398ccff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      rating: 4.9,
      reviewCount: 42,
      city: 'San Francisco',
      price: 320,
      specialties: ['Landscape', 'Travel', 'Architecture'],
      featured: true,
      description: 'Fine art photographer with a unique perspective, capturing the breathtaking beauty of landscapes and architectural masterpieces around the world.'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      category: 'videography',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
      rating: 5,
      reviewCount: 38,
      city: 'Austin',
      price: 600,
      specialties: ['Documentary', 'Sports', 'Aerial'],
      featured: true,
      description: 'Award-winning videographer specializing in documentary-style storytelling with a focus on sports and breathtaking aerial cinematography.'
    },
    {
      id: 7,
      name: 'Amanda Lee',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      rating: 4.8,
      reviewCount: 31,
      city: 'New York',
      price: 290,
      specialties: ['Street', 'Events', 'Product'],
      featured: false,
      description: 'Versatile photographer with a keen eye for capturing the pulse of urban life, memorable events, and stunning product compositions.'
    },
    {
      id: 8,
      name: 'James Wilson',
      category: 'videography',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: 4.6,
      reviewCount: 26,
      city: 'Chicago',
      price: 400,
      specialties: ['Wedding', 'Commercial', 'Music Videos'],
      featured: false,
      description: 'Creative videographer with a passion for storytelling through cinematic wedding films, impactful commercials, and visually stunning music videos.'
    },
    {
      id: 9,
      name: 'Sophia Garcia',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      rating: 5,
      reviewCount: 47,
      city: 'Los Angeles',
      price: 380,
      specialties: ['Fashion', 'Editorial', 'Commercial'],
      featured: true,
      description: 'Renowned fashion photographer whose work has been featured in top magazines, creating editorial masterpieces and compelling commercial campaigns.'
    },
    {
      id: 10,
      name: 'Daniel Kim',
      category: 'videography',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      rating: 4.7,
      reviewCount: 33,
      city: 'San Francisco',
      price: 550,
      specialties: ['Corporate', 'Events', 'Product'],
      featured: false,
      description: 'Innovative videographer specializing in creating polished corporate content, dynamic event coverage, and stunning product showcases with cinematic flair.'
    },
    {
      id: 11,
      name: 'Olivia Thompson',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1528575950036-63c4853d3f6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=701&q=80',
      rating: 4.9,
      reviewCount: 36,
      city: 'Austin',
      price: 310,
      specialties: ['Portrait', 'Wedding', 'Events'],
      featured: false,
      description: 'Renowned photographer who captures authentic moments with a natural and timeless style, creating heartfelt portraits and wedding memories.'
    },
    {
      id: 12,
      name: 'Thomas Wright',
      category: 'videography',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      reviewCount: 28,
      city: 'Miami',
      price: 480,
      specialties: ['Travel', 'Documentary', 'Promotional'],
      featured: false,
      description: 'Award-winning videographer with a focus on immersive travel documentaries and promotional videos that captivate audiences with compelling storytelling.'
    },
    {
      id: 13,
      name: 'Emma Rodriguez',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      rating: 5,
      reviewCount: 47,
      city: 'Los Angeles',
      price: 380,
      specialties: ['Fashion', 'Editorial', 'Commercial'],
      featured: true,
      description: 'Renowned fashion photographer whose work has been featured in top magazines, creating editorial masterpieces and compelling commercial campaigns.'
    },
  ];

  // Get unique cities from vendors
  const cities = [...new Set(mockVendors.filter(v => v.category === selectedCategory).map(vendor => vendor.city))];

  // Price ranges with clear labels
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 1000 },
    { label: 'Under $300', min: 0, max: 300 },
    { label: '$300 - $500', min: 300, max: 500 },
    { label: 'Over $500', min: 500, max: 1000 }
  ];

  // Initialize vendors based on category
  useEffect(() => {
    const categoryVendors = mockVendors.filter(v => v.category === selectedCategory);
    setVendors(categoryVendors);
    setFilteredVendors(categoryVendors); // Initialize filtered vendors
    setIsLoading(false);
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  // Filter vendors based on all criteria
  useEffect(() => {
    let results = [...vendors];
    
    // Apply city filter
    if (selectedCity) {
      results = results.filter(vendor => vendor.city === selectedCity);
    }
    
    // Apply price range filter
    results = results.filter(vendor => 
      vendor.price >= priceRange.min && vendor.price <= priceRange.max
    );
    
    // Apply search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(vendor => 
        vendor.name.toLowerCase().includes(term) ||
        vendor.description.toLowerCase().includes(term) ||
        vendor.specialties.some(specialty => specialty.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'lowToHigh':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        results.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting (featured first, then by rating)
        results.sort((a, b) => {
          if (a.featured !== b.featured) return b.featured ? 1 : -1;
          return b.rating - a.rating;
        });
    }
    
    setFilteredVendors(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [vendors, selectedCity, priceRange, searchTerm, sortOrder]);

  // Calculate pagination
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city === selectedCity ? '' : city);
  };

  // Handle price range selection
  const handlePriceRangeSelect = (range) => {
    setPriceRange(prevRange => 
      prevRange.min === range.min && prevRange.max === range.max
        ? { min: 0, max: 1000 } // Reset to all prices if clicking the same range
        : range
    );
  };

  // Handle sort order
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setPriceRange({ min: 0, max: 1000 });
    setSortOrder('default');
    setCurrentPage(1);
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add renderPagination function
  const renderPagination = () => {
    if (filteredVendors.length <= vendorsPerPage) return null;

    return (
      <div className="pagination">
        <button 
          className={`pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              className={`page-number ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
        </div>
        
        <button 
          className={`pagination-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={`services-page ${isPhotographyPage ? 'photography-page' : 'videography-page'}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>{isPhotographyPage ? 'Find Your Perfect Photographer' : 'Find Your Perfect Videographer'}</h1>
            <p>{isPhotographyPage ? 
              'Connect with professional photographers to capture your special moments' : 
              'Expert videographers who bring your stories to life with cinematic excellence'
            }</p>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <motion.section 
        className="search-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container">
          <div className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
              placeholder={`Search for ${selectedCategory} services or professionals...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">Search</button>
            </div>
          </div>
      </motion.section>

      {/* Category Navigation */}
      <motion.section 
        className="category-filter"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container">
          <div className="category-tabs">
            <Link 
              to="/services/photography" 
              className={`category-tab photography ${isPhotographyPage ? 'active' : ''}`}
            >
              <span className="category-tab-icon"><FaCamera /></span>
              <span className="category-tab-text">Photography</span>
            </Link>
            <Link 
              to="/services/videography" 
              className={`category-tab videography ${!isPhotographyPage ? 'active' : ''}`}
            >
              <span className="category-tab-icon"><FaVideo /></span>
              <span className="category-tab-text">Videography</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Vendors Section */}
      <motion.section 
        className="vendors-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container">
          {/* Filters */}
          <div className="filter-groups">
                  <div className="filter-group">
              <h3>
                <FaMapMarkerAlt className="filter-icon" />
                Available in Your City
              </h3>
                    <div className="city-filters">
                      {cities.map((city, index) => (
                        <button
                          key={index}
                          className={`city-filter ${selectedCity === city ? 'active' : ''}`}
                          onClick={() => handleCitySelect(city)}
                        >
                    <FaLocationArrow className="city-icon" /> {city}
                        </button>
                      ))}
                    </div>
                  </div>

            {/* Price Filter */}
                  <div className="filter-group">
              <h3>
                <FaSortAmountDown className="filter-icon" />
                Budget Range
              </h3>
                    <div className="price-filters">
                {[
                  { label: 'All Prices', min: 0, max: 1000 },
                  { label: 'Under $300', min: 0, max: 300 },
                  { label: '$300 - $500', min: 300, max: 500 },
                  { label: 'Over $500', min: 500, max: 1000 }
                ].map((range, index) => (
                        <button
                          key={index}
                    className={`price-filter ${
                      priceRange.min === range.min && priceRange.max === range.max ? 'active' : ''
                    }`}
                          onClick={() => handlePriceRangeSelect(range)}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

          {/* Vendors Display */}
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
              <p>Finding the best {selectedCategory} professionals for you...</p>
              </div>
          ) : filteredVendors.length === 0 ? (
              <div className="no-results">
              <h3>No {selectedCategory} professionals match your criteria</h3>
                <p>Try adjusting your filters or search terms</p>
                <button className="reset-filters-btn" onClick={resetFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
            <div className="vendors-content">
              <div className="category-header">
                <h2 className={isPhotographyPage ? 'photography-header' : 'videography-header'}>
                  {isPhotographyPage ? 'Professional Photographers' : 'Professional Videographers'}
                </h2>
                <p className="category-description">
                  {isPhotographyPage 
                    ? 'Browse our selection of talented photographers ready to capture your special moments.' 
                    : 'Discover skilled videographers who can bring your vision to life with cinematic excellence.'}
                </p>
              </div>
              
              <div className="vendors-grid">
                {currentVendors.map((vendor) => (
                  <motion.div 
                    key={vendor.id}
                    className={`vendor-card ${vendor.category}-card`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="vendor-card-container">
                      <div className="vendor-image">
                        <img src={vendor.image} alt={vendor.name} />
                        {vendor.featured && <span className="featured-badge">Featured</span>}
                      </div>
                      <div className="vendor-info">
                        <h3>{vendor.name}</h3>
                        <div className="vendor-meta">
                          <div className="vendor-rating">
                            <FaStar className="star-icon" />
                            <span>{vendor.rating.toFixed(1)}</span>
                            <span className="review-count">({vendor.reviewCount})</span>
                          </div>
                          <div className="vendor-location">
                            <FaMapMarkerAlt className="location-icon" />
                            <span>{vendor.city}</span>
                          </div>
                        </div>
                        <div className="vendor-price">
                          <FaDollarSign className="price-icon" />
                          <span>${vendor.price}/hr</span>
                        </div>
                        <div className="vendor-specialties">
                          {vendor.specialties.slice(0, 3).map((specialty, index) => (
                            <span key={index} className="specialty-tag">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <p className="vendor-description">{vendor.description.substring(0, 120)}...</p>
                        <Link to={`/services/vendor/${vendor.id}`} className="view-details-btn">
                          View Details <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced pagination display */}
              {filteredVendors.length > vendorsPerPage && (
                <div className="pagination-container">
                  <p className="pagination-info">
                    Showing {indexOfFirstVendor + 1}-{Math.min(indexOfLastVendor, filteredVendors.length)} of {filteredVendors.length} {selectedCategory} professionals
                  </p>
                  {renderPagination()}
                </div>
              )}
            </div>
            )}
          </div>
        </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="cta-floating-element"></div>
        <div className="cta-floating-element"></div>
        <div className="cta-floating-element"></div>
        
        <div className="container">
          <motion.div 
            className="cta-content"
            variants={staggerContainer}
          >
            <motion.h2 variants={itemVariant}>
              Ready to Share Your Creative Vision?
            </motion.h2>
            <motion.p variants={itemVariant}>
              Join our community of talented professionals and connect with clients who value your expertise. 
              Showcase your portfolio, set your own rates, and grow your creative business.
            </motion.p>
            <motion.div 
              className="cta-buttons"
              variants={itemVariant}
            >
              <Link to="/join-as-vendor" className="cta-button primary">
                Start Creating <FaArrowRight />
              </Link>
              <Link to="/how-it-works" className="cta-button secondary">
                Learn More <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Scroll to top indicator */}
      <div className="scroll-indicator" onClick={scrollToTop}>
        <FaArrowUp className="scroll-indicator-icon" />
      </div>
    </div>
  );
};

export default ServicesPage;
