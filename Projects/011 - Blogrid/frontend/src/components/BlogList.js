import React from 'react';
import BlogCard from './BlogCard'

const BlogList = ({ cards }) => (
    <div className="container">
        <div className="row">
            { cards && cards.map((card, idx) => (
                <div className="col-sm-6" key={card.id}>
                    <BlogCard card={card} idx={idx} />
                </div>
            ))}
        </div>
    </div>
);

export default BlogList;