import React from 'react';
import Heading from '../(components)/Heading';

function About () {
  return (
    <div id="about-wrapper">
      <Heading title="About Us"></Heading>
      <div className="pl-4 about-wrapper-content">
      <p className="text-justify mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Molestias dolore assumenda esse maiores eos! Delectus odit expedita corrupti consectetur alias 
      natus aliquid quo veniam ullam omnis vitae et iure ab provident, debitis eaque, reprehenderit ex 
      autem ducimus repellendus adipisci ut tempora nobis! Omnis ducimus harum 
      architecto nihil ut! Aliquam, repellat!</p>
      <p className="text-justify mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Molestias dolore assumenda esse maiores eos! Delectus odit expedita corrupti consectetur alias 
      natus aliquid quo veniam ullam omnis vitae et iure ab provident, debitis eaque, reprehenderit ex 
      autem ducimus repellendus adipisci ut tempora nobis! Omnis ducimus harum 
      architecto nihil ut! Aliquam, repellat!</p>
      
        <details className="about-details">
            <summary className="about-summary">
                <span className="is-open">Read less</span>
                <span className="is-closed">Read more</span>
            </summary>
            <div className="about-details-content" id="details-content">
            <p className="text-justify mb-4 first-lines">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolor, aliquam. Veritatis consequatur, soluta molestiae voluptates accusamus 
            qui odio, error, repellat rem harum id similique omnis quod dignissimos saepe quas mollitia.</p>
        <p className="text-justify mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis 
        consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum 
        id similique omnis quod dignissimos saepe quas mollitia.</p>
        <p className="text-justify mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis
         consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum 
         id similique omnis quod dignissimos saepe quas mollitia.</p>
        <p className="text-justify mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis 
        consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum id similique omnis quod dignissimos saepe quas mollitia.</p>
        <p className="text-justify mb-12 last-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam. Veritatis 
        consequatur, soluta molestiae voluptates accusamus qui odio, error, repellat rem harum id
         similique omnis quod dignissimos saepe quas mollitia.</p>
            </div>
        </details>
      </div>
    </div>
  )
}

export default About;
