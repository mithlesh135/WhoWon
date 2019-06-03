import React from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../utils/api';

function LanguageNav({selectedLang, updateState}) {
    const langs = ['All', 'Javascript', 'Ruby', 'Python', 'Java'];

    return (
            <ul className='flex-center'>
                {
                    langs.map(lang => {
                        return <li key={lang}>
                            <button 
                                onClick={ () => updateState(lang) } 
                                className="nav-link btn-clear"
                                style ={ lang === selectedLang ? {color : 'rgb(187, 46,31)'} : null }>
                                    {lang}
                            </button>
                        </li>
                    })
                }
            </ul>
    );
}

LanguageNav.propTypes = {
    selectedLang: PropTypes.string.isRequired,
    updateState: PropTypes.func.isRequired
};

export default class Popular extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedLang : 'All',
            details: null,
            err: null
        }
    }

    updateState(lang) {
        this.setState({selectedLang: lang, data: null, err: null});

        fetchData(lang).then(data => this.setState({ data })).catch(err => this.setState({ err }));
    }

    isLoading() {
        return this.state.data == null && this.state.err === null;
    }

    componentDidMount() {
        this.updateState(this.state.selectedLang);
    }

    render() {
        return (
            <React.Fragment>
                <LanguageNav 
                    selectedLang={this.state.selectedLang} 
                    updateState={this.updateState.bind(this)}>
                </LanguageNav>

                { this.state.err && <p>Error fetching data</p> }

                { this.isLoading() && <p> Loading... </p> }

                { this.state.data && <pre> {JSON.stringify(this.state.data, null, 2)}</pre> }
            </React.Fragment>
        );
    }
}