class MoviesList extends React.Component {
    state = {
        moviesList: ['tt2294629'],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=756abb2f&s=${
                    this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { moviesList } = this.state;

        return (
            <div>
                <form onSubmit={this.search}>
                    <input
                        placeholder="Search for a movie"
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        <i className="fa fa-search" />
                    </button>
                </form>
                {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
                        Couldn't find any movie. Please search again using
                        another search criteria.
                    </p>
                )}
            </div>
        );
    }
}

class MovieCard extends React.Component {
    state = {
        movieData: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=756abb2f&i=${
                    this.props.movieID
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating
        } = this.state.movieData;

        if (!Poster || Poster === 'N/A') {
            return null;
        }

        return (
            <div className="movie-card-container">
                <div className="image-container">
                    <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${Poster})` }}
                    />
                </div>
                <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                        <h1>{Title}</h1>
                        <small>Released Date: {Released}</small>
                    </div>
                    <h4>Rating: {imdbRating} / 10</h4>
                    <p>{Plot && Plot.substr(0, 350)}</p>
                    <div className="tags-container">
                        {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<MoviesList />, document.getElementById('app'));
