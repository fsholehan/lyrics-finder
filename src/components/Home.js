import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [topLyrics, setTopLyrics] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTopLyrics = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=id&f_has_lyrics=1&apikey=${process.env.REACT_APP_API_KEY}`
    );

    // console.log(response.data?.message.body.track_list);
    setTopLyrics(response.data?.message.body.track_list);
    setLoading(false);
  };

  useEffect(() => {
    getTopLyrics();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-size-20">Top on Week</h1>
      <div className="row">
        {!loading ? (
          topLyrics?.map((lyric, index) => (
            <div className="col-md-3 col-sm-12" key={index}>
              <div className="card m-2">
                <div className="card-body">
                  <Link to={`/lyric/${lyric.track.track_id}`}>
                    <h5 className="card-title text-truncate">
                      {lyric.track.artist_name}
                    </h5>
                  </Link>

                  <Link to={`/lyric/${lyric.track.track_id}`}>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {lyric.track.track_name}
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner-border mx-auto mt-3" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
