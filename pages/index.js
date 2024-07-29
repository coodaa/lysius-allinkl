// pages/index.js

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let plays = [];

  try {
    const res = await fetch(`${apiUrl}/api/plays`);
    if (res.ok) {
      plays = await res.json();
      console.log("Plays fetched successfully:", plays); // Debugging-Ausgabe
      plays = plays.map((play) => ({
        ...play,
        videoUrl: play.videoUrl
          .replace("youtu.be/", "youtube.com/embed/")
          .replace("watch?v=", "embed/"),
      }));
    } else {
      console.error("Failed to fetch plays:", res.status);
    }
  } catch (error) {
    console.error("Error fetching plays:", error);
  }

  return {
    props: {
      plays,
    },
  };
}

export default function Home({ plays }) {
  return (
    <div>
      <h1>Theaterstücke</h1>
      <ul>
        {plays.map((play) => (
          <li key={play.id}>
            <h2>{play.title}</h2>
            <p>{play.description}</p>
            {play.imageUrl && <img src={play.imageUrl} alt={play.title} />}
            {play.videoUrl && (
              <div>
                <iframe
                  width="560"
                  height="315"
                  src={play.videoUrl}
                  title={play.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
