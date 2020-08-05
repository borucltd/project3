import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import differenceInMinutes from 'date-fns/differenceInMinutes';
import API from "../../utils/API";
import axios from "axios";


function AddTrailPage(props) {

  const [state,setState] = useState({
    startDate: new Date(),
    stopDate: new Date(),
    categories: [
      "run",
      "hike",
      "walk",
      "ride"
    ]
  });

  const [s3,setS3] = useState({});

  const [activity,setActivity] = useState({
    title: "",
    category: "",
    distance: 0,
    time: 0,
    date: "",
    filename: "",
    longitude: 0,
    latitude: 0
  });

  const totaltimeRef = useRef(null);
  const fileRef = useRef();
 
  useEffect(() => {

    let minutes = differenceInMinutes(state.stopDate,state.startDate) 
    if (minutes < 0) {
      minutes = 0
    }
    
    setActivity({
      ...activity,
      "time": minutes
    })

  },[state.startDate,state.stopDate])

  const isLoggedIn = props.loggedInStatus === "LOGGED_IN" ? true : false;

  function handleChange(event) {
    event.preventDefault();
    if (event.target.name === "file") {
      setActivity({
        ...activity,
        "filename": event.target.files[0].name,
        "file": event.target.files[0]
      })
    } else {
      setActivity({
        ...activity,
        [event.target.name]: event.target.value
      })
    }

  }

  function handleSubmit(event) {

    event.preventDefault()

    console.log("======================")
    const newActivity = {
        "userid": props.user.id,
        "title" : activity.title,
        "category": activity.category,
        "distance": activity.distance,
        "time": activity.time,
        "date": activity.date,
        "filename": activity.filename,
        "longitude":activity.longitude,
        "latitude": activity.latitude
     }

    // api call to add activity to user in mongodb
    console.log("Adding to mongodb",activity);
    let savedActivity;
    API.addactivity(newActivity)
       .then(res => {
          // when we added activity to mongo, we can then collect its _id from res
          let activityId = res.data.activity
          console.log("User id:",props.user.id);
          console.log("Activity id: ",res.data);
          let newfile = props.user.id+"and"+activityId;
          console.log("New file: ", newfile);
          uploadImage(newfile,activity.filename);
        })
       .catch(err => console.log(err))   
  }


  function uploadImage(newfile, file){

    // real file
    let realfile=activity.file;
    // separate type from the name
    let fileParts = file.split('.');
    // file = userid+activityid
    let fileName = newfile;
    let fileType = fileParts[1];
    console.log(fileType)
    console.log("Preparing the upload");
    axios.post("/api/aws/s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      let returnData = response.data.data.returnData;
      let signedRequest = returnData.signedRequest;
      let url = returnData.url;
      setS3({url: url})
      console.log("Recieved a signed request " + signedRequest);

      // S3 needs to know what are we uploading
      let options = {
        headers: {
          'Content-Type': fileType
             }
      };
      axios.put(signedRequest,realfile,options)
      .then(result => {
        console.log("Response from s3", result)
        setS3({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }


  
  return (
    <div  className="container mb-5 mt-5">
      {!isLoggedIn
        ? <h1 className="text-center">Please login first!!!</h1>
        : <div>
          <form onSubmit={handleSubmit}> 

            <div className="form-row">
              
              <div className="form-group col-md-6">
                <label htmlFor="title">Title</label>
                <input type="string" className="form-control" id="title" name="title" placeholder="Title" onChange={handleChange}/>
              </div>
              
              <div className="form-group col-md-6">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" className="form-control" defaultValue="Choose..." onChange={handleChange}>
                    <option>Choose...</option>
                    {state.categories.map((item,index) => (
                     <option key={index}>{item}</option>
                    ))}
                  </select>
              </div>

            </div>

            <div className="form-row">

              <div className="form-group col-md-6">
                <label htmlFor="startdate">Start time:</label>
                <DatePicker
                    selected={state.startDate} 
                    onChange={(date) => {
                      setState({...state,
                        "startDate": date
                      })
                      setActivity({...activity,
                        "date": date
                      })
                    
                    }}
                    showTimeSelect
                    timeIntervals={5}
                    dateFormat="Pp" 
                    timeFormat="HH:mm"
                  />  
              </div>
              
              <div className="form-group col-md-6">
                <label htmlFor="stopdate">Finish time:</label>
                <DatePicker
                    selected={state.stopDate} 
                    onChange={(date) => {
                      setState({...state,
                        "stopDate": date
                      })
                      console.log(state)
                    }}
                    showTimeSelect
                    timeIntervals={5}
                    dateFormat="Pp" 
                    timeFormat="HH:mm" 
                  />  
              </div>
              </div>
              
              <div className="form-row">
              
                <div className="form-group col-md-6">
                  <label htmlFor="totaltime">Total time[min]:</label>
                  <input type="number" className="form-control" id="time" name="time" placeholder="time" value={activity.time} />                  
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="totaldistance">Total distance[km]:</label>
                  <input type="number" className="form-control" id="distance" name="distance" placeholder="Distance"  defaultValue={0} min="0" max="9999" step="0.5" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-row">
              
                <div className="form-group col-md-6">
                  <label htmlFor="longitude ">Longitude:</label>
                  <input type="number" step="0.000001" className="form-control" id="longitude" name="longitude" placeholder="0" onChange={handleChange}/>                  
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="totaldistance">Latitude:</label>
                  <input type="number" step="0.000001" className="form-control" id="latitude" name="latitude" placeholder="0"   onChange={handleChange}/>
                </div>
            </div>

            <div className="form-row">
              
                <div className="form-group col-md-6">
                  <label htmlFor="file ">Add picture:</label>
                  <input type="file" className="form-control" id="file" name="file" ref={fileRef} onChange={handleChange} accept="image/*"/>                
                </div>
            </div>

                     
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
          </div>
    }
  </div>
  );
}

export default AddTrailPage;
