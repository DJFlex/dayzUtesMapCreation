import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { MapConfig } from '../types';
import { generateConfigCpp, generateModCpp } from '../utils/fileGenerators';
import JSZip from 'jszip';

const FileGenerator: React.FC = () => {
  const [config, setConfig] = useState<MapConfig>({
    mapName: 'MyDayZMap',
    modFolderName: '@MyDayZMap',
    authorName: 'Your Name',
    description: 'A custom DayZ map',
    customUrl: 'example.com/mydayzmap'
  });
  
  const [activeTab, setActiveTab] = useState<'config' | 'mod'>('config');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const configCpp = generateConfigCpp(config);
  const modCpp = generateModCpp(config);

  const handleCopyCode = () => {
    const codeToCopy = activeTab === 'config' ? configCpp : modCpp;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    
    // Create folder structure
    const modFolder = zip.folder(config.modFolderName);
    // Create these folders but don't need to store references since we don't use them later
    modFolder?.folder('addons');
    modFolder?.folder('keys');
    
    // Add mod.cpp to the mod folder
    modFolder?.file('mod.cpp', modCpp);
    
    // Create source folder structure
    const sourceFolder = zip.folder('source');
    const mapFolder = sourceFolder?.folder(config.mapName.toLowerCase());
    
    // Add config.cpp to the map folder
    mapFolder?.file('config.cpp', configCpp);
    
    // Create data folder
    const dataFolder = mapFolder?.folder('data');
    // Create layers folder without storing reference
    dataFolder?.folder('layers');
    
    // Create env folder
    const envFolder = mapFolder?.folder('env');
    
    // Add placeholder files
    mapFolder?.file('cfgworlds.hpp', '// Your cfgworlds.hpp content here');
    dataFolder?.file(`${config.mapName.toLowerCase()}.wrp`, '// This is a placeholder for your .wrp file');
    envFolder?.file('weather.xml', '<!-- Your weather configuration -->');
    
    // Add readme
    zip.file('README.txt', `DayZ Map Mod: ${config.mapName}
Created by: ${config.authorName}
Description: ${config.description}

This ZIP contains the basic folder structure for your DayZ map mod.
- The ${config.modFolderName} folder is the mod folder structure.
- The source folder contains the files you'll work with before packing.

Instructions:
1. Edit the files in the source folder
2. Use DayZ Tools to pack the ${config.mapName.toLowerCase()} folder into a PBO
3. Place the PBO in the ${config.modFolderName}/addons folder
4. Sign the PBO and place the key in the ${config.modFolderName}/keys folder
`);
    
    // Generate and download the zip
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.mapName}_DayZ_Map_Files.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">Map Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Map Name
              </label>
              <input
                type="text"
                name="mapName"
                value={config.mapName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="e.g., Chernarus"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used as the worldName in config.cpp
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mod Folder Name
              </label>
              <input
                type="text"
                name="modFolderName"
                value={config.modFolderName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="e.g., @MyMap"
              />
              <p className="text-xs text-gray-500 mt-1">
                The folder name for your mod (should start with @)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                name="authorName"
                value={config.authorName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={config.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="A brief description of your map"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom URL
              </label>
              <input
                type="text"
                name="customUrl"
                value={config.customUrl}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="e.g., example.com/mymap"
              />
              <p className="text-xs text-gray-500 mt-1">
                Website or forum link for your map (optional)
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleDownloadZip}
              className="flex items-center px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              <Download size={16} className="mr-2" />
              <span>Download All Files as ZIP</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Downloads a ZIP with the complete folder structure and generated files
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'config'
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('config')}
            >
              config.cpp
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'mod'
                  ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('mod')}
            >
              mod.cpp
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={handleCopyCode}
                className="flex items-center p-2 bg-gray-800 bg-opacity-70 text-white rounded-md hover:bg-opacity-90 transition-colors"
                title="Copy code"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            
            <div className="h-[500px] border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="cpp"
                value={activeTab === 'config' ? configCpp : modCpp}
                options={{
                  readOnly: true,
                  minimap: { enabled: false }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileGenerator;
