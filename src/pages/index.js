import Head from "next/head";
import SelectMovie from "../components/SelectMovie";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Star Wars</title>
      </Head>
      <section>
        <SelectMovie />
      </section>
    </div>
  );
};

export default Home;
