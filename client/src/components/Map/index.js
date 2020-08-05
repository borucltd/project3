import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import API from "../../utils/API";
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

function LocationPin({text}) {
    return (
        <div className="pin">
            <Icon icon={locationIcon} width="3em" className="pin-icon" style={{color: 'blue'}} />
            <p className="pin-text">{text}</p>
        </div>
    )
}

function Map(props) {

    const [state,setState] = useState({
        height:     props.height,
        width:      props.width,    
        apikey:     props.apikey,
        zoom:       props.zoom,
        position:   {
            lat:    props.latitude,
            lng:    props.longitude
        }
        
    });

    console.log("Key is",state.apikey)
  return (
    <div className="container mb-5 mt-5" style={{ height: state.height, width: state.width}}>                     
        <GoogleMapReact
            bootstrapURLKeys={{ key: state.apikey }}
            defaultCenter={state.position}
            defaultZoom={state.zoom}>

            <LocationPin
           
            lat={state.position.lat}
            lng={state.position.lng}
            />
        </GoogleMapReact>
    </div>
  );
};

export default Map;
