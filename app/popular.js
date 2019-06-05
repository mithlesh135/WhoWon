import React from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../utils/api';
import { FaStar, FaCodeBranch, FaUser, FaExclamationTriangle } from 'react-icons/fa';

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

function GridComponent(repos) {
    return ( 
        <ul>
            {
                repos.data.map((data, index) => {
                    const { name, owner, html_url, stargazers_count, forks, open_issues } = data;
                    const { login, avatar_url } = owner

                    return (
                        <li key={html_url}>
                            <h4>
                                #{index + 1}
                            </h4>
                            <img src={avatar_url}></img>
                            <h2>
                                <a href={`https://github.com/${login}`}>{login}</a>
                            </h2>
                            <ul>
                                <li>
                                    <FaUser color='rgb(255, 191, 116)' size={22} />
                                    <a href={`https://github.com/${login}`}>
                                    {login}
                                    </a>
                                </li>
                                <li>
                                    <FaStar color='rgb(255, 215, 0)' size={22} ></FaStar>
                                    {stargazers_count} stars
                                </li>
                                <li>
                                    <FaCodeBranch color='rgb(129, 195, 245)' size={22}/>
                                    {forks} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                    {open_issues} open issues
                                </li>
                            </ul>
                        </li>
                    );
                })
            }
        </ul>
    );

}

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

                { repos[selectedLang] && <GridComponent data={repos[selectedLang]}/> }
            </React.Fragment>
        );
    }
}