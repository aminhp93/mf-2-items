import React, { Fragment } from "react";
import { getItem } from "@/utils/cacheItems";
import css from "./PropertyList.module.scss";

import PropertyGroup from "./PropertyGroup";

// Property stuff
import * as TYPE from "./symbols";
// import GroupProperty from "./properties/GroupProperty";
// import TransformProperty from "./properties/TransformProperty";
import GeometryProperty from "./GeometryProperty";
// import StyleProperty from "./properties/StyleProperty";
// import TextProperty from "./properties/TextProperty";

const pickerMap = {
  // Custom groups
  // [TYPE.GROUP]: GroupProperty,

  // Predefined groups
  // [TYPE.TRANSFORM]: TransformProperty,
  [TYPE.GEOMETRY]: GeometryProperty,
  // [TYPE.STYLE]: StyleProperty,
  // [TYPE.TEXT]: TextProperty,
};

const standardize = (text) => text.toLowerCase().replace(/\s+/g, "_");

export default function PropertyList(props) {
  const onPropertyChange = (newProperty) => {
    props.onChange({ ...props.properties, ...newProperty });
  };

  if (!props.id || !props.instance || props.isMultiSelect)
    return <h5 className={css.title}>{"please_select_one_item"}</h5>;

  const item = getItem(props.id);

  return (
    <Fragment>
      <h5 className={css.title}>{t(standardize(item.name))}</h5>
      <ol className={css.content}>
        {Object.keys(props.properties).map((key) => {
          const config = item.properties[key];
          const Picker = pickerMap[config.type];

          if (!Picker) return null;
          return (
            <ol key={key}>
              <PropertyGroup label={standardize(config.label)}>
                <Picker
                  key={props.instance}
                  config={config}
                  value={props.properties[key]}
                  onChange={(x) => onPropertyChange({ [key]: x })}
                  onSaveView={props.onSave}
                  instance={props.instance}
                />
              </PropertyGroup>
            </ol>
          );
        })}
      </ol>
    </Fragment>
  );
}
