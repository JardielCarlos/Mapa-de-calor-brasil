import { scaleQuantile } from "d3-scale";
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
// import { Tooltip } from "@chakra-ui/react";
import "../styles/toolTipMapa.css";

const geoUrl = "https://raw.githubusercontent.com/giuliano-macedo/geodata-br-states/main/geojson/br_states.json";

// const nivelAlfab = {
//   "AC": 95.0,
//   "AL": 88.5,
//   "AP": 92.3,
//   "AM": 91.8,
//   "BA": 89.7,
//   "CE": 87.2,
//   "DF": 98.3,
//   "ES": 95.6,
//   "GO": 96.0,
//   "MA": 86.1,
//   "MT": 95.5,
//   "MS": 96.1,
//   "MG": 95.4,
//   "PA": 90.9,
//   "PB": 89.8,
//   "PR": 96.6,
//   "PE": 88.9,
//   "PI": 87.5,
//   "RJ": 98.0,
//   "RN": 89.2,
//   "RS": 97.3,
//   "RO": 94.9,
//   "RR": 95.8,
//   "SC": 98.0,
//   "SP": 97.7,
//   "SE": 88.0,
//   "TO": 90.0
// };

const TotalCBO = [
  {
    cod_ocupacao_cbo: "1234567",
    codigo_uf: "SP",
    inicio_mov: "01/2023",
    fim_mov: "12/2023",
    saldo: 100
  },
  {
    cod_ocupacao_cbo: "1234567",
    codigo_uf: "RJ",
    inicio_mov: "01/2023",
    fim_mov: "12/2023",
    saldo: 50
  },
  {
    cod_ocupacao_cbo: "1234568",
    codigo_uf: "PB",
    inicio_mov: "01/2023",
    fim_mov: "12/2023",
    saldo: 80
  },{
    cod_ocupacao_cbo: "1234568",
    codigo_uf: "PE",
    inicio_mov: "06/2023",
    fim_mov: "08/2023",
    saldo: 65
  },{
    cod_ocupacao_cbo: "1234568",
    codigo_uf: "AM",
    inicio_mov: "01/2023",
    fim_mov: "02/2024",
    saldo: 32
  },{
    cod_ocupacao_cbo: "7963152",
    codigo_uf: "AP",
    inicio_mov: "10/2023",
    fim_mov: "12/2023",
    saldo: 87
  },
  // ... outros objetos
]
 

const MapChart = () => {
  const [showLiteracyHeatmap, setShowLiteracyHeatmap] = useState(false);
  const [originalColor, setOriginalColor] = useState();
  const [inputCBO, setInputCBO] = useState('');
  const [filterCBO, setFilterCBO] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");

  const colorScale = scaleQuantile()
    .domain(filterCBO.map(obj => obj.saldo))
    .range(["#c2e699", "#78c679", "#238443"]);

  const handleFilter = () => {
    const filteredObjects = TotalCBO.filter(obj => obj.cod_ocupacao_cbo === inputCBO);
    console.log(filteredObjects);
    return filteredObjects;
  };
  
  useEffect(() => {
    setFilterCBO(handleFilter())
  }, [inputCBO])

  console.log(tooltipContent);
  return (
    <>
      <ComposableMap 
        projectionConfig={{ 
          scale: 500,
          rotation: [-50, 0, 0],
          center: [-55, -15]
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const siglaState = geo.properties.SIGLA;
              const estadoFiltrado = filterCBO.find(obj => obj.codigo_uf === siglaState)
              return (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo}
                  onClick={() => {
                    console.log("Clicado no estado:", geo.properties);
                  }}
                  onMouseEnter={() => {
                    setTooltipContent(estadoFiltrado ? `Saldo: ${estadoFiltrado.saldo}` : "");
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: estadoFiltrado ? colorScale(estadoFiltrado.saldo) : "#ECEFF1",
                      outline: "none",
                    },
                    hover: {
                      fill: "#CFD8DC",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#B0BEC5",
                      outline: "none"
                    }
                  }}
                  stroke="#000000"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={estadoFiltrado ? `${geo.properties.SIGLA} -  Saldo: ${estadoFiltrado.saldo}` : null}
                  // data-tooltip-place="top"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Tooltip id="my-tooltip" 
        // style={{ backgroundColor: "blue", color: "white", borderRadius:"4px", fontSize: "24px"}} 
      >
        
      </Tooltip>
      <label>
        <input
          type="checkbox"
          checked={showLiteracyHeatmap}
          onChange={() => {
            setShowLiteracyHeatmap(!showLiteracyHeatmap);
            setOriginalColor(showLiteracyHeatmap ? originalColor : "#ECEFF1");
          }}
        />
        Mostrar Mapa de Calor de Alfabetização
      </label>
      <input type="text" onChange={(e) => setInputCBO(e.target.value)}/>
    </>  
  );
};

export default MapChart;
