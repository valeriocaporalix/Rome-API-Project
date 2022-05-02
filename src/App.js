import './App.css';
import React from 'react';
import MapboxComponent from "./components/mapbox";

 
export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

    this.state = {
    default : ""
    };

    }

    render() {
        return (
        <div className='App'>
            <div className='header'>
                <div className="topnav">
                    <a className="active" href="#test">Home</a>
                    <a href="#test1">Test 1</a>
                    <a href="#test2">Test 2</a>
                    <a href="#test3">Test 3</a>
                </div>
            </div>
            <div>
                <MapboxComponent />
            </div>
        </div>
        )
    };
}