import ContentLoader from "react-content-loader";

interface LoaderProps {
  width: string;
  height: string;
  color?: string;
  rectLength?: number;
  rectProps?: {
    x: string;
    y: string;
    rx: string;
    ry: string;
    height: string;
    width: string;
  };
}

export default function Loader({
  width,
  height,
  color = "transparent",
  rectLength = 1,
  rectProps = {
    rx: "20",
    ry: "20",
    x: "0",
    y: "0",
    height,
    width,
  },
}: LoaderProps) {
  const viewBox = `0 0 ${width} ${height}`;
  const { rx, ry, x, y } = rectProps;
  const renderRects = () => {
    let rects = [];
    let yValue = Number(y);
    for (let i = 1; i <= rectLength; i++) {
      console.log(rectProps);
      console.log(yValue);
      rects.push(
        <rect
          key={i}
          x={x}
          y={yValue}
          rx={rx}
          ry={ry}
          width={rectProps.width}
          height={rectProps.height}
        />
      );
      yValue = yValue + (Number(rectProps.height) + 15);
    }
    return rects;
  };

  return (
    <ContentLoader
      viewBox={viewBox}
      height={height}
      width={width}
      backgroundColor={color}
      foregroundColor="rgba(255, 255, 255, 0.6)"
    >
      {renderRects()}
    </ContentLoader>
  );
}
