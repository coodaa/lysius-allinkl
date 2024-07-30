import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ params, locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { id } = params;

  let play = null;

  try {
    const res = await fetch(`${apiUrl}/api/plays/${id}`);
    if (res.ok) {
      play = await res.json();
    } else {
      console.error("Failed to fetch play:", res.status);
    }
  } catch (error) {
    console.error("Error fetching play:", error);
  }

  if (!play) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      play,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function PlayDetails({ play }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{play.title}</h1>
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
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
