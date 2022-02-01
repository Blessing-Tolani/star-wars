import { useRouter } from "next/router";
import Head from "next/head";

const About = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <Head>
        <title>{slug}</title>
      </Head>
      <div>This page is about {slug}</div>
    </div>
  );
};

export default About;
