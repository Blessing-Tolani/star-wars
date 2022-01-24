import Head from "next/head";
import SelectMovie from "../components/SelectMovie";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Star Wars</title>
      </Head>
      <div>
        <SelectMovie />
      </div>
    </div>
  );
};

export default Home;
