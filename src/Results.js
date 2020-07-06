import React from "react";
import Person from "./Person";

const Results = ({ people }) => {
  return (
    <div className="search">
      {people.length === 0 ? (
        <h1>no one found.</h1>
      ) : (
        people.map((person) => (
          <Person
            key={person.lastName + person.age}
            firstName={person.firstName}
            mi={person.mi}
            lastName={person.lastName}
            age={person.age}
            occupation={person.occupation}
          />
        ))
      )}
    </div>
  );
};

export default Results;
