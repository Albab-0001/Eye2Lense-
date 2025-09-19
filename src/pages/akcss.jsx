/* About Page Styles */
.about-page {
  min-height: 100vh;
  overflow-x: hidden;
}
h1{
  color: black;
}
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
}

/* Section styling */
section {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
  position: relative;
}

.section-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #f5a623, #f59123);
  margin: 1rem auto;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}


/* About.css */
.about-page {
  font-family: 'Inter', sans-serif;
}


.hero-images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 100px);
  gap: 12px;
  max-width: 450px;
  height: 420px;
  position: relative;
}

.bento-card {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: relative;
}

.bento-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.bento-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.bento-card:hover img {
  transform: scale(1.05);
}

/* Grid Item Positioning */
.grid-item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.grid-item-2 {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

.grid-item-3 {
  grid-column: 3 / 4;
  grid-row: 2 / 4;
}

.grid-item-4 {
  grid-column: 1 / 2;
  grid-row: 3 / 5;
}

.grid-item-5 {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}

.grid-item-6 {
  grid-column: 2 / 4;
  grid-row: 4 / 5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-images-grid {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .hero-right-stack {
    flex-direction: row;
    gap: 10px;
    margin-top: 0;
  }
  
  .hero-image-item.large-left {
    width: 250px;
    height: 320px;
  }
  
  .hero-image-item.small-top,
  .hero-image-item.small-bottom {
    width: 140px;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .hero-images-grid {
    width: 100%;
  }
  
  .hero-right-stack {
    flex-direction: column;
    width: 100%;
  }
  
  .hero-image-item.large-left {
    width: 200px;
    height: 260px;
  }
  
  .hero-image-item.small-top,
  .hero-image-item.small-bottom {
    width: 160px;
    height: 140px;
    align-self: center;
  }
} 
/* HERO SECTION */

/* Updated by AK  ...(start)... */

.image-item.top-right {
  width: 380px;
  margin-right: 100px;
  border: 20px solid white;
}
.image-item.middle-right {
  width: 380px;
  /* INCREASE THIS VALUE TO SHIFT IT MORE TO THE RIGHT */
  margin-left: 100px; /* Example: Changed from 20px to 100px */
  border: 20px solid white;
}
.image-item.bottom-right {
  width: 380px;
  margin-right: 115px;
  border: 20px solid white;
}

.hero-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-content {
  margin-right: 40px; /* spacing from the images */
  transform: translateX(-80px); /* small left shift */
}

/* Updated by AK  ...(End)... */


.hero-content h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.hero-btn {
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero-btn.primary {
  background: #f97316; /* orange */
  color: #fff;
}

.hero-btn.primary:hover {
  background: #ea580c;
}

.hero-btn.secondary {
  background: #f3f4f6; /* light gray */
  color: #111;
}

.hero-btn.secondary:hover {
  background: #e5e7eb;
}

/* IMAGE GRID (collage style) */
.hero-images-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 180px;
  gap: 15px;
}

.hero-image-item {
  border-radius: 12px;
  overflow: hidden;
}

.hero-image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Different sizes for collage effect */
.hero-image-item.large {
  grid-column: span 2;
  grid-row: span 2;
}

.hero-image-item.medium {
  grid-column: span 2;
}

.hero-image-item.small {
  grid-row: span 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-hero .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-images-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.hero-container {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 2rem;
}

.hero-images-grid {
  flex: 1;
  min-width: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin-right: 2rem;
}

.hero-image-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1/1;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.hero-image-item:nth-child(3n+1) {
  animation: moveUp1 15s infinite alternate ease-in-out;
}

.hero-image-item:nth-child(3n+2) {
  animation: moveUp2 18s infinite alternate-reverse ease-in-out;
}

.hero-image-item:nth-child(3n+3) {
  animation: moveUp3 20s infinite alternate ease-in-out;
}

.hero-image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hero-image-item:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.image-overlay span {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

@keyframes moveUp1 {
  0% { transform: translateY(0); }
  100% { transform: translateY(-15px); }
}

@keyframes moveUp2 {
  0% { transform: translateY(0); }
  100% { transform: translateY(-20px); }
}

@keyframes moveUp3 {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}


.hero-content {
  flex: 1;
  min-width: 200px;
  z-index: 2;
  padding: 2rem;
  text-align: left;
  color: black;
}

.hero-content h2 {
  font-size: 4.5rem;
  font-weight: 1000;
  margin-bottom: 1.5rem;
 color: #000;
  line-height: 1.2;
  position: relative;
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: black;
  max-width: 600px;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-left: 100px;
  
}

.hero-btn {
  display: inline-block;
  background-color: white;
  color: black;
  border: 2px solid #ddd;
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 15px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.hero-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: transparent;
  z-index: -1;
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.hero-btn:hover::before {
  opacity: 0;
}

.hero-btn.primary {
  background-color: white;
  color: black;
}

.hero-btn.secondary {
  background-color: white;
  color: black;
}

/* Vision Section - New Design */
.vision-section {
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.vision-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.vision-content h2 {
  font-size: 3.5rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  max-width: 90%;
}

.vision-content p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 70%;
}

.vision-button {
  display: inline-block;
  background-color: #fff;
  color: #000;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  border: 2px solid #eee;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.vision-button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: transparent;
  z-index: -1;
  border-radius: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vision-button:hover::before {
  opacity: 0;
}

.vision-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Mission Section */
.mission-section {
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.mission-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 90% 10%, rgba(245, 166, 35, 0.05) 0%, transparent 60%);
  z-index: 0;
}

.mission-section .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  z-index: 1;
}

.mission-content {
  flex: 1;
  min-width: 300px;
  padding-right: 3rem;
}

.mission-content h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  position: relative;
}

.mission-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #f5a623, #f59123);
  margin: 1rem 0 2rem;
  position: relative;
}

.mission-divider::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  background: #fff;
  animation: divider-slide 3s infinite ease-in-out;
}

@keyframes divider-slide {
  0% { left: -20px; width: 20px; }
  50% { left: 60px; width: 20px; }
  100% { left: -20px; width: 20px; }
}

.mission-content p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.mission-image-container {
  flex: 1;
  min-width: 300px;
  position: relative;
  height: 400px;
}

.floating-image {
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.5s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.floating-image:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.floating-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.floating-image:hover::before {
  opacity: 1;
}

.floating-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.floating-image:hover img {
  transform: scale(1.05);
}

.image1 {
  width: 60%;
  height: 70%;
  top: 0;
  left: 0;
  z-index: 2;
  animation: float1 6s ease-in-out infinite;
  border: 5px solid white;
}

.image2 {
  width: 50%;
  height: 60%;
  bottom: 0;
  right: 0;
  z-index: 1;
  animation: float2 8s ease-in-out infinite;
  border: 5px solid white;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(10px) rotate(-1deg); }
}

/* Team Section - Updated Design */
.team-section {
  position: relative;
  padding: 6rem 0;
  background-color: #ffffff;
  overflow: hidden;
}

.team-flex-layout {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
}

.team-content {
  text-align: left;
  max-width: 500px;
  flex: 1;
}

.team-section .section-subtitle {
  font-size: 1rem;
  color: #333;
  text-transform: uppercase;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
}

.team-section .team-heading {
  font-size: 3rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 2rem 0;
  line-height: 1.2;
}

.team-btn-container {
  margin-top: 2rem;
}

.team-btn {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0;
  font-weight: 500;
  transition: all 0.3s ease;
}

.team-btn:hover {
  background-color: #333;
  transform: translateY(-2px);
}

.team-members-container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex: 1;
}

.team-member {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  padding: 1rem 0;
  text-align: left;
}

.member-info h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
}

