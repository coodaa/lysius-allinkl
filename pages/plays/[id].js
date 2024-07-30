import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PlayDetails from "../../components/PlayDetails";
import prisma from "../../lib/prisma";

const PlayPage = ({ play }) => {
  return <PlayDetails play={play} />;
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const play = await prisma.play.findUnique({
      where: { id: parseInt(id) },
    });

    if (!play) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        play,
        ...(await serverSideTranslations(context.locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching play:", error);
    return {
      props: {
        error: "Error fetching play",
      },
    };
  }
}

export default PlayPage;
