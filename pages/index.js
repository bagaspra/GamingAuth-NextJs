import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gaming Auth | Home</title>
        <meta name="keywords" content="bagas" />
      </Head>
      <div className={styles.home}>
        <h2>Welcome to Gaming House</h2>
        <div>
          <p>Use this test account to see guides content</p>
          <p>email : bagas@gmail.com</p>
          <p>pass : 123456</p>
        </div>
      </div>
    </>
  );
}
