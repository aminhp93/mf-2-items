const PROPS = {
  transform: {
    anchor: "center",
    rotation: 0,
    scale: 1,
    show: true,
    x: 1060,
    y: 90,
    z: 3,
  },
  geometry: {
    width: 40,
  },
  style: {
    border: false,
    borderColor: "#9CCCCD",
    borderThickness: 1,
    color: "#2196f3",
  },
  dataSources: {},
  matrix: {
    dmf: {
      data: [],
    },
  },
  settings: {
    opacity: 100,
    dashBarLength: 15,
    dashSpaceLength: 0,
    linecap: "round",
  },
};

// import i18next from "i18next";
// import { Item } from "../../interfaces/Item/Item";
// import withDataSources from "../../lib/hoc/withDataSources";
// import * as properties from "../../lib/item/properties";
// import { shadeColor } from "../../lib/utils/colorTools";
// import { getDMFFromDataSource } from "../../lib/utils/dmfTools";
// import Widget from "../common/Widget";

interface CircleProps {
  geometry: {
    width: number;
  };
  style: {
    color: unknown;
    border: boolean;
    borderThickness: number;
    borderColor: string;
  };
  settings: {
    opacity: number;
    dashBarLength: unknown;
    dashSpaceLength: unknown;
    linecap: undefined;
  };
  dataSource: unknown;
  matrix: {
    dmf: unknown;
  };
}

// const itemSetup = {
//   id: "Circle",
//   name: "Circle",
//   icon: "radio_button_unchecked",
//   properties: {
//     transform: properties.transform({ z: 5 }),
//     geometry: properties.geometry({
//       height: null,
//     }),
//     style: properties.style(Widget.getPlainStyleNoItemStyle()),
//     dataSources: properties.group("Data source", {
//       value: properties.dataSource(),
//     }),
//     matrix: properties.group("Matrix", {
//       dmf: properties.dmf("Value"),
//     }),
//     settings: properties.group("Settings", {
//       opacity: properties.number("Opacity", 100, { min: 0, max: 100 }),
//       dashBarLength: properties.number("Bar length", 15, { min: 0, max: 100 }),
//       dashSpaceLength: properties.number("Space length", 0, {
//         min: 0,
//         max: 100,
//       }),
//       linecap: properties.option("Border style", "round", {
//         butt: i18next.t("none"),
//         round: i18next.t("round"),
//         square: i18next.t("square"),
//       }),
//     }),
//   },
// };

const Circle = () => {
  const {
    geometry,
    style,
    settings,
    // dataSource
  } = PROPS;
  const { width } = geometry;
  const { borderThickness } = style;

  let borderWidth = 0;
  if (style.border) {
    borderWidth = borderThickness < width / 2 ? borderThickness : width / 2;
  }

  // const currentDMF = getDMFFromDataSource(dataSource, props.matrix.dmf);
  // const color = currentDMF ? currentDMF.backgroundColor : style.color;
  // const borderColor = currentDMF
  //   ? shadeColor(currentDMF.backgroundColor, -0.3)
  //   : style.borderColor;

  const color = style.color;
  const borderColor = style.borderColor;
  return (
    <svg viewBox={`0 0 ${width} ${width}`} width={width} height={width}>
      <circle
        cx={width / 2}
        cy={width / 2}
        r={width / 2 - borderWidth / 2}
        fill={color}
        opacity={settings.opacity / 100}
        stroke={color}
        strokeWidth={borderWidth}
        style={{ transition: `0.35s ease-in-out` }}
      />
      <circle
        cx={width / 2}
        cy={width / 2}
        r={width / 2 - borderWidth / 2}
        fill="transparent"
        opacity={settings.opacity / 100}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeDasharray={`${
          color === "transparent" ? 0 : settings.dashBarLength
        }, ${color === "transparent" ? 15 : settings.dashSpaceLength}`}
        strokeLinecap={settings.linecap as any}
        style={{ transition: `0.35s ease-in-out` }}
      />
    </svg>
  );
};

// Circle.itemSetup = itemSetup;

// export default withDataSources(Circle, (props) => ({
//   dataSource: props.dataSources.value,
// }));

export default Circle;
