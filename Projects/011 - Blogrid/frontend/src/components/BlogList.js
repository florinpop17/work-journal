import React from 'react';
import BlogCard from './BlogCard'

const BlogList = ({ cards }) => (
    <div className="container">
        <div className="row">
            { cards && cards.map(card => (
                <div className="col-sm-6" key={card.id}>
                    <BlogCard card={card} />
                </div>
            ))}
        </div>
    </div>
);

export default BlogList;