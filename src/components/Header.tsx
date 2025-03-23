import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, FileText, FolderTree, BarChart2, FileCode } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Map className="text-[var(--accent)] mr-2" size={28} />
            <h1 className="text-xl font-bold text-[var(--primary)] dark:text-white">
              DZ Academy - Big Grampa
            </h1>
          </div>
          
          <div className="flex items-center">
            <nav className="flex flex-wrap gap-2 mr-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
                end
              >
                <div className="flex items-center">
                  <FileText size={16} className="mr-1" />
                  <span>Guide</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/generator" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FileCode size={16} className="mr-1" />
                  <span>Generator</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/file-checker" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FileText size={16} className="mr-1" />
                  <span>File Checker</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/folder-structure" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FolderTree size={16} className="mr-1" />
                  <span>Folder Structure</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/my-progress" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <BarChart2 size={16} className="mr-1" />
                  <span>My Progress</span>
                </div>
              </NavLink>
            </nav>
            
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
