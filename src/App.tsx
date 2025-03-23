import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import StepCard from './components/StepCard';
import StepDetail from './components/StepDetail';
import FileGenerator from './components/FileGenerator';
import FileChecker from './components/FileChecker';
import ProgressBar from './components/ProgressBar';
import { steps } from './data/steps';
import { Note, Theme } from './types';

function App() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [theme, setTheme] = useState<Theme>('light');

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedCompletedSteps = localStorage.getItem('completedSteps');
    if (savedCompletedSteps) {
      setCompletedSteps(JSON.parse(savedCompletedSteps));
    }

    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

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
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div>
                <Banner />
                
                <div className="container mx-auto px-4 py-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--primary)] dark:text-white mb-2">
                      DZ Academy - Big Grampa
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                      Follow these steps to create your own custom DayZ map
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
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
              </div>
            } />
            
            <Route path="/step/:stepId" element={
              <div className="container mx-auto px-4 py-8">
                <StepDetail 
                  steps={steps}
                  completedSteps={completedSteps}
                  onToggleComplete={toggleStepCompletion}
                  onSaveNote={saveNote}
                  getNoteForStep={getStepNote}
                />
              </div>
            } />
            
            <Route path="/generator" element={
              <div className="container mx-auto px-4 py-8">
                <FileGenerator />
              </div>
            } />
            
            <Route path="/file-checker" element={
              <div className="container mx-auto px-4 py-8">
                <FileChecker />
              </div>
            } />
            
            <Route path="/folder-structure" element={
              <div className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6 dark:text-white">DayZ Map Folder Structure</h2>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
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
                    <h3 className="text-lg font-medium mb-3 dark:text-white">Key Files Explained</h3>
                    
                    <ul className="space-y-3">
                      <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md dark:text-gray-200">
                        <span className="font-semibold">mod.cpp</span>: Contains metadata about your mod including name, author, and description.
                      </li>
                      <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md dark:text-gray-200">
                        <span className="font-semibold">config.cpp</span>: Main configuration file that defines your map's properties and dependencies.
                      </li>
                      <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md dark:text-gray-200">
                        <span className="font-semibold">yourmap.wrp</span>: The terrain file created with Terrain Builder.
                      </li>
                      <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md dark:text-gray-200">
                        <span className="font-semibold">layers/</span>: Contains individual terrain layers like vegetation, roads, and buildings.
                      </li>
                      <li className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md dark:text-gray-200">
                        <span className="font-semibold">env/</span>: Environment configurations including weather, lighting, and atmosphere.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            } />
            
            <Route path="/my-progress" element={
              <div className="container mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">My Progress</h2>
                
                <div className="mb-8">
                  <ProgressBar 
                    current={completedSteps.length} 
                    total={steps.length} 
                  />
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium mb-4 dark:text-white">Completed Steps</h3>
                  
                  {completedSteps.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">No steps completed yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {steps
                        .filter(step => completedSteps.includes(step.id))
                        .map(step => (
                          <li key={step.id} className="flex items-center p-3 bg-green-50 dark:bg-green-900 rounded-md">
                            <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                              ✓
                            </span>
                            <span className="dark:text-white">{step.title}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                  <h3 className="text-lg font-medium mb-4 dark:text-white">My Notes</h3>
                  
                  {notes.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">No notes added yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {notes.map(note => {
                        const step = steps.find(s => s.id === note.stepId);
                        return (
                          <div key={note.stepId} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                            <h4 className="font-medium text-[var(--primary)] dark:text-blue-400 mb-2">
                              {step?.title || 'Unknown Step'}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
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
