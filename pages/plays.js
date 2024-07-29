export async function getServerSideProps(context) {
  console.log("getServerSideProps called"); // Debugging-Ausgabe

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  console.log("API URL:", apiUrl); // Debugging-Ausgabe
  let plays = [];

  try {
    const res = await fetch(`${apiUrl}/api/plays`);
    console.log("Fetch response status:", res.status); // Debugging-Ausgabe
    console.log("Hello World"); // Debugging-Ausgabe
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
  console.log("Rendering Home component"); // Debugging-Ausgabe
  console.log("Hello World from Home component"); // Debugging-Ausgabe

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
