import React,{Component} from  'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';


class Person extends Component {
    constructor(props){
        super(props);
        //creamos una referencia del input para manipular sus eventos
        this.inputElementRef = React.createRef();
    }

    //to use the injected AuthContext properties
    static contextType = AuthContext;

    componentDidMount(){
        //this.inputElement.focus();

        //manipulación de la referencia del input
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');
        return(

        //empty wrapper using special children(reserved proprety name) antes usaba Auxiliary
        <Auxiliary>
            {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
            <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input ref={this.inputElementRef} type="text" onChange={this.props.changed} value={this.props.name} />
        </Auxiliary>
            // <div className={classes.Person}>
                
            // </div>
            );
    }
};

//needs to install npm install --save prop-types
//define wich props this component uses
//usefull when building a component library
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);
