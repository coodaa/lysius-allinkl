import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import prisma from "../lib/prisma";

export async function getServerSideProps({ locale }) {
  let plays = [];

  try {
    const raw = await prisma.play.findMany();
    plays = raw.map((play) => ({
      ...play,
      videoUrl: play.videoUrl
        ? play.videoUrl
            .replace("youtu.be/", "youtube.com/embed/")
            .replace("watch?v=", "embed/")
        : "",
    }));
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
        <title>{t("theater_pieces")} | Lysius</title>
        <meta
          name="description"
          content="Theaterstücke von Lysius e.V. – Produktionen für Theater, Musik und interkulturelle Verständigung in Berlin."
        />
        <meta
          name="keywords"
          content="Lysius, Theaterstücke, Theater Berlin, Kulturverein, Fabiane Kemmann, Musik, Kunst"
        />
        <link rel="canonical" href="https://www.lysius.org/plays" />
        <link rel="alternate" hrefLang="de" href="https://www.lysius.org/plays" />
        <link rel="alternate" hrefLang="en" href="https://www.lysius.org/en/plays" />
        <link rel="alternate" hrefLang="x-default" href="https://www.lysius.org/plays" />
        <meta property="og:title" content={`${t("theater_pieces")} | Lysius`} />
        <meta
          property="og:description"
          content="Theaterstücke von Lysius e.V. – Produktionen für Theater, Musik und interkulturelle Verständigung."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/f_auto,q_auto/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />
        <meta property="og:url" content="https://www.lysius.org/plays" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lysius" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t("theater_pieces")} | Lysius`} />
        <meta
          name="twitter:description"
          content="Theaterstücke von Lysius e.V. – Produktionen für Theater, Musik und interkulturelle Verständigung."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/f_auto,q_auto/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />

        {/* JSON-LD: ItemList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Theaterstücke – Lysius",
              url: "https://www.lysius.org/plays",
              itemListElement: plays.map((play, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: play.title,
                url: `https://www.lysius.org/plays/${play.id}`,
              })),
            }),
          }}
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
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                  <Image
                    src={play.imageUrl}
                    alt={play.title || "Theaterstück"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
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
