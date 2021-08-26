import { Link } from "react-router-dom";

function Search({ result }) {
  return (
    <div className="col-md-3 col-sm-12" key={result.track.track_id}>
      <div className="card m-2">
        <div className="card-body">
          <Link to={`/lyric/${result.track.track_id}`}>
            <h5 className="card-title text-truncate">
              {result.track.artist_name}
            </h5>
          </Link>

          <Link to={`/lyric/${result.track.track_id}`}>
            <h6 className="card-subtitle mb-2 text-muted">
              {result.track.track_name}
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Search;
