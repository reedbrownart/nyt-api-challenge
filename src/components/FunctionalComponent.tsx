import React from 'react';

const FunctionalComponent = (props) => {
    const { fetchReturn } = props;

    function ArticleDisplay (props) {
        const { fetchReturn } = props;

        if (fetchReturn.length === 0) {
            return <p>no results here</p>
        } else {
            return fetchReturn.map(article => {
                return(
                    <div>
                        <h3>{article.headline.main}</h3>
                        {article.multimedia.length > 1 ? <img alt="article" src={`http://www.nytimes.com/${article.multimedia[1].url}`} /> : ''}
                        <p>
                            {article.snippet}
                            <br />
                            {article.keywords.length > 0 ? ' Keywords: ' : ''}
                        </p>
                        <ul>
                            {article.keywords.map(keyword => <li key = {keyword.id}>{keyword.value}</li>)}
                        </ul>
                        <a href={article.web_url}><button>Read It</button></a>
                    </div>
                )
            })
        }
    }

    return (
        <div className="results">
            <ArticleDisplay fetchReturn = {fetchReturn} />
        </div>
    )
}

export default FunctionalComponent;