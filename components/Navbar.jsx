import React from 'react'
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-[#1a2350] to-[#121938] text-white p-6 shadow-lg">
    <div className="container mx-auto flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sun className="w-8 h-8 mr-3" />
      </motion.div>
      <h1 className="text-3xl font-bold">WeatherNow</h1>
    </div>
  </header>
  )
}

export default Navbar