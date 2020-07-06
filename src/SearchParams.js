import React, {useState} from 'react';
import Results from './Results';

const SearchParams = () => {
    const[people, setPeople] = useState([]);


     async function requestPeople() {
         setPeople([]);
         console.log("updated people: ")
         console.log(JSON.stringify(people))
         fetch('http://localhost:9000/api/listOfPeople')
             .then(res => res.json())
             .then(
                 (result) => {

                     setPeople(result);
                 });

       console.log("updated people: ")
       console.log(JSON.stringify(people))

    };

    /*useEffect( () => {
        fetch('http://localhost:9000/api/listOfPeople')
        .then(res => res.json())
        .then(
            (result) => {
                
                setPeople(result);
            });
    }, [])*/

    return (
            <div>
                <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    requestPeople();

                }}
                
                >
                   <button>Submit</button> 
                </form>
                <Results people={people} />
            </div>
    );

   
}

export default SearchParams;