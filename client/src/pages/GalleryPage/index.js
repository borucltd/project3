import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";


function GalleryPage(props) {
 
  const isLoggedIn = props.loggedInStatus === "LOGGED_IN" ? true : false;

  const mapHeight = "100%";
  const mapWidth = "100%";


  const [sho,setActivities] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
    API.getactivities(props.user.id)
      .then(res => {
        setActivities(res.data)})
      .catch(err => console.log(err))
      }
    }
  )
    


  return (
     <div  className="container mb-5 mt-5">
      {!isLoggedIn
        ? <h1 className="text-center">Please login first!!!</h1>
        : <div>

          <div>
                <h1 className="text-center">View your gallery !!!</h1>                
          </div>
          </div>
      }
    </div>
  );
};

export default GalleryPage;
