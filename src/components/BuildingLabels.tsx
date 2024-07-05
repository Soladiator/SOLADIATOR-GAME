import { Area } from "@/constants/Map";
import React from "react";

interface MapLabelProps {
  area: Area;
  scale: number;
}

const BuildingLabels = ({ area, scale }: MapLabelProps) => {
  return (
    <div
      className="label-container"
      style={{
        left: `${area.labelPercentages[0]}%`,
        top: `${area.labelPercentages[1]}%`,
      }}
    >
      <div className="label-content">{area.title}</div>
    </div>
  );
};

export default BuildingLabels;
