import { useEffect, useState } from 'react';
import Error from './Error.jsx';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.jsx';
import {fetchingAvailablePlaces} from '../htttp.js';
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces,setAvailablePlaces]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState();
  useEffect(()=>{
    console.log('Fetching...');
    async function fetchingPlaces  (){
      setIsLoading(true);
      try {
        const places = await fetchingAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          // setIsLoading(false);
        })
        // if(!navigator.geolocation){
        //   console.log('Default')
        //   setAvailablePlaces(resData.places);
        // }
        setIsLoading(false);
      } catch (error) {
        setError({message:error.message||'Could not fetch available places. Please try again later!'})
        setIsLoading(false);
      }
    }
    fetchingPlaces();
  },[]);
  if(error){
    return <Error title={'Error above occured'} message={error.message}/>
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText={"No places available."}
      onSelectPlace={onSelectPlace}
      loading={isLoading}
      loadingText={"Fetching available places..."}
    />
  );
}
