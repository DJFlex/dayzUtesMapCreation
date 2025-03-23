import React from 'react';
import { Link } from 'react-router-dom';
import { Step } from '../types';
import { Map, FileDown, Code, Package, Server, TestTube } from 'lucide-react';

interface StepCardProps {
  step: Step;
  completed: boolean;
  onToggleComplete: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, completed, onToggleComplete }) => {
  const getIcon = () => {
    switch (step.icon) {
      case 'Map':
        return <Map className="w-5 h-5" />;
      case 'Tool':
        // Use a different icon since Tool is not available
        return <Code className="w-5 h-5" />;
      case 'FileDown':
        return <FileDown className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Package':
        return <Package className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'TestTube':
        return <TestTube className="w-5 h-5" />;
      default:
        return <Map className="w-5 h-5" />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg ${
      completed ? 'border-l-4 border-green-500' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] bg-opacity-10 flex items-center justify-center mr-3 text-[var(--accent)]">
              {getIcon()}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{step.title}</h3>
          </div>
          <div className="ml-4">
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggleComplete}
              className="w-5 h-5 accent-[var(--accent)] cursor-pointer"
            />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {step.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Link
            to={`/step/${step.id}`}
            className="text-[var(--accent)] hover:underline text-sm font-medium"
          >
            View Details
          </Link>
          
          <div className="flex space-x-2">
            {step.videoUrl && (
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">
                Video
              </span>
            )}
            {step.videoEmbed && (
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">
                Video
              </span>
            )}
            {step.downloadLinks && step.downloadLinks.length > 0 && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                Downloads
              </span>
            )}
            {step.codeSnippet && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                Code
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
