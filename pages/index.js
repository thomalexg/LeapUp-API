import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/logo-store.png">LeapUp!</a>
        </h1>

        <p className={styles.description}>Learn up your life!</p>

        <div className={styles.grid}>
          <a href="https://github.com/thomalexg" className={styles.card}>
            <h3>Go to my GitHub &rarr;</h3>
            <p>Find all my projects </p>
          </a>

          <a
            href="https://github.com/thomalexg/LeapUp-API"
            className={styles.card}
          >
            <h3>Repository of this project &rarr;</h3>
            <p>Check out the source code of this project</p>
          </a>

          <a href="https://github.com/thomalexg/LeapUp" className={styles.card}>
            <h3>Repository of the LeapUp React Native App &rarr;</h3>
            <p>Check out the source code of the LeapUp App</p>
          </a>

          <a href="https://youtu.be/xufgJSZEykc" className={styles.card}>
            <h3>Watch a video &rarr;</h3>
            <p>
              Watch a video on YouTube where you can see the functionality of
              the LeapUp App!
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
