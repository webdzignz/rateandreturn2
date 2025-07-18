import React, { useState, useEffect } from 'react';
import { Phone, Mail, TrendingUp, Shield, BarChart3, PieChart, ChevronRight, Menu, X } from 'lucide-react';
import Logo from './components/Logo';
import LoadingPage from './components/LoadingPage';

interface Bond {
  name: string;
  isin: string;
  rating: string;
  coupon: string;
  maturity: string;
  yield: string;
  description: string;
  currency: string;
  logo: string;
}

const bonds: Bond[] = [
  {
    name: "Deutsche Bank 10%",
    isin: "DE000A30VT97",
    rating: "A-",
    coupon: "Annual",
    maturity: "14/11/2049",
    yield: "10%",
    description: "High-yield EUR-denominated bond from Germany's largest bank.",
    currency: "EUR",
    logo: "/deutsche bank-logo-png.png"
  },
  {
    name: "Barclays 9.625%",
    isin: "US06738ECN31",
    rating: "A",
    coupon: "Quarterly",
    maturity: "22/11/2049",
    yield: "9.625%",
    description: "Strong USD bond with A rating and reliable quarterly payments.",
    currency: "USD",
    logo: "/barclays-logo.png"
  },
  {
    name: "Santander 9.625%",
    isin: "USH05971KAQ22",
    rating: "A",
    coupon: "Quarterly",
    maturity: "21/11/2049",
    yield: "9.625%",
    description: "High-yield USD bond backed by major global bank.",
    currency: "USD",
    logo: "/santander-logo.png"
  },
  {
    name: "UBS 9.016%",
    isin: "USH3698DDW14",
    rating: "A",
    coupon: "Semi-annual",
    maturity: "15/11/2033",
    yield: "9.016%",
    description: "Medium-term fixed income from Swiss institution.",
    currency: "USD",
    logo: "/ubs-logo.png"
  },
  {
    name: "JP Morgan 8.75%",
    isin: "US06423AAJ25",
    rating: "BBB+",
    coupon: "Semi-annual",
    maturity: "01/09/2030",
    yield: "8.75%",
    description: "Global bank-backed fixed return bond, strong yield.",
    currency: "USD",
    logo: "/jpmorgan-logo-png.png"
  }
];

