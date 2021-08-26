import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  // console.log(keyword);

  const getKeyword = (e) => {
    e.preventDefault();

    history.push(`/search/${keyword}`);
  };

  return (
    <header className="bg-dark">
      <div className="container">
        <Navbar />
      </div>
      <div className="container mt-5 pb-5">
        <div className="row">
          <div class="col-md-6">
            <h1 className="text-white">Search Your Favorite Song</h1>
            <form onSubmit={getKeyword}>
              <div className="input-group mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Artist, Title or Lyrics"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
