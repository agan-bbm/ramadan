'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <div className="w-6 h-5 flex flex-col justify-between relative">
          <span className={`block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      <div className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="pt-20 px-6">
          <nav className="space-y-4">
            <Link href="/" className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/calendar" className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600 transition-colors">
              Calendar
            </Link>
            <Link href="/tips" className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600 transition-colors">
              Tips & Guidance
            </Link>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 