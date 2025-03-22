import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StepCard from './components/StepCard';
import StepDetail from './components/StepDetail';
import FileGenerator from './components/FileGenerator';
import FileChecker from './components/FileChecker';
import ProgressBar from './components/ProgressBar';
import { steps } from './data/steps';
import { Note } from './types';

function App() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const saveNote = (note: Note) => {
    setNotes(prev => {
      const existingNoteIndex = prev.findIndex(n => n.stepId === note.stepId);
      if (existingNoteIndex >= 0) {
        const updatedNotes = [...prev];
        updatedNotes[existingNoteIndex] = note;
        return updatedNotes;
      } else {
        return [...prev, note];
      }
    });
  };

  const getStepNote = (stepId: string) => {
    return notes.find(note => note.stepId === stepId);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">
                    DZ Academy - DayZ Map Builder Guide
                  </h1>
                  <p className="text-gray-600">
                    Follow these steps to create your own custom DayZ map
                  </p>
                  <p className="text-gray-600 mt-1">
                    Created by <a href="https://discord.gg/F7ctZX7" className="text-[var(--accent)] hover:underline" target="_blank" rel="noopener noreferrer">Big Grampa</a>
                  </p>
                  
                  <div className="mt-6">
                    <ProgressBar 
                      current={completedSteps.length} 
                      total={steps.length} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {steps.map(step => (
                    <StepCard
                      key={step.id}
                      step={step}
                      completed={completedSteps.includes(step.id)}
                      onToggleComplete={() => toggleStepCompletion(step.id)}
                    />
                  ))}
                </div>
              </div>
            } />
            
            <Route path="/step/:stepId" element={
              <StepDetail 
                steps={steps}
                completedSteps={completedSteps}
                onToggleComplete={toggleStepCompletion}
                onSaveNote={saveNote}
                getNoteForStep={getStepNote}
              />
            } />
            
            <Route path="/generator" element={<FileGenerator />} />
            
            <Route path="/file-checker" element={<FileChecker />} />
            
            <Route path="/folder-structure" element={
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">DayZ Map Folder Structure</h2>
                
                <div className="border border-gray-200 rounded-md p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
{`@YourMapName/
├── addons/
│   └── yourmap.pbo  (Packed Binary Object)
├── keys/
│   └── yourmap.bikey  (Signature key)
└── mod.cpp  (Mod metadata)

source/
├── yourmap/
│   ├── config.cpp  (Main configuration)
│   ├── cfgworlds.hpp  (World configuration)
│   ├── data/
│   │   ├── yourmap.wrp  (World file)
│   │   └── layers/  (Terrain layers)
│   │       ├── roads.layer
│   │       ├── buildings.layer
│   │       └── ...
│   └── env/
│       ├── weather.xml  (Weather configuration)
│       └── ...
└── ...`}
                  </pre>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Key Files Explained</h3>
                  
                  <ul className="space-y-3">
                    <li className="bg-gray-50 p-3 rounded-md">
                      <span className="font-semibold">mod.cpp</span>: Contains metadata about your mod including name, author, and description.
                    </li>
                    <li className="bg-gray-50 p-3 rounded-md">
                      <span className="font-semibold">config.cpp</span>: Main configuration file that defines your map's properties and dependencies.
                    </li>
                    <li className="bg-gray-50 p-3 rounded-md">
                      <span className="font-semibold">yourmap.wrp</span>: The terrain file created with Terrain Builder.
                    </li>
                    <li className="bg-gray-50 p-3 rounded-md">
                      <span className="font-semibold">layers/</span>: Contains individual terrain layers like vegetation, roads, and buildings.
                    </li>
                    <li className="bg-gray-50 p-3 rounded-md">
                      <span className="font-semibold">env/</span>: Environment configurations including weather, lighting, and atmosphere.
                    </li>
                  </ul>
                </div>
              </div>
            } />
            
            <Route path="/my-progress" element={
              <div>
                <h2 className="text-xl font-semibold mb-6">My Progress</h2>
                
                <div className="mb-8">
                  <ProgressBar 
                    current={completedSteps.length} 
                    total={steps.length} 
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium mb-4">Completed Steps</h3>
                  
                  {completedSteps.length === 0 ? (
                    <p className="text-gray-500 italic">No steps completed yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {steps
                        .filter(step => completedSteps.includes(step.id))
                        .map(step => (
                          <li key={step.id} className="flex items-center p-3 bg-green-50 rounded-md">
                            <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                              ✓
                            </span>
                            <span>{step.title}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">My Notes</h3>
                  
                  {notes.length === 0 ? (
                    <p className="text-gray-500 italic">No notes added yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {notes.map(note => {
                        const step = steps.find(s => s.id === note.stepId);
                        return (
                          <div key={note.stepId} className="border border-gray-200 rounded-md p-4">
                            <h4 className="font-medium text-[var(--primary)] mb-2">
                              {step?.title || 'Unknown Step'}
                            </h4>
                            <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              Last updated: {new Date(note.timestamp).toLocaleString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
