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
            repos: {},
            err: null
        }
    }

    updateState(lang) {
        this.setState({selectedLang: lang, err: null});

        if(!this.state.repos[lang]) {
            fetchData(lang).then(data => {
                this.setState(({ repos }) => ({
                    repos: {
                      ...repos,
                      [lang]: data
                    }
                  }))
            }).catch(err => this.setState({ err }));
        }
    }

    isLoading() {
        let { repos, selectedLang, err } = this.state;

        return !repos[selectedLang] && err === null;
    }

    componentDidMount() {
        this.updateState(this.state.selectedLang);
    }

    render() {
        let { repos, selectedLang, err } = this.state;
        console.log('render now');
        return (
            <React.Fragment>
                <LanguageNav 
                    selectedLang={selectedLang} 
                    updateState={this.updateState.bind(this)}>
                </LanguageNav>

                { err && <p>Error fetching data</p> }

                { this.isLoading() && <p> Loading... </p> }

                { repos[selectedLang] && <pre> {JSON.stringify(repos[selectedLang], null, 2)}</pre> }
            </React.Fragment>
        );
    }
}