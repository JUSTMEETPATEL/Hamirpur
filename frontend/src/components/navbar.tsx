"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <div className="flex items-center">
          <Image
            src="/pics/logo.png"
            alt="NIT Hamirpur Logo"
            width={40}
            height={40}
            className="mr-3"
          />
          <span className="text-lg font-bold text-black">NIT Hamirpur</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <button onClick={() => scrollToSection("hero")} className="text-black hover:text-gray-600 transition-colors">
            Home
          </button>
          <button
            onClick={() => scrollToSection("about-project")}
            className="text-black hover:text-gray-600 transition-colors"
          >
            About Project
          </button>
          <button
            onClick={() => scrollToSection("about-nith")}
            className="text-black hover:text-gray-600 transition-colors"
          >
            About NITH
          </button>
          <button
            onClick={() => scrollToSection("about-mamta")}
            className="text-black hover:text-gray-600 transition-colors"
          >
            About Mamta Awasthi
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container px-4 py-3 mx-auto space-y-2">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about-project")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              Project
            </button>
            <button
              onClick={() => scrollToSection("about-nith")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              About NITH
            </button>
            <button
              onClick={() => scrollToSection("about-mamta")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              About Mamta Awasthi
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

