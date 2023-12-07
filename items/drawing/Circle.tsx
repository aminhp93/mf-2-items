// @ts-expect-error Import remote module
import remotePropertySymbols from "property/symbols";

const itemSetup = {
  id: "Circle",
  name: "Circle",
  icon: "radio_button_unchecked",
  properties: {
    geometry: remotePropertySymbols?.property?.geometry({
      height: 100,
      width: 100,
    }),
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
  };
  settings: {
    opacity: number;
    dashBarLength: number;
    dashSpaceLength: number;
    linecap: string;
  };
};

const Circle = (props: Props) => {
  const { geometry, style, settings } = props;
  const { width } = geometry;
  const borderWidth = 0;
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
        // strokeLinecap={settings.linecap}
        style={{ transition: `0.35s ease-in-out` }}
      />
    </svg>
  );
};

Circle.itemSetup = itemSetup;

export default Circle;
