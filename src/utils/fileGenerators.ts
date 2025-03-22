import { MapConfig } from '../types';

export const generateConfigCpp = (config: MapConfig): string => {
  return `class CfgPatches
{
	class ${config.mapName}
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
	class ChernarusPlus: CAWorld
	{
		class Grid;
	};
	class ${config.mapName}: ChernarusPlus
	{
		worldId = 2;
		cutscenes[] = {};
		description = "${config.description}";
		icon = "";
		worldName = "${config.mapName.toLowerCase()}/data/${config.mapName.toLowerCase()}.wrp";
		pictureMap = "";
		pictureShot = "";
		
		class Grid: Grid
		{
			offsetX = 0.0;
			offsetY = 0.0;
			
			class Zones
			{
				class Zone_1
				{
					name = "Zone1";
					location[] = {128, 128, 0};
					area = 100;
				};
			};
		};
	};
};

class CfgWorldList
{
	class ${config.mapName} {};
};
`;
};

export const generateModCpp = (config: MapConfig): string => {
  return `name = "${config.mapName}";
picture = "";
logoSmall = "";
logo = "";
logoOver = "";
tooltip = "${config.description}";
tooltipOwned = "${config.description}";
overview = "${config.description}";
author = "${config.authorName}";
actionName = "Website";
action = "${config.customUrl}";
version = "1.0";
`;
};
