import axios from "axios";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";

function SearchPage() {
  const { keyword } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${keyword}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`
    );
    setResults(response?.data.message.body.track_list);
    console.log(results);
    setLoading(false);
  };

  console.log(keyword);

  useEffect(() => {
    getResult();
  }, [keyword]);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-size-20 mt-3">Search for: {keyword}</h1>
        <div className="row">
          {!loading ? (
            results.map((result) => <Search result={result} />)
          ) : (
            <div className="spinner-border mx-auto mt-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
