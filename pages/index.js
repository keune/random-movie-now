import fetch from 'isomorphic-unfetch'
import Head from 'next/head'

const Index = (props) => (
  <div>
    <Head>
      <title>random.movie</title>
      <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css" />
    </Head>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h1>random.movie</h1>
        <div className="row">
          <div className="col-md-6">
            <img src={props.movie.Poster} />
          </div>
          <div className="col-md-6">
            <h2>{props.movie.Title} ({props.movie.Year})</h2>
            <p>{props.movie.Plot}</p>
            <p>{props.movie.imdbRating}/10</p>
            <br />
            <a href={props.movie.imdbUrl} target="_blank">See on IMDB</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)


Index.getInitialProps = async function() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const randomBetween = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const char = chars[randomBetween(0, chars.length)];
  const year = randomBetween(1950, new Date().getFullYear());
  const pageNum = randomBetween(1, 20);
  const apiUrl = `http://www.omdbapi.com/?t=${char}&y=${year}page=${pageNum}&type=movie&apikey=5976b3d6`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  return {
    movie: {...data, ...{imdbUrl: `https://www.imdb.com/title/${data.imdbID}`}}
  }
}

export default Index
