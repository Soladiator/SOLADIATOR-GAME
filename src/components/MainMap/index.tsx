'use client'

import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import ImageMapper, { CustomArea, Map } from 'react-img-mapper'
import MapBuildingModal from '../Modals/MapBuildingModals'
import { URL, MAP, Area } from '@/constants/Map'
import { LoadingBackdrop } from '@/components/Backdrops/LoadingBackdrop'
import Image from 'next/image'
import BuildingLabels from '../BuildingLabels'

const MainMap = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0)
  const [scale, setScale] = useState<number>(1)
  const [area, setArea] = useState<CustomArea | Area | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const parentRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(parentRef, {
    applyRubberBandEffect: true,
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        if (width < 640) {
          setInnerWidth(width * 3.848)
        } else if (width < 769) {
          setInnerWidth(width * 1.8)
        } else {
          setInnerWidth(width * 1.3)
        }
        setScale(width / innerWidth)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [innerWidth])

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollLeft =
        innerWidth / 2 - parentRef.current.clientWidth / 2

      setTimeout(() => {
        parentRef.current.scrollLeft =
          innerWidth / 2 - parentRef.current.clientWidth / 2
      }, 550)
    }
  }, [innerWidth, isLoading])

  const handleAreaMouseEnter = () => {
    document.body.style.cursor = 'pointer'
  }

  const handleAreaMouseLeave = () => {
    document.body.style.cursor = 'default'
  }

  return (
    <div
      className="overflow-scroll no-scrollbar max-h-screen"
      ref={parentRef}
      onMouseDown={(e) => {
        if (!area) {
          events.onMouseDown(e)
        }
      }}
    >
      {isLoading && (
        <div
          className={`relative h-screen`}
          style={{
            width: `${innerWidth}px`,
          }}
        >
          <Image
            layout="fill"
            className="object-center object-cover pointer-events-none"
            src={URL}
            alt={'Map'}
          />
          <div className="relative z-1">
            <LoadingBackdrop />
          </div>
        </div>
      )}

      <div
        className={`${!isLoading && 'relative'}`}
        style={{
          width: `${innerWidth}px`,
        }}
      >
        <ImageMapper
          src={URL}
          map={MAP as unknown as Map}
          responsive={true}
          parentWidth={innerWidth}
          strokeColor="rgba(92, 76, 250, 0.4)"
          lineWidth={4}
          onClick={(areaDetails) => {
            setArea(areaDetails)
          }}
          onMouseEnter={handleAreaMouseEnter}
          onMouseLeave={handleAreaMouseLeave}
          onLoad={() => setIsLoading(false)}
        />
        {!isLoading &&
          MAP.areas.map((area) => (
            <BuildingLabels key={area.id} area={area} scale={scale} />
          ))}
      </div>

      {area && (
        <MapBuildingModal selectedArea={area as Area} setArea={setArea} />
      )}
    </div>
  )
}

export default MainMap