// Brand colors mapping
const bondColors: { [key: string]: string } = {
  "Deutsche Bank 10%": "#0018a8",
  "Barclays 9.625%": "#00aeef",
  "Santander 9.625%": "#ec0000",
  "UBS 9.016%": "#000000",
  "JP Morgan 8.75%": "#005cbd"
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    investmentAmount: '',
    investmentTimeline: ''
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleBondClick = () => {
    scrollToSection('contact');
  };

  // Show loading page while loading
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
              <Logo size="md" showText={true} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-[#002868] px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#002868] transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-700 hover:text-[#002868] px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  Products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#002868] transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-[#002868] px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#002868] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
                Book Consultation
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#002868] p-2 transition-colors duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50 animate-in slide-in-from-top-2 duration-300">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md">
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#002868] hover:bg-gray-50/80 rounded-md transition-all duration-300"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#002868] hover:bg-gray-50/80 rounded-md transition-all duration-300"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#002868] hover:bg-gray-50/80 rounded-md transition-all duration-300"
                >
                  Contact Us
                </button>
                <div className="pt-2">
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Light Blue Separator - Top of Hero */}
      <div className="h-1 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 shadow-sm"></div>

      {/* Hero Section with Full Visible Australian Background */}
      <header className="relative text-white min-h-screen flex items-center overflow-hidden">
        {/* Background Image Container - Full visibility with contain */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/aus image.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.2) contrast(1.1)', // Enhanced clarity
          }}
        />
        
        {/* Gradient Overlay - Covers areas not filled by the contained image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002868]/85 via-[#002868]/75 to-[#002868]/90"></div>
        
        {/* Content Container */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
              {/* Large Logo in Header */}
              <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-500">
                <Logo size="xl" variant="white" showText={true} />
              </div>
              
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl animate-in fade-in-50 slide-in-from-bottom-6 duration-1000 delay-200 leading-tight">
                Your Fixed Term Connection
              </h2>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-blue-100 mb-8 drop-shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-400">
                For Australian Investors
              </h3>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-in fade-in-50 slide-in-from-bottom-2 duration-1000 delay-600 mb-12">
                Connect with regulated partners for high-yield, fixed-term products. 
                Professional guidance for all Australian investors.
              </p>
              
              {/* Call to Action Button */}
              <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-1000 delay-800">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-500 hover:shadow-2xl hover:scale-110 transform inline-flex items-center group"
                >
                  Top 5 Performers
                  <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-white/35 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-2000"></div>
        </div>
      </header>

      {/* Light Blue Separator - Bottom of Hero */}
      <div className="h-1 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 shadow-sm"></div>

      {/* Introduction Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#002868] mb-8 animate-in fade-in-50 slide-in-from-left-6 duration-800">Introduction</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 animate-in fade-in-50 slide-in-from-left-4 duration-800 delay-200">
              For Australian investors looking for a balance of safety and strong returns, bonds 
              have become an increasingly attractive option. This guide explores the 
              top-performing bonds currently on the market, why they are in high demand, and 
              how they compare to other fixed-income investments. If you're considering bonds, 
              understanding their benefits and how they fit into the current investment landscape is 
              crucial.
            </p>

            <h3 className="text-2xl font-bold text-[#002868] mb-6 animate-in fade-in-50 slide-in-from-left-6 duration-800 delay-400">Why Bonds Are in High Demand Right Now</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 animate-in fade-in-50 slide-in-from-left-4 duration-800 delay-600">
              Bonds from major global banks are currently some of the most sought-after 
              fixed-income investments. With interest rates fluctuating, investors are turning to 
              high-quality bonds to secure strong fixed returns. Leading financial analysts from 
              Morningstar, Google Finance, and Yahoo Finance report that these bonds are 
              experiencing significant oversubscription, highlighting their popularity.
            </p>

            <h4 className="text-xl font-semibold text-[#002868] mb-6 animate-in fade-in-50 slide-in-from-left-6 duration-800 delay-800">Key reasons for this demand include:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Stable Returns */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 border border-sky-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1000 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 p-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-[#002868] group-hover:text-blue-700 transition-colors duration-300">Stable Returns</h5>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Bonds offer predictable income through fixed interest payments, providing 
                  investors with reliable cash flow regardless of market volatility.
                </p>
              </div>
              
              {/* Lower Risk */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 border border-sky-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1200 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 p-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-[#002868] group-hover:text-blue-700 transition-colors duration-300">Lower Risk with Bank-Backed Bonds</h5>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Bonds issued by leading banks are considered extremely safe, with many governments 
                  likely to intervene in times of financial distress, providing additional security.
                </p>
              </div>
              
              {/* Price Appreciation */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 border border-sky-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1400 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 p-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-[#002868] group-hover:text-blue-700 transition-colors duration-300">Price Appreciation Potential</h5>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If interest rates fall, the value of these bonds could increase significantly, 
                  leading to substantial capital gains for investors who hold them.
                </p>
              </div>
              
              {/* Diversification */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 border border-sky-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1600 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 p-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-[#002868] group-hover:text-blue-700 transition-colors duration-300">Portfolio Diversification</h5>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Bonds help investors balance risk in their portfolio, especially during stock 
                  market downturns, providing stability when equity markets are volatile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Bond Opportunities Section - MOVED ABOVE TABLE */}
      <section id="products" className="py-16 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-blue-50/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-in fade-in-50 slide-in-from-top-6 duration-800">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002868] mb-4 bg-gradient-to-r from-[#002868] to-blue-700 bg-clip-text text-transparent">
              Top 5 Bond Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carefully selected high-yield bonds from reputable global banks. Click any bond to get personalized information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bonds.map((bond, index) => (
              <div 
                key={index} 
                onClick={handleBondClick}
                className="border border-gray-200/50 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:border-white/30 hover:scale-105 transform group relative overflow-hidden animate-in fade-in-50 slide-in-from-bottom-6 duration-800"
                style={{ 
                  backgroundColor: bondColors[bond.name],
                  animationDelay: `${200 + index * 100}ms` 
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <img 
                        src={bond.logo} 
                        alt={`${bond.name} logo`}
                        className="w-10 h-10 mr-3 object-contain bg-white rounded-lg p-1 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                      />
                      <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">{bond.name}</h3>
                    </div>
                    <span className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300 animate-pulse">{bond.yield}</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-white/80">ISIN:</span>
                      <span className="font-mono text-sm bg-white/20 text-white px-2 py-1 rounded">{bond.isin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Rating:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white shadow-sm">
                        {bond.rating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Coupon:</span>
                      <span className="font-medium text-white">{bond.coupon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Maturity:</span>
                      <span className="font-medium text-white">{bond.maturity}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-sm leading-relaxed mb-4">{bond.description}</p>
                  
                  <div className="text-center">
                    <span className="text-sm text-white font-medium group-hover:text-gray-100 transition-colors duration-300 flex items-center justify-center">
                      Click for more information 
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bond Summary Table - NOW BELOW TOP 5 BONDS */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-in fade-in-50 slide-in-from-top-4 duration-800">
            <h2 className="text-3xl font-bold text-[#002868] mb-4 bg-gradient-to-r from-[#002868] to-blue-700 bg-clip-text text-transparent">Top-Performing Bonds</h2>
            <p className="text-lg text-gray-600">Current high-yield opportunities from major global banks</p>
          </div>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/50 animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#002868] to-blue-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Bond</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Yield</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Currency</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Maturity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {bonds.map((bond, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-300 group">
                      <td className="px-6 py-4 font-medium text-[#002868] group-hover:text-blue-700 transition-colors duration-300 flex items-center">
                        <img 
                          src={bond.logo} 
                          alt={`${bond.name} logo`}
                          className="w-8 h-8 mr-3 object-contain bg-white rounded p-1 shadow-sm"
                        />
                        {bond.name}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-bold text-lg group-hover:text-red-700 transition-colors duration-300">{bond.yield}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          {bond.rating}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{bond.currency}</td>
                      <td className="px-6 py-4 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{bond.maturity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-b from-gray-50/30 to-gray-100/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-transparent to-blue-50/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6 animate-in fade-in-50 zoom-in-50 duration-800">
              <Logo size="lg" showText={false} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002868] mb-6 bg-gradient-to-r from-[#002868] to-blue-700 bg-clip-text text-transparent animate-in fade-in-50 slide-in-from-top-6 duration-800 delay-200">
              About Rate & Return Connection
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-in fade-in-50 slide-in-from-left-4 duration-800 delay-400">
                At Rate & Return Connection, we don't sell investments — we connect you to the right financial partner. As a trusted financial intermediary, our mission is simple: to understand your investment goals and match you with top-tier, regulated providers offering the most competitive fixed-term opportunities in the market.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed animate-in fade-in-50 slide-in-from-right-4 duration-800 delay-600">
                Whether you're seeking consistent income, long-term growth, or low-risk bond exposure, we act as your gateway to smart, secure investing — tailored to your needs, not the market's noise.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center group animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-800">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-4 p-2 shadow-lg group-hover:shadow-xl transition-all duration-500 hover:scale-110 transform">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#002868] mb-2 group-hover:text-blue-700 transition-colors duration-300">Trusted Intermediary</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">We connect you with top-tier, regulated financial partners, not sell you products directly.</p>
                </div>
                <div className="text-center group animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-1000">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-4 p-2 shadow-lg group-hover:shadow-xl transition-all duration-500 hover:scale-110 transform">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#002868] mb-2 group-hover:text-blue-700 transition-colors duration-300">Tailored Matching</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">We understand your goals and match you with the most competitive opportunities.</p>
                </div>
                <div className="text-center group animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-1200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-4 p-2 shadow-lg group-hover:shadow-xl transition-all duration-500 hover:scale-110 transform">
                    <img 
                      src="/rr-logo-new.png" 
                      alt="Rate & Return Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#002868] mb-2 group-hover:text-blue-700 transition-colors duration-300">Smart Gateway</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Your gateway to secure investing, tailored to your needs, not market noise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Talk to Expert Form */}
      <section id="contact" className="py-16 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/20 via-transparent to-gray-50/20"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-in fade-in-50 slide-in-from-top-6 duration-800">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002868] mb-4">
              Talk to an Expert
            </h2>
            <p className="text-xl text-gray-600">
              Get personalized bond recommendations tailored to your investment goals
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#002868] rounded-2xl p-8 shadow-2xl border border-gray-200/50 animate-in fade-in-50 slide-in-from-bottom-8 duration-800 delay-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-in fade-in-50 slide-in-from-left-4 duration-800 delay-400">
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white hover:shadow-md text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="animate-in fade-in-50 slide-in-from-right-4 duration-800 delay-400">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white hover:shadow-md text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="animate-in fade-in-50 slide-in-from-left-4 duration-800 delay-600">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white hover:shadow-md text-gray-900 placeholder-gray-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="animate-in fade-in-50 slide-in-from-right-4 duration-800 delay-600">
                <label htmlFor="investmentAmount" className="block text-sm font-medium text-white mb-2">
                  Investment Amount
                </label>
                <select
                  id="investmentAmount"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white hover:shadow-md text-gray-900"
                  required
                >
                  <option value="">Select amount</option>
                  <option value="50000-100000">$50,000 - $100,000</option>
                  <option value="100000-250000">$100,000 - $250,000</option>
                  <option value="250000-500000">$250,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>

              <div className="md:col-span-2 animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-800">
                <label htmlFor="investmentTimeline" className="block text-sm font-medium text-white mb-2">
                  When do you want to invest?
                </label>
                <select
                  id="investmentTimeline"
                  name="investmentTimeline"
                  value={formData.investmentTimeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white hover:shadow-md text-gray-900"
                  required
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="more-than-month">More than 1 month</option>
                </select>
              </div>
            </div>

            <div className="mt-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1000">
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 inline-flex items-center hover:shadow-2xl hover:scale-105 transform group"
              >
                Talk to an Expert Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="mt-6 text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-800 delay-1200">
              <a
                href="#"
                className="text-white hover:text-blue-300 font-medium inline-flex items-center transition-all duration-300 hover:scale-105 transform group"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Prefer to speak with someone? Schedule a Call →
              </a>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-12 text-center animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-1400">
            <h3 className="text-2xl font-bold text-[#002868] mb-6">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center group hover:scale-105 transform transition-all duration-300">
                <Phone className="w-5 h-5 text-[#002868] mr-3 group-hover:animate-pulse" />
                <div>
                  <p className="font-semibold text-[#002868] group-hover:text-blue-700 transition-colors duration-300">Phone</p>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">1800 BONDS (26637)</p>
                </div>
              </div>
              <div className="flex items-center justify-center group hover:scale-105 transform transition-all duration-300">
                <Mail className="w-5 h-5 text-[#002868] mr-3 group-hover:animate-pulse" />
                <div>
                  <p className="font-semibold text-[#002868] group-hover:text-blue-700 transition-colors duration-300">Email</p>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">info@rateandreturn.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Contact Details and Copyright */}
      <footer className="bg-gradient-to-r from-[#002868] to-blue-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        
        {/* Main Footer Content */}
        <div className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Company Info */}
              <div className="text-center md:text-left animate-in fade-in-50 slide-in-from-bottom-6 duration-800">
                <div className="flex justify-center md:justify-start mb-6 transform hover:scale-105 transition-transform duration-500">
                  <Logo size="lg" variant="white" showText={true} />
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  Your trusted financial intermediary connecting you with top-tier, regulated providers for secure bond investments.
                </p>
              </div>

              {/* Contact Information */}
              <div className="text-center animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-200">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center group hover:scale-105 transform transition-all duration-300">
                    <Phone className="w-5 h-5 text-white mr-3 group-hover:animate-pulse" />
                    <div>
                      <p className="font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Phone</p>
                      <p className="text-blue-100 group-hover:text-white transition-colors duration-300">1800 BONDS (26637)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center group hover:scale-105 transform transition-all duration-300">
                    <Mail className="w-5 h-5 text-white mr-3 group-hover:animate-pulse" />
                    <div>
                      <p className="font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Email</p>
                      <p className="text-blue-100 group-hover:text-white transition-colors duration-300">info@rateandreturn.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center md:text-right animate-in fade-in-50 slide-in-from-bottom-6 duration-800 delay-400">
                <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
                <div className="space-y-3">
                  <div>
                    <button
                      onClick={() => scrollToSection('about')}
                      className="block w-full md:w-auto text-blue-100 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                    >
                      About Us
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => scrollToSection('products')}
                      className="block w-full md:w-auto text-blue-100 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                    >
                      Bond Products
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="block w-full md:w-auto text-blue-100 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with White Background - Full Width */}
        <div className="bg-white w-full animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-700 text-sm">
                  © {new Date().getFullYear()} Rate & Return Connection. All rights reserved.
                </p>
              </div>

              {/* Additional Legal Info */}
              <div className="text-center md:text-right">
                <p className="text-gray-700 text-sm">
                  Australian Financial Services | AFSL Authorized Representative
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-800 delay-800">
              <p className="text-gray-700 text-sm max-w-4xl mx-auto leading-relaxed">
                <strong>Disclaimer:</strong> This guide is for informational purposes only and does not constitute financial advice. 
                Bond investments carry risks including potential loss of principal. Past performance does not guarantee future results. 
                Please consult a licensed financial adviser before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;