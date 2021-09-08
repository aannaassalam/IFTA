import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { extent } from "d3";
import ReactTooltip from "react-tooltip";
import LinearGradient from "./LinearGradient.js";

/**
 * Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
 * Looking topojson for other countries/world?
 * Visit: https://github.com/markmarkoh/datamaps
 */
const INDIA_TOPO_JSON = require("./india.topo.json");

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "#EEE";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

export const stateList = [
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Assam", value: "Assam" },
  { label: "Bihar", value: "Bihar" },
  { label: "Chhattisgarh", value: "Chhattisgarh" },
  { label: "Goa", value: "Goa" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Haryana", value: "Haryana" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Jharkhand", value: "Jharkhand" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Kerala", value: "Kerala" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Manipur", value: "Manipur" },
  { label: "Meghalaya", value: "Meghalaya" },
  { label: "Mizoram", value: "Mizoram" },
  { label: "Nagaland", value: "Nagaland" },
  { label: "Odisha", value: "Odisha" },
  { label: "Punjab", value: "Punjab" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Sikkim", value: "Sikkim" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Telangana", value: "Telangana" },
  { label: "Tripura", value: "Tripura" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  // { label: "West Bengal", value: "West Bengal" },
  { label: "West Bengal", value: "West Bengal" },
  { label: "Andaman & Nicobar", value: "Andaman & Nicobar" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
  { label: "Daman and Diu", value: "Daman and Diu" },
  { label: "Delhi", value: "Delhi" },
  { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
  { label: "Ladakh", value: "Ladakh" },
  { label: "Lakshadweep", value: "Lakshadweep" },
  { label: "Puducherry", value: "Puducherry" },
];

function Map(props) {
  let HeatMapData = [
    { id: "AP", state: "Andhra Pradesh", value: 0 },
    { id: "AR", state: "Arunachal Pradesh", value: 0 },
    { id: "AS", state: "Assam", value: 0 },
    { id: "BR", state: "Bihar", value: 0 },
    { id: "CT", state: "Chhattisgarh", value: 0 },
    { id: "GA", state: "Goa", value: 0 },
    { id: "GJ", state: "Gujarat", value: 0 },
    { id: "HR", state: "Haryana", value: 0 },
    { id: "HP", state: "Himachal Pradesh", value: 0 },
    { id: "JH", state: "Jharkhand", value: 0 },
    { id: "KA", state: "Karnataka", value: 0 },
    { id: "KL", state: "Kerala", value: 0 },
    { id: "MP", state: "Madhya Pradesh", value: 0 },
    { id: "MH", state: "Maharashtra", value: 0 },
    { id: "MN", state: "Manipur", value: 0 },
    { id: "ML", state: "Meghalaya", value: 0 },
    { id: "MZ", state: "Mizoram", value: 0 },
    { id: "NL", state: "Nagaland", value: 0 },
    { id: "OD", state: "Odisha", value: 0 },
    { id: "PB", state: "Punjab", value: 0 },
    { id: "RJ", state: "Rajasthan", value: 0 },
    { id: "SK", state: "Sikkim", value: 0 },
    { id: "TN", state: "Tamil Nadu", value: 0 },
    { id: "TS", state: "Telangana", value: 0 },
    { id: "TR", state: "Tripura", value: 0 },
    { id: "UK", state: "Uttarakhand", value: 0 },
    { id: "UP", state: "Uttar Pradesh", value: 0 },
    { id: "WB", state: "West Bengal", value: 0 },
    { id: "WB", state: "West Bengal", value: 0 },
    { id: "AN", state: "Andaman & Nicobar", value: 0 },
    { id: "CH", state: "Chandigarh", value: 0 },
    { id: "DN", state: "Dadra and Nagar Haveli", value: 0 },
    { id: "DD", state: "Daman and Diu", value: 0 },
    { id: "DL", state: "Delhi", value: 0 },
    { id: "JK", state: "Jammu and Kashmir", value: 0 },
    { id: "LA", state: "Ladakh", value: 0 },
    { id: "LD", state: "Lakshadweep", value: 0 },
    { id: "PY", state: "Puducherry", value: 0 },
  ];
  const [tooltipContent, setTooltipContent] = useState("");
  let data = [];

  let payload = props.mapData;
  for (let state of payload) {
    let index = HeatMapData.findIndex((element) => {
      return element.state === state.state.trim();
    });
    if (HeatMapData[index] === undefined) {
      continue;
    }
    HeatMapData[index].value = state.votes;
  }
  data = HeatMapData;

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0),
    total: data.reduce((sum, data) => {
      return (sum += data.value);
    }, 0),
  };

  const colorScale = scaleQuantile()
    .domain(
      extent(
        data.map((d) => {
          return d.value;
        })
      )
    )
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="full-width-height container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={window.innerWidth > 1000 ? 350 : 235}
        height={window.innerWidth > 1000 ? 250 : 225}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find((s) => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <LinearGradient data={gradientData} />
      {/* <div className="center">
          <button className="mt16" onClick={onChangeButtonClick}>Change</button>
        </div> */}
    </div>
  );
}

export default Map;
