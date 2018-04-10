import React from 'react';
import styled from 'styled-components';

const colors = {
    tech: 'blue',
    travel: 'purple',
    business: 'red',
    lifestyle: 'green'
}

const GridBox = styled.div`
    color: #ffffff;
    padding: ${props => props.isHeader ? '150px 50px 20px': '20px'};
    position: relative;
    margin-top: ${props => props.isHeader ? '-50px': '0px'};
    margin-bottom: 40px;
    overflow: hidden;
    z-index: 1;
    /* opacity: 0; */
    transform: translateY(50px);
    transition: transform .5s ease-in,
        opacity .5s ease-in;

    &.active {
        opacity: 1;
        transform: translateY(0px);
    }

    &::after {
        background-color: #000000;
        content: '';
        display: block;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: transform .3 ease-in-out;
        z-index: -1;
    }

    &:hover img.background-img {
        transform: scale(1.8);
    }

    &:hover .author-container {
        opacity: 1;
        transform: translateY(0);
    }

    &:hover::after {
        opacity: 0.1;
    }
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -2;
    transition: transform .3s ease-in-out;
    transform: scale(1.9);
`;

const Tag = styled.span`
    padding: 2px 7px;
    background-color: var(--color-grey);
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;

    ${props => `background-color: var(--color-${colors[props.color] ? colors[props.color] : 'grey'})`};
`;

const Date = styled.small`
    display: block;
    margin-bottom: 5px;
`

const Title = styled.h2`
    font-size: 30px;
    line-height: 36px;
    font-weight: 300;
    max-width: 80%;
`;

const NextLink = styled.a`
    align-items: center;
    border: 2px solid #dddddd;
    border-radius: 50%;
    color: #ffffff;
    display: inline-flex;
    font-style: 24px;
    justify-content: center;
    text-decoration: none;
    transition: transform .2s ease-in-out,
        border .2s ease-in-out;
    height: 50px;
    width: 50px;

    &:hover {
        border-color: #ffffff;
        color: #ffffff;
        transform: rotate(360deg);
        text-decoration: none;
    }
`;

const AuthorContainer = styled.div`
    float: ${props => props.isHeader ? 'left' : 'right'};
    padding: 10px;
    margin-top: 30px;
    text-align: ${props => props.isHeader ? 'left' : 'right'};
    ${props => !props.isHeader && `
        opacity: 0;
        transform: translateY(-20px);
    `}
    transition: transform .3s ease-in-out,
        opacity .3s ease-in-out;
`;

const Author = styled.h4`
    margin: 0;
`;

const AuthorImg = styled.img`
    border-radius: 5px;
    object-fit: cover;
    margin: ${props => props.isHeader ? '0 20px 0 0' : '0 0 0 10px'};
    height: 60px;
    width: 60px;
`;

const BlogCard = ({ isHeader, card: { title, bgImage, author, date, tag, authorImage } }) => (
    <GridBox isHeader={isHeader}>
        <BackgroundImage className="background-img" src={ require(`../img/${bgImage}`) } alt="bg" />
        {isHeader ? (
            <Date>{ date }</Date>
        ) : (
            <Tag color={tag}>{ tag }</Tag>
        )}
        <Title>{ title }</Title>
        {!isHeader && (
            <NextLink href="single.html">
                <i className="fa fa-long-arrow-right"></i>
            </NextLink>
        )}
        <AuthorContainer className="author-container" isHeader={isHeader}>
            <div className="row">
                <div className={`col-xs-8 ${isHeader && 'order-2'}`}>
                    {isHeader && (
                        <small>written by</small>
                    )}
                    <Author>{ author }</Author>
                    {!isHeader && (
                        <small>{ date }</small>
                    )}
                </div>
                <div className="col-xs-4">
                    <AuthorImg
                        src={ require(`../img/${authorImage}`) }
                        alt="author"
                        isHeader={isHeader}
                    />
                </div>
            </div>
        </AuthorContainer>
    </GridBox>
);

export default BlogCard;