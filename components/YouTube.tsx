"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";

export default function YouTube({ id, title }: { id: string; title: string }) {
  return <LiteYouTubeEmbed id={id} title={title} />;
}
