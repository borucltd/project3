import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Map from "../../components/Map";
import Deletebutton from "../../components/Deletebutton";
import "./styles.css"

function FindTrailPage(props) {

  const isLoggedIn = props.loggedInStatus === "LOGGED_IN" ? true : false;
  const mapHeight = "100%";
  const mapWidth = "100%";
  const zoom=12;
  const position="center";


  const [activities,setActivities] = useState([]);
  const [ggk,setGgk] = useState("");
  const awsUrl="https://into-the-trail.s3-ap-southeast-2.amazonaws.com/";
  useEffect(() => {
   
    if (isLoggedIn) {
     API.ggk(props.user.id)
       .then(res => {
   
        setGgk(res.data.key)    
        API.getactivities(props.user.id)
          .then(res => {
            res.data.map((item,index) => {
              item.link = `${awsUrl}${props.user.id}and${item._id}.jpg`
            })
            setActivities(res.data)})
          .catch(err => console.log(err))
          })
       .catch(err => console.log(err))
        }
    
  },[ggk])

  const removeActivity = id => {
   alert("Removing activity "+id)
  };



  return (
    <div  className="container mb-5 mt-5">
      {!isLoggedIn
        ? <h1 className="text-center">Please login first!!!</h1>
        : <div>
            <div>
                  <h1 className="text-center">Your trail activities</h1>   
                  {activities.map((item,index) => (

                    <div key={index} className="flip-card mt-4" >
                      <div className="flip-card-inner">
                        <div className="flip-card-front flip-front">
                        <div class="list-group">
                        <span class="list-group-item active">
                          {item.title}
                        </span>
                        <span class="list-group-item list-group-item-action">category: {item.category}</span>
                        <span class="list-group-item list-group-item-action">distance: {item.distance} km</span>
                        <span class="list-group-item list-group-item-action">time: {item.time} min</span>
                        <span class="list-group-item list-group-item-action ">date: {item.date}</span>
                      </div>                                                 
                        </div>
                          
                        <div className="flip-card-back">
                     
                       <img src={item.link} alt="Nothing" className="img" />
                          <Map 
                            height={mapHeight}
                            width={mapWidth}
                            longitude={item.location.coordinates[0]} 
                            latitude={item.location.coordinates[1]}
                            apikey={ggk}
                            zoom={zoom}
                            position={position}/>  
                            <Deletebutton onClick={() => removeActivity(item._id)}/>
                        </div>

                      </div>
                    </div>
                    
                  ))}    
                         
            </div>
          </div>
      }
    </div>
  );
};

export default FindTrailPage;
