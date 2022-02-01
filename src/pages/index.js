import Head from "next/head";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "../app/store";
import { Provider } from "react-redux";
import { StarWarsMovie } from "../components/movie/StarWarsMovie";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Star Wars</title>
      </Head>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<StarWarsMovie />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default Home;
