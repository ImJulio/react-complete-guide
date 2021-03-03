import React, { useEffect } from 'react';

import classes from './Cockpit.css';

const cockpit = props => {

    // componentDidMount and componentDidUpdate combined
    // useEffect(); con [persons] solo va a entrar cuando se actualice "persons" [a,b,c]
    // useEffect(); con [] vacío solo se hace render la primera vez.
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request...

        setTimeout(() => {
            alert('Saved data to cloud!');
        }, 1000);

        //no se ejecuta en el primer render, solo cuando se hace remove al componente (unmounted).
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }
    
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red); // clases = ['red']
    }
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>
    );
};

export default React.memo(cockpit);


//useEffect: es un React Hook, que tiene todos(componentDidMount and componentDidUpdate) los metodos del lifecycle de un class-based component.