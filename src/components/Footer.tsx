import React from 'react';
import { DollarSign, Users, MessageCircle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--primary)] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} DZ Academy - DayZ Map Builder Guide
            </p>
            <p className="text-xs text-gray-300 mt-1">
              A comprehensive guide to creating custom maps for DayZ by Big Grampa
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-3 md:space-y-0 md:flex-row md:space-x-4">
            <a 
              href="https://streamlabs.com/biggrampa" 
              className="text-gray-300 hover:text-white transition-colors flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DollarSign size={18} className="mr-1" />
              <span>Tip Page</span>
            </a>
            
            <a 
              href="https://www.patreon.com/dayz_tutorial" 
              className="text-gray-300 hover:text-white transition-colors flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Users size={18} className="mr-1" />
              <span>Patreon</span>
            </a>
            
            <a 
              href="https://discord.gg/F7ctZX7" 
              className="text-gray-300 hover:text-white transition-colors flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} className="mr-1" />
              <span>Join Discord</span>
            </a>
            
            <div className="flex items-center text-sm">
              <span className="mr-1">Made with</span>
              <Heart size={16} className="text-[var(--accent)] mx-1" />
              <span>for the DayZ community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
