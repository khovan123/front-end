import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {updateUserPlaces, fetchingUserPlaces} from './htttp.js';
import Error from './components/Error.jsx';


function App() {
  const selectedPlace = useRef();
  
  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching,setIsFetching]=useState(false);
  const [error,setError]=useState();
  const [errorUpdatePlaces,setErrorUpdatePlaces]=useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(()=>{
    async function getStartingPlaces(){
      setIsFetching(true);
      try {
        const startingPlaces = await fetchingUserPlaces();
        setUserPlaces(startingPlaces);
        // console.log(startingPlaces)
      } catch (error) {
        setError({
          message: error.message||'Failed to fetch user places.'
        })
      }
      setIsFetching(false);
    }
    getStartingPlaces();
  },[])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try { 
      await updateUserPlaces([selectedPlace,...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatePlaces({
        message: error.message||'Failed to update user places.',
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try {
      await updateUserPlaces(userPlaces.filter((place)=>place.id !== selectedPlace.current.id));
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatePlaces({
        message: error.message||'Failed to delete user places.'
      })
    }

    setModalIsOpen(false);
  }, []);

  function handleError(){
    setErrorUpdatePlaces(null);
  }
  return (
    <>
      <Modal open={errorUpdatePlaces} onClose={handleError}>
        {errorUpdatePlaces && <Error title={'An occured error.'} message={errorUpdatePlaces.message} onConfirm={handleError}/>}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title={'An error occured.'} message={error.message}/>}
          {!error && <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          loading={isFetching}
          loadingText={"Fetching your places..."}
          />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
