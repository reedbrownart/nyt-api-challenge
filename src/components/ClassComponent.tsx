import React, { Component } from 'react';
import FunctionalComponent from './FunctionalComponent';

interface IState {
    searchTerm: string;
    startDate: string;
    endDate: string;
    baseURL: string;
    apiKey: string;
    pageNumber: number;
    fetchURL: string;
    fetchReturn: FetchData[];
}

interface FetchData {
    // abstract: string;
    // //byline: object;
    // document_type: string;
    // //headline: object;
    // //keywords: object[];
    // lead_paragraph: string;
    // //multimedia: object[];
    // news_desk: string;
    // print_page: string;
    // print_section: string;
    // pub_date: string;
    // section_name: string;
    // snipped: string;
    // source: string;
    // type_of_material: string;
    // uri: string;
    // web_url: string;
    // word_count: number;
    // _id: string;
}

class ClassComponent extends Component<{}, IState> {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            startDate: "",
            endDate: "",
            baseURL: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            apiKey: "ZqDkjQ09G7Z1BGgscR8IZvVlfQCLRUdq",
            pageNumber: 0,
            fetchURL: "",
            fetchReturn: []
        }
    }

    createURL = () => {
        this.setState({
            fetchURL: `${this.state.baseURL}?api-key=${this.state.apiKey}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`
        })

        if (this.state.startDate !== "") {
            this.setState({
                fetchURL: `${this.state.fetchURL}&begin_date=${this.state.startDate}`
            })
        }

        if (this.state.endDate !== "") {
            this.setState({
                fetchURL: `${this.state.fetchURL}&end_date=${this.state.endDate}`
            })
        }
    }

    fetchResults = async (e) => {
        e.preventDefault();
        console.log('you have clicked submit and we are fetching the results')
        // console.log(this.state.searchTerm);
        // console.log(this.state.startDate);
        // console.log(this.state.endDate);

        await this.createURL();

        fetch(this.state.fetchURL)
            .then((res) => res.json())
            .then((json) => this.displayResults(json))
            .catch((err) => console.log(err))

    }

    displayResults = (json) => {

        this.setState(
            {
                fetchReturn: json.response.docs
            }
        )
    }

    render() {
        return (
            <div>
                <h1>NY Times video search</h1>

                <div className="wrapper">
                    <div className="controls">
                        <form onSubmit={this.fetchResults}>
                            <p>
                                <label htmlFor="search">Enter a SINGLE search term (required): </label>
                                <input
                                    type="text"
                                    id="search"
                                    className="search"
                                    onChange={(e) => { this.setState({ searchTerm: e.target.value }) }} required />
                            </p>
                            <p>
                                <label htmlFor="start-date">Enter a start date (format YYYYMMDD):</label>
                                <input
                                    type="date"
                                    id="start-date"
                                    className="start-date"
                                    pattern="[0-9]{8}"
                                    onChange={(e) => { this.setState({ startDate: e.target.value }) }}
                                />
                            </p>
                            <p>
                                <label htmlFor="end-date">Enter an end date (format YYYYMMDD): </label>
                                <input
                                    type="date"
                                    id="end-date"
                                    className="end-date"
                                    pattern="[0-9]{8}"
                                    onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                                />
                            </p>
                            <p>
                                <button className="submit" type="submit">Submit search</button>
                            </p>
                        </form>
                    </div>
                    <FunctionalComponent fetchReturn = {this.state.fetchReturn}/>
                </div>
            </div>
        )
    }
}

export default ClassComponent;