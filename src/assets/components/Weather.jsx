import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Weather = () => {
  const [data,setData]= useState({
    celcius:300,
    name:'London',
    humidity :10,
    speed :2,
    image:"/images/clear.png",
    
    
  })
  const [name, setName] = useState('');
   
  const handleClick = () =>{
    if(name !=="")
    {
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric.`
      axios.get(apiUrl)
      .then(res => {

        let imagePath = "";
        if(res.data.weather[0].main =='Clouds'){
          imagePath="/images/cloud.png"

        }
        else if(res.data.weather[0].main =='Clear'){
          imagePath="./images/clear.png"

        }
        else if(res.data.weather[0].main =='Rain'){
          imagePath="./images/rain.png"

        }
        else if(res.data.weather[0].main =='Drizzle'){
          imagePath="./images/drizzle.png"

        }
        else if(res.data.weather[0].main =='Mist'){
          imagePath="./images/mist.png"

        }
        else{
          imagePath="./images/cloud.png"
        }
        
        setData({...data,celcius : res.data.main.temp, name : res.data.name, humidity : res.data.main.humidity, speed: res.data.wind.speed, image:imagePath})
      })
      .catch(err => console.log(err))

    }
    
  }
  
  return (
    <div className='container app d-flex align-items-center  justify-content-center'>
      <div style={{width:'40%', height:'100vh'}} className='weatherDiv rounded p-5'>
        <div className="search d-flex align-items-center  justify-content-center" >
          <input type='text' style={{width:'90%', height:'50px'}} className='rounded-pill ps-3' placeholder='Enter City Name' onChange={e => setName(e.target.value)}  /> 
          <button className='bg-light rounded-circle ms-3' onClick={handleClick} style={{height:'50px', width:'50px'}}><i class="fa-solid fa-magnifying-glass" ></i></button>

          
        </div>
        <div className="winfo text-center text-light">
          <img src={data.image} alt="" />
          <h1>{data.celcius} K</h1>
          <h1>{data.name}</h1>
          <div className="details row mt-4">
            <div className="col-6">
              <img src=".\images\humidity.png" alt="" />
              <div>
                <p className='fw-bolder'>{data.humidity}</p>
                <p className='fw-bolder'>Humidity</p>
              </div>
            </div>
            <div className="col-6">
            <img src=".\images\wind.png" alt="" />
            <div>
                <p className='fw-bolder'>{data.speed}</p>
                <p className='fw-bolder'>Wind</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Weather
