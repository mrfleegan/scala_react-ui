import React from 'react';
//import { Link } from '@reach/router';
export default function Person({firstName, mi, lastName, age, occupation }) {
    return (
        <div>
            <h1>{firstName} {mi} {lastName}</h1>
            <h2>{age}</h2>
            <h2>{occupation}</h2>
        </div>
     );   
} 