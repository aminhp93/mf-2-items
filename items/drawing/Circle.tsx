// import * as properties from "@/components/property";
let remoteListItems: any;

if (typeof window !== "undefined") {
  remoteListItems = require("property/symbols").default;
}

const itemSetup = {
  id: "Circle",
  name: "Circle",
  icon: "radio_button_unchecked",
  properties: {
    geometry:
      remoteListItems &&
      remoteListItems.property &&
      remoteListItems.property.geometry({
        height: 100,
        width: 100,
      }),
  },
};

const Circle = (props: any) => {
  console.log("Circle", { props });
  const { geometry, style = {}, settings = {} } = props;
  const { width } = geometry;
  let borderWidth = 0;
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

Circle.itemSetup = itemSetup;

export default Circle;