.member-info h4 {
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  margin: 0;
}

.member-info h4::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #f5a623;
  opacity: 0.5;
}

.member-info p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Values Section */
.values-section {
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.values-section::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(245, 166, 35, 0.05) 0%, transparent 70%);
  border-radius: 50%;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
}

.value-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #f5a623, #f59123);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.value-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(245, 166, 35, 0.05) 0%, transparent 70%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.value-card:hover::before {
  transform: scaleX(1);
}

.value-card:hover::after {
  opacity: 1;
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.value-icon::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(245, 166, 35, 0.1);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  animation: pulse-icon 2s infinite ease-in-out;
}

@keyframes pulse-icon {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.2; }
}

.value-card h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.value-card h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: #f5a623;
  opacity: 0.5;
}

.value-card p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

/* Journey Section */
.journey-section {
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.journey-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMjAgMjBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZjVhNjIzIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+');
  opacity: 0.3;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 3rem auto 0;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: linear-gradient(to bottom, #f5a623, #f59123);
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-line::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #f5a623;
  border-radius: 50%;
  box-shadow: 0 0 0 5px rgba(245, 166, 35, 0.2);
  animation: pulse-timeline 2s infinite;
}

.timeline-line::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #f59123;
  border-radius: 50%;
  box-shadow: 0 0 0 5px rgba(245, 145, 35, 0.2);
  animation: pulse-timeline 2s infinite 1s;
}

