'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Burger Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="burger-button"
      >
        <div className="burger-icon">
          <span className={`burger-line ${isOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isOpen ? 'open' : ''}`} />
        </div>
      </button>

      {/* Navigation Menu */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <div className="nav-content">
          <nav className="nav-links">
            <Link 
              href="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t.menu.home}
            </Link>
            <Link 
              href="/calendar" 
              className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t.menu.calendar}
            </Link>
            <Link 
              href="/tips" 
              className={`nav-link ${isActive('/tips') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t.menu.tips}
            </Link>
          </nav>

          <div className="nav-footer">
            <div className="ramadan-info">
              <div className="ramadan-label">
                {t.ramadan}
              </div>
              <div className="ramadan-year">
                {t.year}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="nav-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 