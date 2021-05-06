import React, { Component } from 'react';

const FunctionalComponent = (props) => {
    const { fetchReturn } = props;

    if (fetchReturn.length === 0) {
        console.log('No results');
    } else {
        // console.log(fetchReturn);

        // //loops through our array to populate our section tag
        // for (let i = 0; i < fetchReturn.length; i++) {
        //     // creates an article, an h2, an a, an img, a p, and a div tag
        //     let article = document.createElement('article');
        //     let heading = document.createElement('h2');
        //     let link = document.createElement('a');
        //     let img = document.createElement('img');
        //     let para = document.createElement('p');
        //     let clearfix = document.createElement('div');

        //     // creates a variable to store the current article
        //     let current = fetchReturn[i];

        //     //console.log('Current:', current);

        //     // setting the href value = web URL which we find at the current object
        //     link.href = current.web_url;
        //     // fills the a tag with the headline
        //     link.textContent = current.headline.main;
        //     // fills the p tag with the string "keywords: "
        //     para.textContent = 'Keywords: ';

        //     // iterates through the array of keywords and adds them to the p tag
        //     for (let j = 0; j < current.keywords.length; j++) {
        //         //creates a temporary span tag
        //         let span = document.createElement('span');
        //         //adds the keywords to the span tag
        //         span.textContent += current.keywords[j].value + ' ';
        //         //adds the span tag to the p tag
        //         para.appendChild(span); 
        //     }

        //     //if there is an image in the article object, it gets added to the img tag
        //     if (current.multimedia.length > 0) {
        //         img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
        //         img.alt = current.headline.main;
        //     }

        //     //adds the class attribute of clearfix to the DIV
        //     clearfix.setAttribute('class', 'clearfix');
        //     //adds the a tag into the h2 tag
        //     heading.appendChild(link);
        //     //adds the h2 tag into the article tag
        //     article.appendChild(heading);
        //     //adds the image tag into the article
        //     article.appendChild(img);
        //     //adds the p tag into the article
        //     article.appendChild(para);
        //     //adds the clearfix div into the article
        //     article.appendChild(clearfix);
        //     //adds the article into the section tag
        //     //section.appendChild(article);
        // }

        fetchReturn.map(article => {
            console.log("Entire Article Object: ", article);
            console.log("Headline: ", article.headline.main);
            console.log("URL: ", article.web_url)
            console.log("Keywords: ", article.keywords)
        })
    }
    return (
        <div className="results">
            <nav>
                <button className="prev">Previous 10</button>
                <button className="next">Next 10</button>
            </nav>
            <section>​</section>
        </div>
    )
}

export default FunctionalComponent;