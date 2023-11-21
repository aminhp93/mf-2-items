import NumberProperty from "./NumberProperty";
// import { Geometry, GeometryConfig } from "./types";

export interface Geometry {
  width: number;
  height: number;
}

/**
 * @description Reference to the geometry  in PMP/src/lib/item/properties/index.js
 */
export interface GeometryConfig {
  type: symbol;
  label: string;
  value: Geometry;
}

export const borderStyles = { solid: "solid", dashed: "dashed" };

interface Props {
  value: Geometry;
  config: GeometryConfig;
  onChange: (value: Geometry) => void;
  instance: string;
  onSaveView: () => void;
}

const GeometryProperty = (props: Props): JSX.Element => {
  const { value, config } = props;
  const { value: properties } = config;

  const handleChange = (newObj: Partial<Geometry>) => {
    props.onChange({ ...props.value, ...newObj });
  };

  return (
    <>
      {properties.width && (
        <NumberProperty
          label={"width"}
          value={value.width}
          min={0}
          onChange={(width: number) => handleChange({ width })}
        />
      )}
      {properties.height && (
        <NumberProperty
          label={"height"}
          value={value.height}
          min={0}
          onChange={(height: number) => handleChange({ height })}
        />
      )}
    </>
  );
};

export default GeometryProperty;
