import React from 'react';
import d3 from 'd3';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
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
  const paletteScale = d3.scale.linear()
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
    <ComposableMap>
      <Geographies geography={worldGeo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const data = dataset[geo.properties.ISO_A3]
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={data ? data.fillColor : defaultFill}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
};