import React from 'react';

//no es un component, es una normal function
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;

//sets up a class with a div that has classes
//It can be used for error handling, for http requests