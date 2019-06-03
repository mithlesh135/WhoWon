import React from 'react';

export default class Child extends React.Component {

    render() {
        console.log(this.props.check);
        return <h1>{this.props.check}</h1>
    }

}