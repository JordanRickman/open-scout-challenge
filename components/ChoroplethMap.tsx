import React from 'react';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoEquirectangular } from 'd3';
import worldGeo from '../data/world-110m.json';

import { RegionalUserCount } from '../model/model';

type ChoroplethMapProps = {
  minValue: number;
  maxValue: number;
  regionalUserCounts: RegionalUserCount[];
};

export const ChoroplethMap = ({
  minValue,
  maxValue,
  regionalUserCounts
}: ChoroplethMapProps) => {
  const paletteScale = scaleLinear()
              .domain([minValue, maxValue])
              .range(["#FFEFEF", 'DarkRed']); // red palette. TODO style variable.
  const defaultFill = '#EEE'; // grey

  const dataset: {
    [countryCode: string]: {
      userCount: number;
      fillColor: string;
    }
  } = {};
  regionalUserCounts?.forEach((dataPoint) => {
    dataset[dataPoint.countryCode] = {
      userCount: dataPoint.userCount,
      fillColor: paletteScale(dataPoint.userCount)
    };
  });

  return (
    <ComposableMap projection={geoEquirectangular().scale(130)}
      viewBox="74 52 800 334"
      style={{ border: "1px solid black" }}
    >
      <Geographies geography={worldGeo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const data = dataset[geo.properties.ISO_A3]
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={data ? data.fillColor : defaultFill}
                stroke="black"
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
};