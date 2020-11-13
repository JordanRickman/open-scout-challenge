import React from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';

import { RegionalUserCount } from '../model/model';

type ChoroplethMapProps = {
  minValue: number;
  maxValue: number;
  regionalUserCounts: RegionalUserCount[];
}

export class ChoroplethMap extends React.Component {
  render() {
    return (
      <div id="choropleth-map" style={{
        height: "360px",
        width: "100%"
      }}></div>
    );
  }

  /* We have to do most of the work in componentDidMount(), because Datamap
     needs a rendered element to attach to. */
  componentDidMount() {
    console.log(this.props); // DEBUG
    const paletteScale = d3.scale.linear()
              .domain([this.props.minValue, this.props.maxValue])
              .range(["#FFEFEF", 'DarkRed']); // red palette. TODO style variable.

    const dataset: {
      [countryCode: string]: {
        value: number;
        fillColor: string;
      }
    } = {};
    this.props.regionalUserCounts?.forEach((dataPoint) => {
      dataset[dataPoint.countryCode] = {
        userCount: dataPoint.userCount,
        fillColor: paletteScale(dataPoint.userCount)
      };
    });

    const defaultFill = '#eee'; // grey
    let map = new Datamap({
      element: document.getElementById('choropleth-map'),
      projection: 'mercator',
      data: dataset,
      geographyConfig: {
        borderWidth: 0.5,
        borderColor: '#444',
        highlightOnHover: true,
        highlightBorderWidth: 2,
        highlightFillColor: function(geo) {
          return geo.fillColor || defaultFill;
        },
        highlightBorderColor: '#000',
        popupOnHover: true,
        popupTemplate: function (geo, data) {
          // don't show tooltip if country isn't present in dataset
          if (!data) { return; }
          return (
            // <ChoroplethTooltip countryName={geo.properties.name} userCount={data.value} />
            ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Count: <strong>', data.userCount, '</strong>',
                    '</div>'].join('')
          );
        }
      },
      fills: {
        defaultFill: defaultFill
      }
    });
  }
}

type ChoroplethTooltipProps = {
  countryName: string,
  userCount: number
}
const ChoroplethTooltip = ({
  countryName,
  userCount
}: ChoroplethTooltipProps) => {
  return (
    <div class="hoverinfo">
      { countryName }: <br />
      <strong>{ userCount }</strong> Users
    </div>
  );
}