import React from 'react'
import LoginError from '../components/LoginError'
import { useSelector } from 'react-redux'
import LoginLoading from '../components/LoginLoading'
import { Link } from 'react-router-dom'
import { FaQuoteRight, FaUserShield, FaChartLine, FaBrain, FaBook, FaCalendarCheck, FaHeart, FaLock, FaArrowRight, FaChild, FaStar, FaMobileAlt, FaUsers, FaShieldAlt, FaRocket, FaComments, FaAward, FaFileInvoiceDollar, FaRobot, FaChartBar, FaMoneyBillWave, FaBuilding } from 'react-icons/fa'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  initial: {
    opacity: 0,
    x: 60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const LandingPage = () => {
  const { currentUser, loginLoading, loginError } = useSelector(state => state.user)
  if (loginError) {
    return <LoginError />
  }
  if (loginLoading) {
    return <LoginLoading />
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-pink-50 opacity-70"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaFileInvoiceDollar className="text-blue-600 text-3xl" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Smart Invoice Manager
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-50 rounded-full filter blur-3xl opacity-50"></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Smart Invoice
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Manager
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                AI-powered financial management tool that automates invoice tracking, expense management, and fraud detection.
                Streamline your business operations with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 group"
                >
                  Start Monitoring
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 font-medium border border-gray-200 hover:border-blue-200 hover:text-blue-600"
                >
                  Learn More
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <FaBuilding className="text-blue-400 mr-1" />
                  <span>10k+ Businesses Trust Us</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative lg:ml-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-pink-600/10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                alt="Financial dashboard and analytics"
                className="relative rounded-2xl shadow-2xl w-full object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{ height: '500px' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        id="features"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Features</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Everything you need for financial management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and features designed to streamline your invoice processing and financial operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Automated Invoice Processing */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <FaRobot className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Processing</h3>
              <p className="text-gray-600">
                Automatically extract and process invoice data using AI, reducing manual entry and errors.
              </p>
            </motion.div>

            {/* Fraud Detection */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fraud Detection</h3>
              <p className="text-gray-600">
                AI-powered fraud detection system that identifies suspicious patterns and anomalies.
              </p>
            </motion.div>

            {/* Financial Analytics */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <FaChartBar className="text-pink-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Financial Analytics</h3>
              <p className="text-gray-600">
                Comprehensive financial reporting and analytics with actionable insights.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what finance leaders are saying about their experience with Smart Invoice Manager.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CFO, Tech Corp",
                content: "Smart Invoice Manager has revolutionized our financial operations. The AI-powered fraud detection has saved us from multiple suspicious transactions.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
              },
              {
                name: "Michael Chen",
                role: "Finance Director",
                content: "The automated invoice processing has cut our processing time by 75%. The accuracy is impressive and it's incredibly easy to use.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
              },
              {
                name: "Emily Rodriguez",
                role: "Accounting Manager",
                content: "The financial analytics and reporting features provide invaluable insights for our business decisions. It's a game-changer.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white rounded-2xl shadow-lg p-8 relative"
              >
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-blue-100 rounded-full p-3">
                    <FaQuoteRight className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Our Impact</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Making a Difference in Business Finance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how Smart Invoice Manager is transforming financial operations for businesses worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaBuilding, label: "Active Businesses", value: "50,000+" },
              { icon: FaFileInvoiceDollar, label: "Invoices Processed", value: "1M+" },
              { icon: FaMoneyBillWave, label: "Money Saved", value: "$500M+" },
              { icon: FaRobot, label: "AI Predictions", value: "10M+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-blue-600 text-2xl" />
                </div>
                <div className="font-bold text-3xl text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-blue-50 to-blue-100/50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInLeft} className="space-y-6">
              <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Security First</span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Enterprise-Grade Security for Your Financial Data
              </h2>
              <p className="text-lg text-gray-600">
                We implement the highest standards of security to protect your sensitive financial information and ensure compliance with industry regulations.
              </p>
              <div className="space-y-4">
                {[
                  { icon: FaShieldAlt, title: "End-to-End Encryption", desc: "All financial data is encrypted at rest and in transit" },
                  { icon: FaLock, title: "Secure Authentication", desc: "Multi-factor authentication and role-based access control" },
                  { icon: FaUserShield, title: "Compliance Ready", desc: "Built to meet SOC 2, GDPR, and other regulatory requirements" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <feature.icon className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80"
                alt="Data security and protection"
                className="relative rounded-2xl shadow-2xl w-full object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{ height: '500px' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Support Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Support</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              We're Here to Help
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get the support you need, when you need it. Our team is available 24/7 to assist you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaComments,
                title: "24/7 Chat Support",
                desc: "Get instant help from our support team anytime, anywhere."
              },
              {
                icon: FaBook,
                title: "Knowledge Base",
                desc: "Access our comprehensive guides and documentation."
              },
              {
                icon: FaRocket,
                title: "Quick Start Guide",
                desc: "Get up and running quickly with our easy-to-follow guide."
              }
            ].map((support, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <support.icon className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{support.title}</h3>
                <p className="text-gray-600">{support.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Journal Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-pink-600/10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&q=80"
                alt="Child development"
                className="relative rounded-2xl shadow-2xl w-full object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{ height: '400px' }}
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="space-y-6"
            >
              <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Smart Processing</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Intelligent Invoice Management
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Leverage AI-powered tools to automate invoice processing, detect fraud, and gain actionable financial insights.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaRobot className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Automated Processing</h4>
                    <p className="text-gray-600">Extract and validate invoice data automatically</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShieldAlt className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fraud Prevention</h4>
                    <p className="text-gray-600">Detect suspicious patterns and anomalies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <FaChartBar className="text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Financial Insights</h4>
                    <p className="text-gray-600">Get AI-powered financial analytics and reports</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile App Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Mobile Access</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Manage Finances On The Go
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access your financial dashboard, process invoices, and track expenses from anywhere with our mobile app.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Transform Your Financial Operations Today
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using Smart Invoice Manager to automate their financial processes and prevent fraud.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 font-medium shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 group"
              >
                Get Started Free
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <FaFileInvoiceDollar className="text-blue-600 text-2xl" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Smart Invoice Manager
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <p className="text-gray-500">© 2024 Smart Invoice Manager. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default LandingPage