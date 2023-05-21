import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './Home.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaBeer, FaSistrix, FaFirefoxBrowser, FaCloudversify, FaFirstOrderAlt,FaCloudShowersHeavy,FaCloud, FaSun} from 'react-icons/fa';
import moment from 'moment/moment';
import _ from 'lodash';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
  const [key, setkey] = useState('');   //set la bien  , setkey la ham
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState('');
  const [Temper, setTemper] = useState('');
  const [weather, setWeather] = useState('');
  const [humidity, setHumidity] = useState('');
  const [feellike,setFeellike]=useState('');
  const [windspeed,setwindspeed]=useState('');
  const [iconweather,seticonweather]=useState('');
 
  

  const [visibility,setvisibility]=useState('');
  const [pressuremeansealevel,setpressuremeansealevel]=useState('');
  let locationglobal={
    lat:null,
    long:null
    
  };
  let searchweather = () => {
    console.log("on click")
    setLoading(true);
    let currentDate = moment().format("yyyyMMDD");
    getLocationByParam(key).then(function(locations) {   //key sau ghi setkey
      getWeatherbylocation(locations,currentDate).then(function(currentWeather){//locations la lay du lieu tu ham getLocationbydiagram va currentdate la lay tu ham searchweathr
          console.log(currentWeather);
          //
          setTemper(currentWeather.temperature);
         // setWeather(cloudtemper)
         setWeather(currentWeather.cloudCoverPhrase);
         setHumidity(currentWeather.relativeHumidity );
         setFeellike(currentWeather.temperatureFeelsLike);
         setwindspeed(currentWeather.windSpeed);
         setpressuremeansealevel(currentWeather.pressureMeanSeaLevel);
         setvisibility(currentWeather.visibility);
       
         checkweather(currentWeather.cloudCoverPhrase);  // party cloud
         



      }).finally(() => {
        setLoading(false);
      }) 
   //locations la du lieu cua ham getlocationbydiagram
    }
    ). catch((error)=>{
        console.log(error);
      }) 
    setTitle("Chao Anh ! ");
  }
///
let checkweather=(itemweather)=>{
 const words = ['Cloudy', "Clear"]
 if(itemweather.includes(words[0])){
  seticonweather(<FaCloud></FaCloud>)
 } else if(itemweather.includes(words[1])) {
  seticonweather(<FaSun></FaSun>)
 } else
 seticonweather(<FaCloudShowersHeavy></FaCloudShowersHeavy>)

}
//
  let getLocationByParam = (key) => {
    const options = {
      method: 'GET',
      url: 'https://weather338.p.rapidapi.com/locations/search',
      params: {
        query: key,
        language: 'en-US'
      },
      headers: {
        'X-RapidAPI-Key': '6c35e01cbfmshf4489bd24b397e3p1c98a0jsn707e0425c236',
        'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
      }
    };
    return axios.request(options).then((response) => {
      console.log(response);
      let data = response.data;
      if(data) {
        
        let location = data.location;
        let locationObj = {
          lat: location.latitude[0],
          long: location.longitude[0]
        }
        locationglobal=locationObj;
        return locationObj;
      }
    }).catch((error)=>{
      console.log(error);
    })
  

  }

  let getWeatherbylocation=(location,currentDate)=>{
    console.log(location)

    const options = {
  method: 'GET',
  url: 'https://weather338.p.rapidapi.com/weather/forecast',
  params: {
    date:currentDate ,
    latitude: location.lat,
    longitude: location.long,
    language: 'en-US',
    units: 'm'
  },
  headers: {
    'X-RapidAPI-Key': '59d5125007msh26ec38e5033c28ap1a2c3bjsnca80de99a5fb',
    'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
  }
};

return axios.request(options).then((response)=>{
  let data = response.data;
  if (data){
    let currentWeather = data["v3-wx-observations-current"];
    return currentWeather;
  }
})
  }
//ham  moi
  let oninputchange =(e)=>{
console.log(e.target.value);
setkey(e.target.value)

  }


    return  (

    <div className='homelayout'>
      <div className='heading'>
         <p>
         Hello !   <span>{Title}</span>
         
         </p>
         <p>
         09:24
         </p>
      </div>
      <div className='inputname'>

      {/* <form > */}
        <input className="w3-input w3-border" type="text" 
        value={key} 
        onChange={oninputchange}
        placeholder='Search something....' />
        <div className='iconinput'> 
        <FaFirefoxBrowser style={{ margin:'0 5px 0px 0' }}></FaFirefoxBrowser>
        
        <a>   
        <button onClick={ searchweather}><FaSistrix ></FaSistrix></button>
       
          </a>
      
        </div>
       
        {/* </form> */}
      {/* <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1"></InputGroup.Text>
        <Form.Control aria-label="Text input with checkbox" />
      </InputGroup> */}
      
      </div>

      {
        (loading) ? <Spinner animation="border" /> : 
          <div>
            <div className='bodyhome'>
              <h4> Warsaw, PL</h4>
              <span >{iconweather}</span>
      <h5 className='info'>{Temper} °C</h5>

      <p > <strong >{weather}</strong> <br></br>
      <span className='info'>Feels like: {feellike} °C</span> 
      <span className='info'>Wind: {windspeed} m/s</span>
      <span className='info'>Visibility: {visibility} km </span><br></br>
      <span className='info'>Humidity: {humidity} % </span>
      <span className='info'>Pressure: {pressuremeansealevel} hPa</span></p>


            </div>

            <div className='info-list'>
            <div className='info-item'>
              <h5>Day</h5>
              <h6>Temperature</h6>
              <h6 style={{fontSize:'168%', color: 'red'}}> {iconweather}</h6> 
              <h6>Clear</h6>
            </div>
            <div className='info-item'>
            <h5>Day</h5>
              <h6>Temperature</h6>
              <h6><FaFirstOrderAlt style={{fontSize:'168%', color: 'red'}}></FaFirstOrderAlt></h6>
              <h6>Clear</h6>
            </div>
            <div className='info-item'>
            <h5>Day</h5>
              <h6>Temperature</h6>
              <h6><FaFirstOrderAlt style={{fontSize:'168%', color: 'red'}}></FaFirstOrderAlt></h6>
              <h6>Clear</h6>
            </div>
            <div className='info-item'>
            <h5>Day</h5>
              <h6>Temperature</h6>
              <h6><FaFirstOrderAlt style={{fontSize:'168%', color: 'red'}}></FaFirstOrderAlt></h6>
              <h6>Clear</h6>
            </div>

            </div>

            <div className='bodyhome'>
      <h5>Rozkład godzinowy</h5>
      <div >

      </div>
            </div>
            <div className='bodyhome'>

            </div>
          </div>
      }


  </div>
    )
    
  };
  
  export default Home;
  