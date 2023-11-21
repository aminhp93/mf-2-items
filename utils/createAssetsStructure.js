// import defaultImg from "../../items/assets/add.png";
// import env from "../../env";

/**
 * @typedef AssetFolderConfig
 * @property {string} id Must match a directory name below the `items` directory
 * @property {string} name The folder name to show in the UI
 * @property {boolean} toggled opens/expands item directory by default. Default is collapsed (false)
 * @property {Array} content Assets in the folder, populated by `createAssetsStructure`
 * @property {string} [requiredFeature] If provided, the folder will only appear if the
 *      feature has been enabled, ref. shared/constants/features.js.
 *
 * @type {Object<string, AssetFolderConfig>}
 */
let assetsFolders = {
  drawing: {
    id: "drawing",
    name: "Drawing",
    content: [],
  },
  basic: {
    id: "basic",
    name: "Basic",
    content: [],
  },
  charts: {
    id: "charts",
    name: "Charts",
    content: [],
  },
  piping: {
    id: "piping",
    name: "Piping",
    content: [],
  },
  utilities: {
    id: "utilities",
    name: "Utilities",
    content: [],
  },
  dashboards: {
    id: "dashboards",
    name: "Dashboards",
    content: [],
  },
  tools: {
    id: "tools",
    name: "Tools",
    content: [],
  },
  objects: {
    id: "objects",
    name: "Objects",
    content: [],
  },
  bas: {
    id: "bas",
    name: "BAS",
    content: [],
  },
  AteaDemo: {
    id: "AteaDemo",
    name: "Atea alarm demo",
    requiredFeature: "ATEA_VELFERD",
    content: [],
  },
  piscadaBAS: {
    id: "piscadaBAS",
    name: "Piscada BAS",
    content: [],
  },
};

// if (env.REACT_APP_FLAVOR === "GK" || env.REACT_APP_FLAVOR === "PISCADA") {
// 	assetsFolders.gkBas = {
// 		id: "gkBas",
// 		name: "GK BAS",
// 		content: [],
// 	};

// 	assetsFolders.gkStatic = {
// 		id: "gkStatic",
// 		name: "GK Static Elements",
// 		content: [],
// 	};
// }

/**
 * @param {string} feature Feature flag name
 * @param {Object<string, boolean>} features Map of feature flags with enabled true/false
 * @returns {boolean}
 */
const isHiddenFeature = (feature, features) => {
  if (!feature) {
    return false;
  }
  return !features[feature];
};

let first = true;

/**
 * @typedef Asset
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {boolean} deprecated
 * @property {string} image
 *
 * @param {Map<string, {name: string, dir: string, component: function}>} assetsMap
 * @param {Object<string, boolean>} features Feature flags
 * @returns {{ id: string, name: string, content: Asset[] }[]} Asset structure
 */
export const createAssetsStructure = (assetsMap, features) => {
  if (!first) return assetsFolders;

  first = false;

  for (const [id, setup] of assetsMap) {
    const component = setup.component;
    if (
      !component ||
      !component.itemSetup ||
      isHiddenFeature(component.itemSetup.requiredFeature, features)
    ) {
      continue;
    }
    const { image, icon = "add" } = component.itemSetup;
    const { name, dir, deprecated } = setup;
    let folder;
    // last item of dir
    dir[dir.length - 1];

    if (dir && (folder = assetsFolders[dir[dir.length - 1]])) {
      folder.content.push({
        deprecated,
        id,
        name,
        image,
        icon,
      });
    }
  }

  const result = [];
  for (const key of Object.keys(assetsFolders)) {
    const folder = assetsFolders[key];
    if (
      folder.content.length === 0 ||
      isHiddenFeature(folder.requiredFeature, features)
    ) {
      continue;
    }
    result.push(folder);
  }

  return (assetsFolders = result);
};
