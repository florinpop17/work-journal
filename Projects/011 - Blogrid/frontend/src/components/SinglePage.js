import React, { Component } from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';

const PerspectiveContainer = styled.div`
    perspective: 1000px;
`;

const FullPageImage = styled.div`
    animation: flipX .5s ease-in;
    align-content: flex-start;
    background-size: cover;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    padding: 0 50px;
    margin-bottom: -400px;
    transform-style: preserve-3d;
    transform: rotateX(0deg);
    transition: filter .5s ease-in;  

    @keyframes flipX {
        from {
            opacity: 0;
            transform: rotateX(30deg);
        }
        to {
            opacity: 1;
            transform: rotateX(0deg);
        }
    }

    &.hide {
        filter: blur(5px);
    }

    /* The div bellow => FullPageContent */
    &.hide > .full-page-content {
        opacity: 0;
        transform: translateY(-200px);
    }
`;

const FullPageContent = styled.div`
    opacity: 1;
    transform: translateY(0px);
    transition: transform .5s ease-in-out,
        opacity .3s ease-in-out;
`;

const Title = styled.h1`
    font-size: 48px;
    font-weight: 300;
    margin: 5px 0 0;
    max-width: 60%;
`;

const AuthorContainer = styled.div`
    border: 1px solid #aaa;
    padding: 20px 30px;
    margin-top: 30px;
    text-align: left;
    width: 250px;
`;

const Author = styled.h4`
    margin: 0;
`;

const AuthorImg = styled.img`
    border-radius: 5px;
    object-fit: cover;
    margin-right: 20px;
    height: 60px;
    width: 60px;
`;

const BlogContainer = styled.div`
    margin: 0 auto;
    max-width: 700px;
    opacity: 0;
    transform: translateY(100px);
    transition: transform .5s ease-in-out,
        opacity .3s ease-in-out;

    &.show {
        opacity: 1;
        transform: translateY(-100px);
    }
`;

const BlogContent = styled.div`
    color: #222222;
    background-color: #fff;
    padding: 30px 50px;

    & p {
        letter-spacing: 1px;
        line-height: 24px;
    }
`;

class SinglePage extends Component {
    constructor(props) {
        super(props);

        this.fullPageRef = React.createRef();
        this.blogContainerRef = React.createRef();
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);

        // Initial load check for scroll
        this.handleScroll();
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 75) {
            this.fullPageRef.current.classList.add('hide');
            this.blogContainerRef.current.classList.add('show');
        } else {
            this.fullPageRef.current.classList.remove('hide');
            this.blogContainerRef.current.classList.remove('show');
        }
    }

    render() {
        const { cards } = this.props;
        const id = +this.props.match.params.id;
        const { title, bgImage, author, date, tag, authorImage } = cards.find(card => card.id === id); 

        return (
            <PerspectiveContainer>
                <FullPageImage
                    innerRef={this.fullPageRef}
                    style={{ backgroundImage: `url(${require(`../img/${bgImage}`)})` }}
                >
                    <FullPageContent className="full-page-content">
                        <small>{ date }</small>
                        <Title>{ title }</Title>
                        <AuthorContainer className="author-container">
                            <div className="row">
                                <div className="col-xs-4">
                                    <AuthorImg src={ require(`../img/${authorImage}`) } alt="author" />
                                </div>
                                <div className="col-xs-8">
                                    <small>written by</small>
                                    <Author>{ author }</Author>
                                </div>
                            </div>
                        </AuthorContainer>
                    </FullPageContent>
                </FullPageImage>
        
                <BlogContainer innerRef={this.blogContainerRef}>
                    <BlogCard
                        isHeader
                        card={{ title, bgImage, author, date, tag, authorImage }}
                    />
        
                    <BlogContent>
                        <h2>Lorem ipsum dolor sit amet consectetur</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit porro modi, blanditiis voluptate beatae rerum autem. Non praesentium dolores iusto excepturi illo vero, recusandae maxime, distinctio dicta temporibus accusantium quo voluptatibus. Amet, itaque praesentium. Omnis est magnam autem at in.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis expedita quas at, voluptates numquam voluptas qui, atque dolore alias repudiandae doloremque ab architecto dolor, beatae voluptatibus recusandae esse sequi? Sed?</p>
                        <h2>Lorem, ipsum dolor</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse perspiciatis explicabo ex consequuntur deserunt eius quia ad repellat ipsa ipsum, quisquam quos asperiores odio magni velit, officia autem eveniet vel. Sequi culpa repellat quisquam exercitationem quos ab, molestiae natus. Ullam cupiditate atque porro voluptates molestias minus, accusamus illo eaque? Et odio aut repellat mollitia recusandae quasi est delectus vitae culpa! Corrupti autem at sequi suscipit sint repudiandae praesentium voluptatem saepe mollitia culpa quibusdam atque cumque, aut quia, illo sit? Impedit molestias repellendus soluta cum doloribus necessitatibus. Tempore, asperiores iusto. Incidunt expedita laborum ea amet veritatis perferendis cum aut, obcaecati beatae.</p>
                        <h3>Lorem, ipsum dolor</h3>
                        <ul>
                            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, iste.</li>
                            <li>Assumenda deleniti, velit dolores maxime aliquid cupiditate in quo nostrum!</li>
                            <li>Ipsum deserunt architecto unde officia nulla iure molestiae hic ratione?</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse perspiciatis explicabo ex consequuntur deserunt eius quia ad repellat ipsa ipsum, quisquam quos asperiores odio magni velit, officia autem eveniet vel. Sequi culpa repellat quisquam exercitationem quos ab, molestiae natus. Ullam cupiditate atque porro voluptates molestias minus, accusamus illo eaque? Et odio aut repellat mollitia recusandae quasi est delectus vitae culpa! Corrupti autem at sequi suscipit sint repudiandae praesentium voluptatem saepe mollitia culpa quibusdam atque cumque, aut quia, illo sit? Impedit molestias repellendus soluta cum doloribus necessitatibus. Tempore, asperiores iusto. Incidunt expedita laborum ea amet veritatis perferendis cum aut, obcaecati beatae.</p>
                    </BlogContent>
                </BlogContainer>
            </PerspectiveContainer>
        )
    }
}
export default SinglePage;