@keyframes pulse-timeline {
  0%, 100% { box-shadow: 0 0 0 5px rgba(245, 166, 35, 0.2); }
  50% { box-shadow: 0 0 0 10px rgba(245, 166, 35, 0.1); }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  width: 45%;
  z-index: 2;
}

.timeline-item.left {
  left: 0;
}

.timeline-item.right {
  left: 55%;
}

.timeline-content {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid #f5a623;
  z-index: 3;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.timeline-item.left .timeline-content::before {
  right: -60px;
}

.timeline-item.right .timeline-content::before {
  left: -60px;
}

.timeline-content:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.timeline-content:hover::before {
  transform: scale(1.2);
  background-color: #f5a623;
  border-color: white;
}

.timeline-year {
  display: inline-block;
  background: linear-gradient(to right, #f5a623, #f59123);
  color: white;
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  box-shadow: 0 3px 10px rgba(245, 166, 35, 0.2);
}

.timeline-content h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.8rem;
}

.timeline-content p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

/* CTA Section */
.about-cta {
  background-image: url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  padding: 7rem 0;
  color: white;
  text-align: center;
  overflow: hidden;
}

.about-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.6));
  z-index: 1;
}

.about-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KICAgIDxmZUJsZW5kIG1vZGU9Im92ZXJsYXkiIGluPSJTb3VyY2VHcmFwaGljIj48L2ZlQmxlbmQ+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSI+PC9yZWN0Pgo8L3N2Zz4=');
  opacity: 0.3;
  z-index: 1;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: perspective(1000px) rotateX(0deg);
  transition: transform 0.5s ease;
}

