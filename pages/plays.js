import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export async function getServerSideProps({ locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let plays = [];

  try {
    const res = await fetch(`${apiUrl}/api/plays`);
    if (res.ok) {
      plays = await res.json();
      plays = plays.map((play) => ({
        ...play,
        videoUrl: play.videoUrl
          ? play.videoUrl
              .replace("youtu.be/", "youtube.com/embed/")
              .replace("watch?v=", "embed/")
          : "",
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
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function Home({ plays }) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Theaterstücke | Lysius</title>
        <meta
          name="description"
          content="Eine Liste von Theaterstücken präsentiert vom Lysius e.V."
        />
        <meta property="og:title" content="Theaterstücke | Lysius" />
        <meta
          property="og:description"
          content="Eine Übersicht der neuesten Theaterstücke."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />
        <meta property="og:url" content="https://www.lysius.org/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Theaterstücke | Lysius" />
        <meta
          name="twitter:description"
          content="Eine Übersicht der neuesten Theaterstücke."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />
      </Head>

      <div>
        <h1>{t("theater_pieces")}</h1>
        <ul>
          {plays.map((play) => (
            <li key={play.id}>
              <h2>{play.title}</h2>
              <p>{play.description}</p>
              {play.imageUrl && (
                <img
                  src={play.imageUrl}
                  alt={play.title}
                  loading="lazy" // Lazy loading for performance
                />
              )}
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
    </>
  );
}
