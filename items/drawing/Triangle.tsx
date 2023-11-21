// import i18next from "i18next";
// import { Item } from "../../interfaces/Item/Item";
// import withDataSources from "../../lib/hoc/withDataSources";
// import * as properties from "../../lib/item/properties";
// import { shadeColor } from "../../lib/utils/colorTools";
// import { getDMFFromDataSource } from "../../lib/utils/dmfTools";
// import Widget from "../common/Widget";

import * as properties from "@/components/property";

interface TriangleProps {
  style: {
    color: string;
    border: boolean;
    borderThickness: number;
    borderColor: string;
  };
  geometry: {
    width: number;
    height: number;
  };
  settings: {
    opacity: number;
    dashBarLength: number;
    dashSpaceLength: number;
    linecap: "none" | "round" | "square";
  };
  dataSource: unknown;
  matrix: {
    dmf: unknown;
  };
}

const itemSetup = {
  id: "Triangle",
  name: "Triangle",
  icon: "change_history",
  properties: {
    // transform: properties.transform({ z: 5 }),
    geometry: properties.geometry({}),
    // style: properties.style({
    //   ...Widget.getPlainStyleNoItemStyle(),
    //   border: false,
    //   borderThickness: 2,
    // }),
    // dataSources: properties.group("Data source", {
    //   value: properties.dataSource(),
    // }),
    // matrix: properties.group("Matrix", {
    //   dmf: properties.dmf("Value"),
    // }),
    // settings: properties.group("Settings", {
    //   opacity: properties.number("Opacity", 100, { min: 0, max: 100 }),
    //   dashBarLength: properties.number("Bar length", 15, { min: 0, max: 100 }),
    //   dashSpaceLength: properties.number("Space length", 0, {
    //     min: 0,
    //     max: 100,
    //   }),
    //   linecap: properties.option("Border style", "round", {
    //     butt: i18next.t("none"),
    //     round: i18next.t("round"),
    //     square: i18next.t("square"),
    //   }),
    // }),
  },
};

const Triangle = (props: any) => {
  const {
    style = {},
    geometry,
    settings = {},
    //  dataSource
  } = props;

  const { width, height } = geometry.value;

  const borderWidth = style.border ? style.borderThickness : 0;

  // const currentDMF = getDMFFromDataSource(dataSource, props.matrix.dmf);
  // const color = currentDMF ? currentDMF.backgroundColor : style.color;
  // const borderColor = currentDMF
  //   ? shadeColor(currentDMF.backgroundColor, -0.3)
  //   : style.borderColor;

  const color = style.color;
  const borderColor = style.borderColor;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <polygon
        points={`${width / 2},${borderWidth / 0.9} ${borderWidth / 1.3},${
          height - borderWidth / 3
        } ${width - borderWidth / 1.3},${height - borderWidth / 3}`}
        fill={color}
        strokeWidth={style.border ? style.borderThickness : 0}
        stroke={color}
        opacity={settings.opacity / 100}
        style={{
          transition: `0.35s ease-in-out`,
        }}
      />
      <polygon
        points={`${width / 2},${borderWidth / 0.9} 
                            ${borderWidth / 1.3},${height - borderWidth / 3} 
                            ${width - borderWidth / 1.3},${
          height - borderWidth / 3
        }`}
        fill="transparent"
        strokeWidth={style.border ? style.borderThickness : 0}
        stroke={borderColor}
        opacity={settings.opacity / 100}
        strokeDasharray={`${
          color === "transparent" ? 0 : settings.dashBarLength
        }, ${color === "transparent" ? 15 : settings.dashSpaceLength}`}
        strokeLinecap={
          settings.linecap === "none" ? undefined : settings.linecap
        }
        style={{
          transition: `0.35s ease-in-out`,
        }}
      />
    </svg>
  );
};

Triangle.itemSetup = itemSetup;

// export default withDataSources(Triangle, (props) => ({
//   dataSource: props.dataSources.value,
// }));

export default Triangle;
