import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = props => {
    const toggleBtnRef = useRef(null);

    //manage data across components without the need to pass data around the components
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    // componentDidMount and componentDidUpdate combined
    // useEffect(); con [persons] solo va a entrar cuando se actualice "persons" [a,b,c]
    // useEffect(); con [] vacío solo se hace render la primera vez.

    // useEffect(() => {
    //     se ejecuta cada vez que se haga re-render al componente Cockpit, puesto que no maneja el [] al final
    // });

    //se ejecuta después del primer render() o sea te permite cargar el jsx antes de ejecutar el useEffect
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request...
        // setTimeout(() => {
        //     alert('Saved data to cloud!');
        // }, 1000);

        toggleBtnRef.current.click();

        //CLEANUP - no se ejecuta en el primer render, solo cuando se hace remove al componente (unmounted).
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, []);
    //[] pointer para la data que se va a utlizar en el useEffect

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
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
            
        </div>
    );
};

export default React.memo(cockpit);
//wrap in react.memo its the same as shouldcomponentUpdate in class-based components

//useEffect: es un React Hook, que tiene todos(componentDidMount and componentDidUpdate) los metodos del lifecycle de un class-based component.