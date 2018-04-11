import React from 'react';
import BlogCard from './BlogCard'

const BlogList = ({ cards }) => (
    <div className="container">
        <div className="row">
            { cards && cards.map((card, idx) => (
                <div className="col-lg-6 col-md-12" key={card.id}>
                    <BlogCard card={card} idx={idx} />
                </div>
            ))}
        </div>
    </div>
);

export default BlogList;