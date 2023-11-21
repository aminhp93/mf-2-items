// import * as properties from "@/components/property";
// import dynamic from "next/dynamic";

// const RemoteItems = dynamic(
//   () =>
//     import(
//       // @ts-ignore
//       "items/index"
//     ),
//   {
//     ssr: false,
//   }
// ) as any;

const itemSetup = {
  id: "Circle",
  name: "Circle",
  icon: "radio_button_unchecked",
  // properties: {
  //   geometry: properties.geometry({
  //     height: null,
  //   }),
  // },
};

const Circle = (props: any) => {
  console.log({ props });
  const {
    geometry,
    style = {},
    settings = {},
    // dataSource
  } = props;
  // const { width = 100 } = geometry?.value;
  const width = 100;
  // const { borderThickness } = style;

  let borderWidth = 0;
  // if (style.border) {
  //   borderWidth = borderThickness < width / 2 ? borderThickness : width / 2;
  // }

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

Circle.itemSetup = itemSetup;

export default Circle;
