import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Download } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Step, Note } from '../types';
import NoteEditor from './NoteEditor';

interface StepDetailProps {
  steps: Step[];
  completedSteps: string[];
  onToggleComplete: (stepId: string) => void;
  onSaveNote: (note: Note) => void;
  getNoteForStep: (stepId: string) => Note | undefined;
}

const StepDetail: React.FC<StepDetailProps> = ({
  steps,
  completedSteps,
  onToggleComplete,
  onSaveNote,
  getNoteForStep
}) => {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  
  const currentStepIndex = steps.findIndex(step => step.id === stepId);
  const currentStep = steps[currentStepIndex];
  
  if (!currentStep) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Step not found</h2>
        <Link 
          to="/" 
          className="text-[var(--accent)] hover:underline"
        >
          Return to guide
        </Link>
      </div>
    );
  }
  
  const prevStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;
  
  const isCompleted = completedSteps.includes(currentStep.id);
  const existingNote = getNoteForStep(currentStep.id);
  
  const handlePrevStep = () => {
    if (prevStep) {
      navigate(`/step/${prevStep.id}`);
    }
  };
  
  const handleNextStep = () => {
    if (nextStep) {
      navigate(`/step/${nextStep.id}`);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Guide</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-[var(--primary)]">
              {currentStep.title}
            </h2>
            
            <button
              onClick={() => onToggleComplete(currentStep.id)}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                color: isCompleted ? 'rgb(16, 185, 129)' : 'var(--text)'
              }}
            >
              {isCompleted ? (
                <>
                  <CheckCircle size={16} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle size={16} />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p>{currentStep.description}</p>
          </div>
          
          {currentStep.videoUrl && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Video Tutorial</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src={currentStep.videoUrl} 
                  title={`${currentStep.title} Tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-[400px] border-0"
                ></iframe>
              </div>
            </div>
          )}
          
          {currentStep.downloadLinks && currentStep.downloadLinks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Downloads</h3>
              <div className="space-y-3">
                {currentStep.downloadLinks.map((link, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-[var(--primary)]">{link.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                      </div>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-[var(--accent)] text-white rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        <Download size={16} className="mr-2" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentStep.codeSnippet && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Code Example</h3>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <Editor
                  height="300px"
                  defaultLanguage={currentStep.language || 'cpp'}
                  value={currentStep.codeSnippet}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false }
                  }}
                />
              </div>
            </div>
          )}
          
          <NoteEditor
            stepId={currentStep.id}
            existingNote={existingNote}
            onSaveNote={onSaveNote}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevStep}
          disabled={!prevStep}
          className={`flex items-center px-4 py-2 rounded-md ${
            prevStep
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          } transition-colors`}
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Previous Step</span>
        </button>
        
        <button
          onClick={handleNextStep}
          disabled={!nextStep}
          className={`flex items-center px-4 py-2 rounded-md ${
            nextStep
              ? 'bg-[var(--accent)] text-white hover:bg-opacity-90'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          } transition-colors`}
        >
          <span>Next Step</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepDetail;
