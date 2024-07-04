"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import ImageMapper, {
  CustomArea,
  ImageMapperProps,
  Map,
} from "react-img-mapper";
import MapBuildingModal from "../Modals/MapBuildingModals";
import { URL, MAP, Area } from "@/constants/Map";
import { LoadingBackdrop } from "@/components/Backdrops/LoadingBackdrop";
import Image from "next/image";

const MainMap = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [area, setArea] = useState<CustomArea | Area | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const parentRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(parentRef, {
    applyRubberBandEffect: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setInnerWidth(window.innerWidth * 3.848);
        return;
      } else if (window.innerWidth < 769) {
        setInnerWidth(window.innerWidth * 1.8);
        return;
      }
      setInnerWidth(window.innerWidth * 1.3);
    }
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollLeft =
        innerWidth / 2 - parentRef.current.clientWidth / 2;

      setTimeout(() => {
        parentRef.current.scrollLeft =
          innerWidth / 2 - parentRef.current.clientWidth / 2;
      }, 550);
    }
  }, [innerWidth, isLoading]);

  const handleAreaMouseEnter = () => {
    document.body.style.cursor = "pointer";
  };

  const handleAreaMouseLeave = () => {
    document.body.style.cursor = "default";
  };

  return (
    <div
      className="overflow-scroll no-scrollbar max-h-screen"
      ref={parentRef}
      {...events}
    >
      {isLoading && (
        <div className={`relative w-[${innerWidth}px] h-[104vh]`}>
          <Image
            layout="fill"
            className="object-center object-cover pointer-events-none"
            src={URL}
            alt={"Map"}
          />
          <div className="relative z-1">
            <LoadingBackdrop />
          </div>
        </div>
      )}

      <div className={`${isDragging ? "pointer-events-none" : ""}`}>
        <ImageMapper
          src={URL}
          map={MAP as unknown as Map}
          responsive={true}
          parentWidth={innerWidth}
          strokeColor="rgba(92, 76, 250, 0.4)"
          lineWidth={4}
          onClick={(areaDetails) => {
            setArea(areaDetails);
          }}
          onMouseEnter={handleAreaMouseEnter}
          onMouseLeave={handleAreaMouseLeave}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {area && (
        <MapBuildingModal selectedArea={area as Area} setArea={setArea} />
      )}
    </div>
  );
};

export default MainMap;
