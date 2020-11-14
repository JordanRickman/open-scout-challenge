import React from 'react';
import ReactTooltip from 'react-tooltip';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { geoEquirectangular } from 'd3';
import worldGeo from '../data/world-110m.json';

import { RegionalUserCount } from '../model/model';
import { formatUserNumber } from '../lib/util';

type UsersChoroplethMapProps = {
  minCount: number;
  maxCount: number;
  regionalUserCounts: RegionalUserCount[];
};

export const UsersChoroplethMap = ({
  minCount,
  maxCount,
  regionalUserCounts
}: UsersChoroplethMapProps) => {
  const paletteScale = scaleLinear()
              .domain([minCount, maxCount])
              .range(["#FFEFEF", 'DarkRed']); // red palette.
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

  const [tooltip, setTooltip] = React.useState<React.ReactNode | null>(null);

  return (
    <>
      <ReactTooltip>{tooltip}</ReactTooltip>
      <ComposableMap projection={geoEquirectangular().scale(130)}
        viewBox="74 52 800 334"
        style={{ border: "1px solid black" }}
        data-tip=""
      >
        <Graticule stroke="#E0E0E0" />
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
                  onMouseEnter={() => {
                    if (data) {
                      const countryName = geo.properties.NAME;
                      setTooltip(<>
                        {countryName}: <strong>{formatUserNumber(data.userCount)}</strong> Users
                      </>)
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltip(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  )
};