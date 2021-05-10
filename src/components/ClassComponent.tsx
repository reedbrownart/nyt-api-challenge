import React, { Component } from 'react';
import FunctionalComponent from './FunctionalComponent';

//This creates a series of stateful variables used to perform fetches and store articles
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

//This interface allows the data to be stored, though I'm not sure why!
interface FetchData {

}

//This class component is where most of the logic happens for user interaction and fetching
class ClassComponent extends Component<{}, IState> {

    //first we set most of our variables to empty except for the URL and page numbers
    //In retrospect I don't know if there is a valid reason for the baseurl and api key to be stateful
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

    //This function creates a fetch URL based on the user's search and whether or not they added dates
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

    //This async function awaits the creation of a fetchURL above ^^^^
    //and then performs a fetch of ten articles
    fetchResults = async () => {
        console.log('you have clicked submit and we are fetching the results')
        console.log('your page number is ', this.state.pageNumber);
        // console.log(this.state.searchTerm);
        // console.log(this.state.startDate);
        // console.log(this.state.endDate);

        await this.createURL();

        fetch(this.state.fetchURL)
            .then((res) => res.json())
            .then((json) => this.storeArticles(json))
            .catch((err) => console.log(err))

    }

    //This function stores the articles from the fetch
    //I understand this didn't need to be a separate function, but it makes it more readable IMO
    storeArticles = (json) => {
        this.setState(
            {
                fetchReturn: json.response.docs
            }
        )
    }

    changePage = (direction) => {
        console.log('changePage started');
        if (direction === 'up') {
            this.setState(
                {
                    pageNumber: this.state.pageNumber + 1
                }, this.fetchResults
            )
        }

        if (direction === 'down') {
            if (this.state.pageNumber > 0) {
                this.setState(
                    {
                        pageNumber: this.state.pageNumber - 1
                    }, this.fetchResults
                )
            }
        }
    }

    //Here we render our general structure which includes the search boxes and
    //a functional component which is fed the results from the fetch as a prop
    render() {
        return (
            <div>
                <h1>NY Times video search</h1>

                <div className="wrapper">
                    <div className="controls">
                        <form>
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
                        </form>
                        <p>
                            <button onClick = {(e) => {this.fetchResults()}} className="submit">Submit search</button>
                        </p>
                    </div>
                    <div className="results">
                        <nav>
                            <button
                                onClick={(e) => {
                                    console.log('previous button pressed');
                                    this.changePage('down');
                                }}
                                className="prev">Previous 10</button>
                            <button
                                onClick={(e) => {
                                    console.log('next button pressed');
                                    this.changePage('up');
                                }}
                                className="next">Next 10</button>
                        </nav>
                        <FunctionalComponent fetchReturn={this.state.fetchReturn} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassComponent;