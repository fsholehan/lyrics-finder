import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Lyrics() {
  const { id } = useParams();
  const [lyrics, setLyrics] = useState([]);
  const [track, setTrack] = useState([]);
  const [listTrack, setListTrack] = useState([]);
  const [loading, setLoading] = useState(false)

  const getLyrics = async () => {
    let response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    // console.log(response.data);
    setLyrics(response.data.message.body.lyrics);
  };

  const getTrack = async () => {
    setLoading(true);
    let response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    // console.log(track);
    setTrack(response.data.message.body.track);
    setLoading(false);
  };

  const getListTrack = async () => {
    let response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_artist=${track.artist_name}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`
    );

    setListTrack(response.data?.message.body.track_list);
    console.log(listTrack);
  };

  console.log(track.artist_name);

  useEffect(() => {
    getTrack();
  }, [id]);

  useEffect(() => {
    getListTrack();
  }, [track.artist_name]);

  useEffect(() => {
    getLyrics();
  }, [id]);

  return (
    <div className="container mt-5">
      {
        !loading ? 
        <>
        <h2>
        {track.artist_name} - {track.track_name}
      </h2>
      <div className="row mt-5">
        <div className="col-md-7 col-sm-12">
          <p style={{ whiteSpace: "pre-line" }}>{lyrics?.lyrics_body}</p>
        </div>
        <div class="col-md-5 col-sm-12">
          <h1 class="text-size-20">Related Lyrics</h1>
          <ul className="list-group list-group-flush">
            {listTrack.map((result) => (
              <li className="list-group-item px-0" key={result.track.track_id}>
                <Link to={`/lyric/${result.track.track_id}`}>
                  {result.track.track_name} - {result.track.artist_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div> 
      </>:
      <div className="spinner-border mx-auto mt-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      }
      
    </div>
  );
}

export default Lyrics;
