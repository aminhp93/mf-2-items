// @ts-expect-error Import remote module
import remotePropertySymbols from "property/symbols";

const itemSetup = {
  id: "Triangle",
  name: "Triangle",
  icon: "change_history",
  properties: {
    geometry: remotePropertySymbols?.property?.geometry({}),
  },
};

type Props = {
  geometry: {
    width: number;
    height: number;
  };
  style: {
    color: string;
    borderColor: string;
    border: boolean;
    borderThickness: number;
  };
  settings: {
    opacity: number;
    dashBarLength: number;
    dashSpaceLength: number;
    linecap: string;
  };
};

const Triangle = (props: Props) => {
  const { style, geometry, settings } = props;

  const { width, height } = geometry;
  const borderWidth = style.border ? style.borderThickness : 0;
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
        // strokeLinecap={
        //   settings.linecap === "none" ? undefined : settings.linecap
        // }
        style={{
          transition: `0.35s ease-in-out`,
        }}
      />
    </svg>
  );
};

Triangle.itemSetup = itemSetup;

export default Triangle;
