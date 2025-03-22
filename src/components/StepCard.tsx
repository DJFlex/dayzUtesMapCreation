import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  completed: boolean;
  onToggleComplete: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, completed, onToggleComplete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-[var(--primary)]">{step.title}</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleComplete();
            }}
            className="text-gray-400 hover:text-green-500 transition-colors"
          >
            {completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{step.description}</p>
        
        <div className="flex items-center justify-between">
          <Link
            to={`/step/${step.id}`}
            className="inline-flex items-center text-[var(--accent)] hover:text-[var(--primary)] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          
          {step.downloadLinks && step.downloadLinks.length > 0 && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {step.downloadLinks.length} download{step.downloadLinks.length > 1 ? 's' : ''}
            </span>
          )}
          
          {step.videoUrl && (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              Video
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepCard;
