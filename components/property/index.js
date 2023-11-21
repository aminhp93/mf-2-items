import * as TYPE from "./symbols";

/**
 * Decides if the property should be the picker default value, item default value or not present (null)
 * @param {*} itemDefault
 * @param {*} propertyDefault
 */
const getPropertyValue = (itemDefault, propertyDefault) => {
  // Property isn't needed by the item when itemDefault is null
  if (itemDefault === null) return null;

  // If itemDefault isn't defined then we return the pickerDefault, itemDefault otherwise.
  return itemDefault === undefined ? propertyDefault : itemDefault;
};

/**
 * Geometry property
 * @param {*} options
 */
export const geometry = (options = {}) => {
  return {
    type: TYPE.GEOMETRY,
    label: options.label || "Geometry",
    value: {
      width: getPropertyValue(options.width, 40),
      height: getPropertyValue(options.height, 40),
    },
  };
};
