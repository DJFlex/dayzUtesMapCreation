import { Step } from '../types';

export const steps: Step[] = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'Welcome to the DayZ Map Builder Guide! This interactive guide will help you turn a terrain sample into a working DayZ map mod. Follow each step carefully and check them off as you complete them.',
    completed: false
  },
  {
    id: 'setup-tools',
    title: 'Setup Tools',
    description: 'Before we begin, you\'ll need to install and set up the necessary tools for map creation. This includes Terrain Builder, Oxygen, and the DayZ Tools from Steam.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadLinks: [
      {
        name: 'DayZ Tools',
        url: 'https://store.steampowered.com/app/830640/DayZ_Tools/',
        description: 'Available on Steam under Tools'
      },
      {
        name: 'Terrain Builder',
        url: 'https://community.bistudio.com/wiki/Terrain_Builder',
        description: 'Included with DayZ Tools'
      }
    ],
    completed: false
  },
  {
    id: 'terrain-sample',
    title: 'Download Terrain Sample',
    description: 'Download the terrain sample which will serve as the foundation for your custom map. This sample includes the basic structure needed for a DayZ map.',
    downloadLinks: [
      {
        name: 'Terrain Sample ZIP',
        url: 'https://community.bistudio.com/wiki/DayZ:Terrain_sample',
        description: 'Basic terrain sample with required folder structure'
      }
    ],
    completed: false
  },
  {
    id: 'terrain-editing',
    title: 'Terrain Editing',
    description: 'Learn how to use Terrain Builder to modify the heightmap, add textures, and place objects on your map. This step is crucial for creating a unique and interesting landscape.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    completed: false
  },
  {
    id: 'config-files',
    title: 'Create Config Files',
    description: 'Create and configure the necessary config.cpp and mod.cpp files for your map. These files define how your map will work in DayZ.',
    downloadLinks: [
      {
        name: 'Example Config Files',
        url: 'https://github.com/BohemiaInteractive/DayZ-Samples/tree/master/DZ/worlds_chernarusplus/config.cpp',
        description: 'Sample config.cpp and mod.cpp files'
      }
    ],
    codeSnippet: `class CfgPatches
{
  class YourMap_Data
  {
    units[] = {};
    weapons[] = {};
    requiredVersion = 0.1;
    requiredAddons[] = {"DZ_Data"};
  };
};

class CfgWorlds
{
  class CAWorld;
  class YourMap: CAWorld
  {
    description = "Your Custom Map";
    worldName = "YourMap/YourMap";
    // More configuration...
  };
};`,
    language: 'cpp',
    completed: false
  },
  {
    id: 'packing-map',
    title: 'Packing the Map',
    description: 'Learn how to pack your map into a PBO file that can be loaded by DayZ. This involves using the DayZ Tools to compile your map files.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    completed: false
  },
  {
    id: 'testing',
    title: 'Testing in DayZ',
    description: 'Test your map in DayZ to ensure everything is working correctly. Learn how to set up a local server for testing and how to troubleshoot common issues.',
    completed: false
  }
];
