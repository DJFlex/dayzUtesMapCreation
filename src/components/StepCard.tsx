import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, ArrowRight, FileText, Video, Download, Code } from 'lucide-react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  completed: boolean;
  onToggleComplete: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, completed, onToggleComplete }) => {
  // Determine which icon to show based on step content
  const getStepIcon = () => {
    if (step.videoUrl || step.videoEmbed) {
      return <Video className="w-8 h-8 text-red-500" />;
    } else if (step.downloadLinks && step.downloadLinks.length > 0) {
      return <Download className="w-8 h-8 text-blue-500" />;
    } else if (step.codeSnippet) {
      return <Code className="w-8 h-8 text-purple-500" />;
    } else {
      return <FileText className="w-8 h-8 text-green-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {getStepIcon()}
            </div>
            <h3 className="text-lg font-semibold text-[var(--primary)] dark:text-white">{step.title}</h3>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleComplete();
            }}
            className="text-gray-400 hover:text-green-500 transition-colors"
            aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{step.description}</p>
        
        <div className="flex items-center justify-between">
          <Link
            to={`/step/${step.id}`}
            className="inline-flex items-center text-[var(--accent)] hover:text-[var(--primary)] dark:hover:text-white transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          
          <div className="flex space-x-2">
            {step.downloadLinks && step.downloadLinks.length > 0 && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                {step.downloadLinks.length} download{step.downloadLinks.length > 1 ? 's' : ''}
              </span>
            )}
            
            {(step.videoUrl || step.videoEmbed) && (
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                Video
              </span>
            )}
            
            {step.codeSnippet && (
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
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
