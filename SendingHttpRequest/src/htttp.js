export async function fetchingAvailablePlaces(){
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
        if(!response.ok){
          throw new Error('Failed to fetch available places'||undefined);
        }
    return resData.places;
}

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places',{
        method:'PUT',
        body:JSON.stringify({places:places}),
        headers:{
            'Content-Type':'application/json',
        },
    });
    const resData = await response.json();
    if(!response.ok){
        throw new Error('Failed to update user places.');
    }
    return resData.message;
}

export async function fetchingUserPlaces(){
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();
        if(!response.ok){
            throw new Error('Failed to get data user places');
        }
    return resData.places;
}