import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const leafletMarkersRef = useRef({});

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = L.map(mapRef.current).setView(
      [-33.42741402295673, -70.6114692339677],
      18
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    addMarker(lat, lng);
  };

  const addMarker = (lat, lng) => {
    if (!map) return;

    const newMarker = {
      id: Date.now(),
      latlng: [lat, lng],
      info: "",
    };

    const leafletMarker = L.marker([lat, lng]).addTo(map);
    leafletMarker.on("click", () => handleMarkerClick(newMarker));

    leafletMarkersRef.current[newMarker.id] = leafletMarker;

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoChange = (e) => {
    setSelectedMarker({ ...selectedMarker, info: e.target.value });
  };

  const saveMarkerInfo = () => {
    setMarkers(
      markers.map((m) => (m.id === selectedMarker.id ? selectedMarker : m))
    );
    setSelectedMarker(null);
  };

  const deleteMarker = () => {
    if (!selectedMarker) return;

    const leafletMarker = leafletMarkersRef.current[selectedMarker.id];
    if (leafletMarker && map) {
      map.removeLayer(leafletMarker);
    }

    delete leafletMarkersRef.current[selectedMarker.id];

    setMarkers(markers.filter((m) => m.id !== selectedMarker.id));
    setSelectedMarker(null);
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-primary text-white p-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 mb-0">Municipalidad X</h1>
            </div>
            <div className="col-auto">
              <span className="me-2">User name</span>
              <div
                className="rounded-circle bg-white"
                style={{ width: "32px", height: "32px" }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow-1 bg-light p-3">
        <div className="container-fluid">
          <div className="row h-100">
            {/* Left column */}
            <div className="col-md-3 mb-3">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  Seleccione una opción a realizar:
                </button>
                <button className="btn btn-outline-secondary">
                  Formulario de Incidencias
                </button>
                <button className="btn btn-outline-secondary">
                  Reportes De Incidencia
                </button>
              </div>
            </div>

            {/* Middle column (Map) */}
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div
                  ref={mapRef}
                  style={{ height: "400px", width: "100%" }}
                ></div>
                <div className="card-body">
                  <p>
                    Haz clic en el mapa para añadir un marcador de incidencia.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-md-3">
              {selectedMarker ? (
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Información del Marcador</h5>
                    <textarea
                      className="form-control mb-2"
                      value={selectedMarker.info}
                      onChange={handleInfoChange}
                      placeholder="Añade información sobre esta incidencia"
                    />
                    <button
                      className="btn btn-primary me-2"
                      onClick={saveMarkerInfo}
                    >
                      Guardar
                    </button>
                    <button className="btn btn-danger" onClick={deleteMarker}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Ultimas Notificaciones</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Actualización de progreso de una incidencia
                      </li>
                      <li className="list-group-item">
                        Se completó una incidencia pendiente
                      </li>
                      <li className="list-group-item">
                        Notificar la llegada de un nuevo formulario de
                        incidencias que haya sido llenado
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Marcadores añadidos</h5>
                  <p>Número de incidencias: {markers.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
