import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'; 
import Popular from './Popular';

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className='container'>
                <Popular/>
            </div>
        );
    }
}

ReactDOM.render(<AppComponent/>, document.getElementById('appComponent'));