// Mock vendor data for i2lense — Indian cities, names, and INR rates (~₹1,000–2,000/hr, indicative)
const mockVendors = [
  {
    id: 1,
    name: 'Priya Sharma',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 5,
    reviewCount: 48,
    city: 'New Delhi',
    price: 1650,
    specialties: ['Wedding', 'Portrait', 'Fashion'],
    featured: true,
    description:
      'Delhi-based photographer with 10+ years covering weddings and editorials; known for natural light and candid storytelling across NCR.'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=1506&q=80',
    rating: 4.8,
    reviewCount: 36,
    city: 'Bengaluru',
    price: 1800,
    specialties: ['Events', 'Commercial', 'Music Videos'],
    featured: true,
    description:
      'Bengaluru videographer for startups and brands; cinematic event films, product explainers, and artist promos with clean colour grade.'
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    rating: 5,
    reviewCount: 52,
    city: 'Gurugram',
    price: 1150,
    specialties: ['Portrait', 'Family', 'Lifestyle'],
    featured: false,
    description:
      'Gurugram-based; warm family portraits and lifestyle shoots for homes and small businesses in the NCR tech corridor.'
  },
  {
    id: 4,
    name: 'Vikram Krishnan',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    rating: 4.7,
    reviewCount: 29,
    city: 'Hyderabad',
    price: 1700,
    specialties: ['Weddings', 'Corporate', 'Real Estate'],
    featured: false,
    description:
      'Hyderabad filmmaker for wedding highlights, IT park launches, and property walkthroughs; bilingual Telugu–Hindi crews available.'
  },
  {
    id: 5,
    name: 'Rohan Malhotra',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b398ccff?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    rating: 4.9,
    reviewCount: 41,
    city: 'Mumbai',
    price: 1500,
    specialties: ['Travel', 'Architecture', 'Editorial'],
    featured: true,
    description:
      'Mumbai photographer for hospitality and architecture; strong portfolio from Bandra to BKC high-rises and coastal shoots.'
  },
  {
    id: 6,
    name: 'Siddharth Pillai',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80',
    rating: 5,
    reviewCount: 38,
    city: 'Pune',
    price: 1950,
    specialties: ['Documentary', 'Sports', 'Aerial'],
    featured: true,
    description:
      'Pune-based; documentary and sports coverage with licensed drone ops for IT marathons, college fests, and outdoor brands.'
  },
  {
    id: 7,
    name: 'Kavitha Menon',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80',
    rating: 4.8,
    reviewCount: 33,
    city: 'Chennai',
    price: 1100,
    specialties: ['Street', 'Events', 'Product'],
    featured: false,
    description:
      'Chennai creative for expo stalls, SaaS product stills, and vibrant street culture around OMR and ECR events.'
  },
  {
    id: 8,
    name: 'Karan Talwar',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
    rating: 4.6,
    reviewCount: 27,
    city: 'Noida',
    price: 1750,
    specialties: ['Wedding', 'Commercial', 'Corporate Films'],
    featured: false,
    description:
      'Noida studio partner for corporate films, annual days, and wedding teasers; fast turnaround for NCR clients.'
  },
  {
    id: 9,
    name: 'Meera Shah',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 5,
    reviewCount: 46,
    city: 'Ahmedabad',
    price: 1600,
    specialties: ['Fashion', 'Editorial', 'Commercial'],
    featured: true,
    description:
      'Ahmedabad fashion and commercial photographer; textile and jewellery campaigns with studio setup in GIFT City vicinity.'
  },
  {
    id: 10,
    name: 'Aditya Banerjee',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
    rating: 4.7,
    reviewCount: 31,
    city: 'Kolkata',
    price: 1850,
    specialties: ['Corporate', 'Events', 'Product'],
    featured: false,
    description:
      'Kolkata videographer for heritage venues, bank AGMs, and Durga Puja brand films; Bengali and Hindi scripting support.'
  },
  {
    id: 11,
    name: 'Neha Kulkarni',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80',
    rating: 4.9,
    reviewCount: 35,
    city: 'New Delhi',
    price: 1250,
    specialties: ['Portrait', 'Wedding', 'Pre-wedding'],
    featured: false,
    description:
      'South Delhi pre-wedding and intimate wedding specialist; soft pastel edits and same-day social reels add-ons.'
  },
  {
    id: 12,
    name: 'Rahul Ahuja',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
    reviewCount: 28,
    city: 'Gurugram',
    price: 1680,
    specialties: ['Travel', 'Documentary', 'Promotional'],
    featured: false,
    description:
      'Gurugram-based travel and brand stories for fintech and travel apps; on-ground shoots across India with small crew.'
  },
  {
    id: 13,
    name: 'Sanjana Rao',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80',
    rating: 5,
    reviewCount: 44,
    city: 'Bengaluru',
    price: 1900,
    specialties: ['Fine Art', 'Portrait', 'Editorial'],
    featured: true,
    description:
      'Bengaluru editorial photographer; coffee-table books and founder portraits for Koramangala and Indiranagar startups.'
  },
  {
    id: 14,
    name: 'Dev Malhotra',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    rating: 4.7,
    reviewCount: 24,
    city: 'Hyderabad',
    price: 1550,
    specialties: ['Adventure', 'Outdoor', 'Sports'],
    featured: true,
    description:
      'Hyderabad action and outdoor videography for auto and sports brands; monsoon-safe gear for HITEC City events.'
  },
  {
    id: 15,
    name: 'Isha Verma',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80',
    rating: 4.8,
    reviewCount: 30,
    city: 'Mumbai',
    price: 1000,
    specialties: ['Food', 'Product', 'Commercial'],
    featured: false,
    description:
      'Mumbai food and product stills for cloud kitchens and D2C brands; shoots in Lower Parel and Andheri studios.'
  },
  {
    id: 16,
    name: 'Nikhil Sinha',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1618077360395-f6a3b58d3f18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
    rating: 5,
    reviewCount: 26,
    city: 'Pune',
    price: 1720,
    specialties: ['Cinematic', 'Wedding', 'Short Films'],
    featured: false,
    description:
      'Pune wedding cinematographer; emotional same-day edits and cinematic colour for Hinjewadi and Koregaon Park weddings.'
  },
  {
    id: 17,
    name: 'Riya Dutta',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=776&q=80',
    rating: 4.7,
    reviewCount: 22,
    city: 'Chennai',
    price: 1300,
    specialties: ['Maternity', 'Family', 'Kids'],
    featured: false,
    description:
      'Chennai family photographer; maternity, newborn, and annual family albums with home or studio sessions in Velachery.'
  },
  {
    id: 18,
    name: 'Varun Khanna',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    rating: 5,
    reviewCount: 33,
    city: 'Noida',
    price: 2000,
    specialties: ['Luxury', 'Fashion', 'Commercials'],
    featured: true,
    description:
      'Noida high-end fashion and commercial director; lookbooks for designers and TVC-style spots for luxury retail.'
  },
  {
    id: 19,
    name: 'Aishwarya Nair',
    category: 'photography',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    rating: 5,
    reviewCount: 39,
    city: 'Ahmedabad',
    price: 1450,
    specialties: ['Corporate', 'Headshots', 'Events'],
    featured: true,
    description:
      'Ahmedabad corporate headshots and conference coverage for pharma and manufacturing HQs in SG Highway corridor.'
  },
  {
    id: 20,
    name: 'Sameer Desai',
    category: 'videography',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    rating: 4.8,
    reviewCount: 29,
    city: 'Bengaluru',
    price: 1400,
    specialties: ['Music Videos', 'Concerts', 'Artist Promos'],
    featured: false,
    description:
      'Bengaluru indie and classical artist videos; multi-cam live sessions and lyric videos for streaming platforms.'
  }
];

export default mockVendors;
export { mockVendors as mockVendorsOriginal };
