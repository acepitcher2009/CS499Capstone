import { Box } from "@mui/material";
import {
  CircleMarker,
  FeatureGroup,
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { setAnimalsInArea } from "../../redux/AnimalSlice";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

//renders dashboard map on dashboard
const DashboardMap = () => {
  const [bounds, setBounds] = useState(null);
  const [centerPnt, setCenterPnt] = useState(null);
  const [radius, setRadius] = useState(null);
  const { animals, animalsInArea } = useSelector((state) => state.animal);

  //sets the default zoom and center point of the map
  const defaultZoom = 5;
  const defaultCenter = [30.5066, -97.3408];
  const dispatch = useDispatch();

  //sets local state of bounds radius and centerPnt for logic regarding animals in a specific area
  const onCreate = (e) => {
    if (e.layerType === "rectangle") {
      setBounds(e.layer.getBounds());
    }
    if (e.layerType === "circle") {
      setRadius(e.layer.getRadius());
      setCenterPnt(e.layer.getLatLng());
    }
  };

  //performs the deletiong of shapes when drawing on the map
  //empties the array of animals stored in redux
  const onDelete = (event) => {
    dispatch(setAnimalsInArea([]));
  };

  //checks for geo coordinates inside of drawn rectangle then pushes the animal to redux
  useEffect(() => {
    if (bounds) {
      const animalsInRect = [];
      animals.animals.map((animal) => {
        if (bounds.contains([animal.lat, animal.lng])) {
          animalsInRect.push(animal);
        }
        dispatch(setAnimalsInArea({ animalsInArea: [...animalsInRect] }));
        return true;
      });
    }
  }, [bounds]); //eslint-disable-line

  //checks if geo coordinates of animal are within circle then pushes to redux
  useEffect(() => {
    if (centerPnt && radius) {
      const animalsInCircle = [];
      animals.animals.map((animal) => {
        if (centerPnt.distanceTo([animal.lat, animal.lng]) < radius) {
          animalsInCircle.push(animal);
        }
        dispatch(setAnimalsInArea({ animalsInArea: [...animalsInCircle] }));
        return true;
      });
    }
    
  }, [centerPnt, radius]); //eslint-disable-line
  console.log(animalsInArea);
  //renders the map on the dashboard
  return (
    //mui box that acts as a div
    <Box sx={{ display: "block", marginTop: 10 }}>
      {/* container used to implement the geolocation map */}
      <MapContainer
        zoom={defaultZoom}
        center={defaultCenter}
        scrollWheelZoom
        className="map"
        zoomControl
      >
        {/* sets the tile layer to open streets view of the map this will most likely change to a satellite view before this project is over */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          no-wrap
        />
        {/* feature group is a container that holds the drawing options for the map. This is an absolute must have for any type of drawing you want to do  */}
        <FeatureGroup>
          {/* sets the controll panel for which shapes or objects can be drawn on the map */}
          <EditControl
            position="topright"
            onCreated={onCreate}
            onDeleted={onDelete}
            draw={{
              polygon: false,
              rectangle: true,
              circle: true,
              polyline: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
        {animals && 
          animals.animals.map((animal) => (
            <CircleMarker
              key={animal._id}
              center={[animal.lat, animal.lng]}
              radius={7}
            />
          ))}
      </MapContainer>
    </Box>
  );
};
export default DashboardMap;
