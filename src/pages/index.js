import Head from "next/head";
import store from "../app/store";
import { Provider } from "react-redux";
import { StarWarsMovies } from "../components/movies/StarWarsMovies";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Star Wars</title>
      </Head>
      <Provider store={store}>
        <StarWarsMovies />
      </Provider>
    </div>
  );
};

export default Home;
