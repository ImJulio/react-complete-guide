import React, { Component } from 'react';

import classes from './App.css';
// import Radium, {StyleRoot} from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  //create lifecycle 1
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
    //se puede hacer this.state y es lo mismo que el state de abajo, pero el de abajo es mas moderno.
  }

  state = {
    persons: [
      { id:'asfa1', name: 'Max', age: 28 },
      { id:'vasdf1', name: 'Manu', age: 29 },
      { id:'asdf11', name: 'Stephanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  }
  //create lifecycle 2
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  //create lifecycle 4 aquí se pueden hacer las http requests
  componentDidMount() {
    console.log('[App.js] componentDidMount'); 
  }
  
  //may cancel updating process (decide to continue or not)
  shouldComponentUpdate(nextProps, nextState) { //used for performance improvements
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() { //fetching new data from a server (o sea otro http req?)
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //se usa slice para copiar el arreglo sin modificarlo (porque los arreglos se pasan by ref)
    const persons = [...this.state.persons]; //equivale a lo mismo (immutable fashion)
    persons.splice(personIndex, 1); //remover elemento del arreglo
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => { //event es para hacer referencia al elemento del DOM al que le estamos haciendo bind
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //de esta forma no se pasa como ref desde el state, sino que crea una nueva variable
    const person = { 
      ...this.state.persons[personIndex]
    }

    //forma vieja de asignar variables sin pasar por referencia
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person; //actualizar el dom con el modelo editado

    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    //const doesShow = this.state.showPersons;
    this.setState({showPersons: !this.state.showPersons})
  }

  //create lifecycle 3
  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler} />;
    }
    
    return (
      <div className={classes.App}>
        <button onClick={() => {
          this.setState({showCockpit: false})
          }}>Remove Cockpit</button>
        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler} /> : null }
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this works now?'));
  }
}

export default App;
//ESTE ES UN CLASS-BASED COMPONENT
//es mejor usar el bind en lugar del arrow func

//update component lifecycle
//1. getDerivedStateFromProps(props, state)
//2. shouldComponentUpdate(nextProps, nextState)
//3. render()
//4. Update Child omponent Props
//5. getSnapshotBeforeUpdate(prevProps, prevState)  -- Last-minute DOM ops
//6. componentDidUpdate() -- http requests. carefull to not create loops here cause triggers re-render o sea no llamar setState