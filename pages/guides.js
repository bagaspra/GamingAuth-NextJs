import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Guides.module.css';
import AuthContext from '../stores/authContext';
import Head from 'next/head';

export default function Guides() {
  const { user, authReady, login } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        '/.netlify/functions/guides',
        user && {
          headers: {
            Authorization: 'Bearer ' + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            login();
            throw Error('You must be logged in to view this content');
          }
          return res.json();
        })
        .then((data) => {
          setError(null);
          setGuides(data);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <>
      <Head>
        <title>Gaming Auth | Guides</title>
        <meta name="keywords" content="bagas" />
      </Head>
      <div className={styles.guides}>
        {!authReady && <div>Loading...</div>}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        {guides &&
          guides.map((guide) => (
            <div key={guide.title} className={styles.card}>
              <h3>{guide.title}</h3>
              <h4>written by {guide.author}</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                corrupti iste ab magnam dignissimos id maxime rerum quae minima.
                Delectus maxime culpa est consequatur veritatis, perspiciatis
                cum corrupti possimus quis?
              </p>
            </div>
          ))}
      </div>
    </>
  );
}

// import { useContext, useEffect, useState } from 'react';
// import styles from '../styles/Guides.module.css';
// import AuthContext from '../stores/authContext';

// export default function Guides() {
//   const { user, authReady } = useContext(AuthContext);
//   const { guides, setGuides } = useState(null);
//   const { error, setError } = useState(null);

//   useEffect(() => {
//     if (authReady) {
//       const fetchData = async () => {
//         const res = await fetch(
//           '.netlify/functions/guides',
//           user && {
//             headers: {
//               Authorization: 'Bearer ' + user.token.access_token,
//             },
//           }
//         );
//         try {
//           if (!res.ok) {
//             throw Error('You must be logged in to view this content');
//           }
//           const data = await res.json();
//         } catch (err) {
//           setError(err.message);
//           setGuides(null);
//         }
//         setGuides(data);
//         setError(null);
//       };

//       fetchData();
//     }
//   }, [user, authReady]);

//   return (
//     <div className={styles.guides}>
//       <h2>All Guides</h2>
//       {!authReady && <div>Loading ... </div>}
//       {error && (
//         <div className={styles.error}>
//           <p> {error}</p>
//         </div>
//       )}
//       {guides &&
//         guides.map((guide) => {
//           <div key={guide.title} className={styles.card}>
//             <h3>{guide.title}</h3>
//             <h4>Written by {guide.author}</h4>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla
//               ea reiciendis at mollitia dolore placeat quo molestiae quae veniam
//               doloribus nam dignissimos, amet, illo dolorum quasi tenetur
//               pariatur ex.
//             </p>
//           </div>;
//         })}
//     </div>
//   );
// }