.cta-content:hover {
  transform: perspective(1000px) rotateX(2deg);
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  background: linear-gradient(to right, #ffffff, #f5a623);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%) rotate(45deg);
  transition: transform 0.6s ease;
  z-index: -1;
}

.cta-button:hover::before {
  transform: translateX(100%) rotate(45deg);
}

.cta-button.primary {
  background: linear-gradient(to right, #f5a623, #f59123);
  color: white;
  box-shadow: 0 5px 15px rgba(245, 166, 35, 0.3);
}

.cta-button.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(245, 166, 35, 0.4);
}

.cta-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

/* Responsive Styles */
@media (max-width: 992px) {
  .mission-section .container {
    flex-direction: column;
  }
  
  .mission-content {
    padding-right: 0;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .mission-divider {
    margin: 1rem auto 2rem;
  }
  
  .mission-image-container {
    height: 300px;
    width: 100%;
  }
  
  .timeline-item {
    width: 90%;
    left: 5% !important;
  }
  
  .timeline-line {
    left: 20px;
  }
  
  .timeline-item.left .timeline-content::before,
  .timeline-item.right .timeline-content::before {
    left: -40px;
  }
  
  .cta-content {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  section {
    padding: 4rem 0;
  }
  
  .hero-content {
    padding: 1.5rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .section-header h2,
  .mission-content h2,
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .team-grid,
  .values-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .mission-image-container {
    height: 250px;
  }
  
  .about-cta {
    background-attachment: scroll;
    padding: 5rem 0;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-button {
    width: 100%;
  }
}

@media (max-width: 576px) {
  section {
    padding: 3rem 0;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
 
  
  .team-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-content {
    padding: 1rem;
  }
  
  .timeline-content h3 {
    font-size: 1.1rem;
  }
  
  .mission-image-container {
    height: 200px;
  }
  
  .cta-content {
    padding: 1.5rem;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
  
  .cta-content p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .member-image {
    height: 220px;
  }
  
  .value-card {
    padding: 2rem 1.5rem;
  }
  
  .timeline-item.left .timeline-content::before,
  .timeline-item.right .timeline-content::before {
    display: none;
  }
} 

/* Responsive styles for hero section */
@media (max-width: 1200px) {
  .hero-images-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .hero-content h1 {
    font-size: 3rem;
  }
}

@media (max-width: 992px) {
  .hero-container {
    flex-direction: column-reverse;
  }
  
  .hero-images-grid {
    margin-right: 0;
    margin-top: 3rem;
    width: 100%;
  }
  
  .hero-content {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-content h1 {
    font-size: 2.8rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
    margin: 0 auto 2rem;
  }
}

@media (max-width: 768px) {
  .hero-images-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  
  .hero-image-item:nth-child(9) {
    display: none;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .about-hero {
    padding: 3rem 0;
  }
  
  .hero-buttons {
    flex-direction: column;
    max-width: 250px;
    margin: 2rem auto 0;
  }
}

@media (max-width: 480px) {
  .hero-images-grid {
    grid-template-columns: repeat(1, 1fr);
    max-width: 300px;
    margin: 2rem auto 0;
  }
  
  .hero-image-item:nth-child(n+4) {
    display: none;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .about-hero {
    padding: 2rem 0;
  }
} 

/* Responsive styles for vision section */
@media (max-width: 992px) {
  .vision-content h2 {
    font-size: 2.8rem;
    max-width: 100%;
  }
  
  .vision-content p {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .vision-content h2 {
    font-size: 2.2rem;
  }
  
  .vision-content p {
    font-size: 1.1rem;
  }
  
  .vision-section {
    padding: 4rem 0;
  }
}

@media (max-width: 480px) {
  .vision-content h2 {
    font-size: 1.8rem;
  }
  
  .vision-content p {
    font-size: 1rem;
  }
  
  .vision-section {
    padding: 3rem 0;
  }
} 

/* Our Process Section */
.process-section {
  position: relative;
  overflow: hidden;
  background-color: #000;
  background-image: url('../assets/images/flower.jpeg');
  background-size: cover;
  background-position: center;
}

.process-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.process-header {
  background-color: transparent;
  padding: 5rem 0 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.process-header::before {
  content: none;
}

.process-header h2 {
  color: #fff;
  font-size: 4.2rem;
  font-weight: 300;
  letter-spacing: 6px;
  position: relative;
  z-index: 2;
  margin: 0;
  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* Process Section - Mobile Responsive Improvements */
.process-container {
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.process-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9));
  z-index: 3;
  pointer-events: none;
}

@media (min-width: 1200px) {
  .process-container::after {
    display: none;
  }
}

.process-steps {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 6rem 3.6rem;
  scrollbar-width: none; /* Firefox */
  justify-content: flex-start;
  background-color: #fff;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scroll-behavior: smooth;
  gap: 4.6rem;
}

.process-steps::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.process-step {
  min-width: 220px;
  max-width: 220px;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
}

.process-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 0;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.process-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.process-step:hover .process-image img {
  transform: scale(1.05);
}

.process-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.process-number-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.process-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  line-height: 1;
}

.process-arrow {
  display: inline-block;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  color: #000;
  font-weight: 400;
  line-height: 1;
  font-family: 'Open Sans', sans-serif;
}

.process-step:last-child .process-arrow {
  opacity: 0;
}

.process-content h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.4;
  font-family: 'Open Sans', sans-serif;
}

.process-content p {
  font-size: 0.85rem;
  color: #333;
  line-height: 1.8;
  letter-spacing: 0.5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}

/* Responsive styles for process section */
@media (max-width: 992px) {
  .process-header h2 {
    font-size: 4rem;
  }
  
  .process-steps {
    padding: 2.5rem 1rem;
    justify-content: flex-start;
  }
  
  .process-step {
    min-width: 200px;
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  .process-header h2 {
    font-size: 3rem;
  }
  
  .process-steps {
    padding: 2rem 1rem;
  }
  
  .process-step {
    min-width: 180px;
    max-width: 180px;
  }
  
  .process-image {
    height: 130px;
  }
  
  .process-number {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .process-header {
    padding: 4rem 0 2rem;
  }
  
  .process-header h2 {
    font-size: 2.8rem;
    letter-spacing: 4px;
  }
  
  .process-steps {
    padding: 1.5rem 1rem;
  }
  
  .process-step {
    min-width: 160px;
    max-width: 160px;
  }
  
  .process-image {
    height: 120px;
  }
  
  .process-number {
    font-size: 1.6rem;
  }
  
  .process-content h3 {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }
  
  .process-content p {
    font-size: 0.8rem;
    line-height: 1.6;
  }
} 

/* Why Choose Us Section */
.why-choose-section {
  background: linear-gradient(to right, #ffffff, #e6dfd5); /* White to light beige gradient */
  padding: 5rem 0;
  overflow: hidden;
  position: relative;
}

.why-choose-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 15% 20%, rgba(220, 190, 150, 0.6) 2px, transparent 3px),
    radial-gradient(circle at 35% 75%, rgba(220, 190, 150, 0.6) 2px, transparent 3px),
    radial-gradient(circle at 55% 15%, rgba(220, 190, 150, 0.6) 2px, transparent 3px),
    radial-gradient(circle at 75% 45%, rgba(220, 190, 150, 0.6) 2px, transparent 3px),
    radial-gradient(circle at 90% 85%, rgba(220, 190, 150, 0.6) 2px, transparent 3px),
    radial-gradient(circle at 25% 45%, rgba(220, 190, 150, 0.6) 1px, transparent 2px),
    radial-gradient(circle at 65% 65%, rgba(220, 190, 150, 0.6) 1px, transparent 2px),
    radial-gradient(circle at 80% 25%, rgba(220, 190, 150, 0.6) 1px, transparent 2px),
    radial-gradient(circle at 10% 90%, rgba(220, 190, 150, 0.6) 1px, transparent 2px),
    radial-gradient(circle at 45% 5%, rgba(220, 190, 150, 0.6) 1px, transparent 2px),
    radial-gradient(circle at 95% 35%, rgba(220, 190, 150, 0.6) 1px, transparent 2px);
  opacity: 0.7;
  z-index: 0;
  animation: twinkle 12s infinite alternate ease-in-out;
}

@keyframes twinkle {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.8;
  }
}

.why-choose-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0 2rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.why-choose-content {
  flex: 1;
  padding-right: 4rem;
  min-width: 300px;
  max-width: 600px;
}

.why-choose-content h2 {
  font-size: 1.8rem;
  color: #444; /* Darker text color instead of white */
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  font-family: 'Open Sans', sans-serif;
}

.why-choose-description {
  font-size: 1.5rem;
  line-height: 1.4;
  color: #444;
  margin-bottom: 2.5rem;
  font-weight: 400;
  font-style: italic;
  max-width: 90%;
}

.why-choose-points {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.why-choose-points li {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.why-choose-points li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #444;
  font-size: 1.5rem;
}

.why-choose-images {
  flex: 1;
  min-width: 300px;
  position: relative;
  height: 550px; /* Taller to accommodate the images better */
}

.image-grid {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-item {
  position: absolute;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Lighter shadow */
  border: 8px solid white; /* White border around images */
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.image-item:hover img {
  transform: scale(1.05);
}

.top-right {
  width: 55%;
  height: 42%;
  right: 5%;
  top: 5%;
  z-index: 1;
}

.middle-right {
  width: 48%;
  height: 42%;
  left: 5%;
  top: 33%;
  z-index: 2;
}

.bottom-right {
  width: 50%;
  height: 42%;
  right: 0;
  bottom: 5%;
  z-index: 1;
}

.bottom-right img {
  filter: grayscale(100%) contrast(1.1);
}

/* Responsive styles for Why Choose Us section */
@media (max-width: 992px) {
  .why-choose-container {
    flex-direction: column;
  }
  
  .why-choose-content {
    padding-right: 0;
    margin-bottom: 3rem;
    width: 100%;
    max-width: 100%;
  }
  
  .why-choose-images {
    width: 100%;
    height: 450px;
    min-height: 400px;
  }
  
  .image-grid {
    max-height: 450px;
  }
  
  .why-choose-description {
    font-size: 1.6rem;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .why-choose-section {
    padding: 4rem 0;
  }
  
  .why-choose-content h2 {
    font-size: 2.2rem;
    text-align: center;
  }
  
  .why-choose-description {
    font-size: 1.4rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  
  .why-choose-points {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .why-choose-points li {
    font-size: 1rem;
    text-align: left;
  }
  
  .why-choose-images {
    height: 400px;
  }
  
  .image-grid {
    max-height: 400px;
  }
  
  /* Adjust image positions for better mobile display */
  .top-right {
    width: 45%;
    height: 45%;
    right: 5%;
  }
  
  .middle-right {
    width: 45%;
    height: 45%;
    left: 5%;
  }
  
  .bottom-right {
    width: 45%;
    height: 45%;
    right: 5%;
    bottom: 5%;
  }
}

@media (max-width: 480px) {
  .why-choose-section {
    padding: 3rem 0;
  }
  
  .why-choose-content h2 {
    font-size: 2rem;
  }
  
  .why-choose-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .why-choose-points {
    padding: 0 1rem;
  }
  
  .why-choose-points li {
    font-size: 0.95rem;
    margin-bottom: 0.8rem;
  }
  
  .why-choose-images {
    height: 350px;
    min-height: 350px;
    margin-top: 2rem;
  }
  
  .image-grid {
    max-height: 350px;
  }
  
  /* Stack images vertically for very small screens */
  .image-item {
    position: relative;
    display: block;
    width: 80%;
    height: 100px;
    margin: 0 auto 15px;
    border-width: 5px;
  }
  
  .top-right, .middle-right, .bottom-right {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    width: 80%;
    height: 100px;
    margin: 0 auto 15px;
  }
  
  .image-grid {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 15px 0;
  }
} 

.mobile-scroll-hint {
  display: none;
  text-align: center;
  padding: 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
  font-style: italic;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

@media (max-width: 992px) {
  .mobile-scroll-hint {
    display: block;
  }
} 

/* Mobile responsive process section - vertical layout */
@media (max-width: 768px) {
  .process-steps {
    flex-direction: column;
    overflow-x: hidden;
    padding: 2rem;
    gap: 2rem;
  }
  
  .process-step {
    min-width: 100%;
    max-width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .process-image {
    width: 120px;
    height: 120px;
    margin-bottom: 0;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }
  
  .process-content {
    flex: 1;
  }
  
  .mobile-scroll-hint {
    display: none;
  }
  
  .process-container::after {
    display: none;
  }
}

@media (max-width: 480px) {
  .process-steps {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .process-step {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .process-image {
    width: 100%;
    height: 150px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
} 

@media (max-width: 992px) {
  .team-section .team-heading {
    font-size: 2.5rem;
  }
  
  .team-flex-layout {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .team-flex-layout {
    flex-direction: column;
  }
  
  .team-content {
    text-align: center;
    margin: 0 auto 3rem;
  }

  .team-members-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .team-member {
    flex: 0 0 calc(50% - 1rem);
    margin-bottom: 2rem;
  }
  
  .team-section .team-heading {
    font-size: 2rem;
  }
  
  .member-image {
    height: 250px;
  }
  
  .member-info {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .team-section {
    padding: 4rem 0;
  }
  
  .team-section .team-heading {
    font-size: 1.8rem;
  }
  
  .team-members-container {
    flex-direction: column;
  }
  
  .team-member {
    flex: 0 0 100%;
  }
  
  .member-image {
    height: 300px;
  }
} 

/* Photo Collage Section */
.photo-collage-section {
  padding: 0rem 0;
  background-color: #f0f0f0;
  overflow: hidden;
  position: relative;
  z-index: 1;
  width: 100%;
}

.photo-collage-section .container {
  max-width: 1500px;
  width: 100%;
  padding: 0 15px;
}

.collage-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 150px;
  gap: 12px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}

.collage-item {
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: 100%;
  width: 100%;
}

.collage-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Grid positioning for each item - adjusted to match image layout */
.item1 {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
}

.item2 {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}

.item3 {
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
}

.item4 {
  grid-column: 4 / span 1;
  grid-row: 1 / span 1;
}

.item5 {
  grid-column: 5 / span 2;
  grid-row: 1 / span 2;
}

.item6 {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
}

.item7 {
  grid-column: 2 / span 2;
  grid-row: 2 / span 1;
}

.item8 {
  grid-column: 4 / span 1;
  grid-row: 2 / span 1;
}

.item9 {
  grid-column: 2 / span 3;
  grid-row: 3 / span 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.collage-text {
  text-align: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.collage-text h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.collage-text p {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 5px;
}

.item10 {
  grid-column: 4 / span 2;
  grid-row: 3 / span 1;
}

.item11 {
  grid-column: 6 / span 1;
  grid-row: 2 / span 1;
}

.item12 {
  grid-column: 6 / span 1;
  grid-row: 3 / span 1;
}

.item13 {
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
}

.item14 {
  grid-column: 1 / span 1;
  grid-row: 4 / span 1;
}

.item15 {
  grid-column: 2 / span 2;
  grid-row: 4 / span 1;
}

.item16 {
  grid-column: 4 / span 3;
  grid-row: 4 / span 1;
}

.heart-line {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.heart-line svg {
  width: 80px;
  height: 15px;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .collage-container {
    grid-auto-rows: 130px;
  }
}

@media (max-width: 992px) {
  .photo-collage-section {
    padding: 2.5rem 0;
  }
  
  .collage-container {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 110px;
    gap: 10px;
  }
  
  .item5 {
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
  }
  
  .item9 {
    grid-column: 1 / span 4;
    grid-row: 5 / span 1;
    height: 100px;
  }
  
  .item10 {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
  }
  
  .item11 {
    grid-column: 3 / span 2;
    grid-row: 3 / span 1;
  }
  
  .item12 {
    grid-column: 1 / span 2;
    grid-row: 4 / span 1;
  }
  
  .item13 {
    grid-column: 3 / span 2;
    grid-row: 4 / span 1;
  }
  
  .item14, .item15, .item16 {
    display: none;
  }
  
  .collage-text h2 {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .photo-collage-section {
    padding: 2rem 0;
  }
  
  .collage-container {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 120px;
    gap: 10px;
    max-width: 500px;
    margin: 0 auto;
  }
  
  /* Hide some items on mobile */
  .item3, .item6, .item7, .item11, .item12, .item14, .item15, .item16 {
    display: none;
  }
  
  /* Reposition remaining items */
  .item1 {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }
  
  .item2 {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
  
  .item4 {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  
  .item5 {
    grid-column: 2 / span 1;
    grid-row: 3 / span 1;
  }
  
  .item8 {
    grid-column: 1 / span 1;
    grid-row: 4 / span 1;
  }
  
  .item9 {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    height: auto;
    order: -1;
  }
  
  .item10 {
    grid-column: 2 / span 1;
    grid-row: 4 / span 1;
  }
  
  .item13 {
    grid-column: 1 / span 2;
    grid-row: 5 / span 1;
  }
}

@media (max-width: 576px) {
  .photo-collage-section {
    padding: 1.5rem 0;
  }
  
  .collage-container {
    grid-auto-rows: 100px;
    gap: 8px;
  }
  
  .collage-text h2 {
    font-size: 1rem;
    margin-bottom: 3px;
  }
  
  .collage-text p {
    font-size: 0.7rem;
    margin-bottom: 3px;
  }
  
  .heart-line svg {
    width: 60px;
    height: 12px;
  }
}

@media (max-width: 400px) {
  .collage-container {
    grid-auto-rows: 90px;
    gap: 6px;
  }
  
  /* Further simplify on very small screens */
  .item5, .item13 {
    display: none;
  }
  
  .item8 {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  
  .item10 {
    grid-column: 2 / span 1;
    grid-row: 3 / span 1;
  }
  
  .collage-text h2 {
    font-size: 0.9rem;
  }
  
  .collage-text p {
    font-size: 0.65rem;
  }
} 

@media (max-width: 768px) {
  .item9 {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    height: auto;
    order: -1;
    min-height: 100px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
  
  .collage-text {
    padding: 12px 15px;
  }
}

@media (max-width: 576px) {
  .item9 {
    min-height: 90px;
  }
  
  .collage-text {
    padding: 10px;
  }
  
  .collage-text h2 {
    font-size: 1rem;
    margin-bottom: 3px;
    letter-spacing: 0.5px;
  }
}

@media (max-width: 400px) {
  .item9 {
    min-height: 80px;
  }
  
  .collage-text {
    padding: 8px;
  }
} 