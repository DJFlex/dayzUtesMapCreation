import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';

const FileChecker: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [fileType, setFileType] = useState<'config' | 'mod'>('config');
  const [validationResults, setValidationResults] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileContent(content);
      validateFile(content, fileType);
    };
    reader.readAsText(file);
  };

  const validateFile = (content: string, type: 'config' | 'mod') => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (type === 'config') {
      // Check for required sections in config.cpp
      if (!content.includes('class CfgPatches')) {
        errors.push('Missing CfgPatches class');
      }
      
      if (!content.includes('class CfgWorlds')) {
        errors.push('Missing CfgWorlds class');
      }
      
      if (!content.includes('worldName =')) {
        errors.push('Missing worldName property');
      }
      
      // Check for common issues
      if (!content.includes('requiredAddons[]')) {
        warnings.push('Missing requiredAddons array');
      }
      
      if (!content.match(/class\s+\w+\s*:\s*ChernarusPlus/)) {
        warnings.push('Map class should inherit from ChernarusPlus');
      }
    } else if (type === 'mod') {
      // Check for required properties in mod.cpp
      if (!content.includes('name =')) {
        errors.push('Missing name property');
      }
      
      if (!content.includes('author =')) {
        errors.push('Missing author property');
      }
      
      if (!content.includes('version =')) {
        errors.push('Missing version property');
      }
      
      // Check for recommended properties
      if (!content.includes('picture =')) {
        warnings.push('Missing picture property');
      }
      
      if (!content.includes('overview =')) {
        warnings.push('Missing overview property');
      }
    }

    setValidationResults({
      isValid: errors.length === 0,
      errors,
      warnings
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFileContent(value);
      validateFile(value, fileType);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">File Checker</h2>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              fileType === 'config'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => {
              setFileType('config');
              if (fileContent) {
                validateFile(fileContent, 'config');
              }
            }}
          >
            config.cpp
          </button>
          
          <button
            className={`px-4 py-2 rounded-md ${
              fileType === 'mod'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => {
              setFileType('mod');
              if (fileContent) {
                validateFile(fileContent, 'mod');
              }
            }}
          >
            mod.cpp
          </button>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".cpp,.txt"
            onChange={handleFileUpload}
          />
          
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Upload your {fileType}.cpp file
            </span>
            <span className="text-xs text-gray-500 mt-1">
              or drag and drop it here
            </span>
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Edit File Content</h3>
        
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="cpp"
            value={fileContent}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false }
            }}
          />
        </div>
      </div>
      
      {validationResults && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Validation Results</h3>
          
          <div className={`p-4 rounded-md ${
            validationResults.isValid && validationResults.warnings.length === 0
              ? 'bg-green-50'
              : validationResults.errors.length > 0
                ? 'bg-red-50'
                : 'bg-yellow-50'
          }`}>
            <div className="flex items-center mb-2">
              {validationResults.isValid && validationResults.warnings.length === 0 ? (
                <>
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="font-medium text-green-700">File is valid!</span>
                </>
              ) : validationResults.errors.length > 0 ? (
                <>
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  <span className="font-medium text-red-700">File has errors</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-yellow-500 mr-2" size={20} />
                  <span className="font-medium text-yellow-700">File has warnings</span>
                </>
              )}
            </div>
            
            {validationResults.errors.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-red-700 mb-1">Errors:</h4>
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                  {validationResults.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validationResults.warnings.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-yellow-700 mb-1">Warnings:</h4>
                <ul className="list-disc list-inside text-sm text-yellow-600 space-y-1">
                  {validationResults.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileChecker;
