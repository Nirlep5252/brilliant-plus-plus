"use client";

import { type Lesson } from "@prisma/client";
import { createTranscriptUrl, getTranscriptData } from "./page";
import { useEffect, useState } from "react";

export function VideoPlayer(props: { lesson: Lesson }) {
  const [transcriptData, setTranscriptData] = useState<
    {
      confidence: number;
      transcript: string;
      words: {
        word: string;
        start_time: number;
        end_time: number;
      }[];
    }[]
  >();

  useEffect(() => {
    createTranscriptUrl(props.lesson.videoUrl).then((transcriptUrl) => {
      getTranscriptData(transcriptUrl).then((transcriptData) => {
        setTranscriptData(transcriptData);
      });
    });
  }, [props.lesson.videoUrl]);

  const [transcriptUrl, setTranscriptUrl] = useState<string>();
  useEffect(() => {
    if (!transcriptData) {
      return;
    }

    let vtt = "WEBVTT\n\n";
    for (const part of transcriptData) {
      const words = part.words;
      while (words.length > 0) {
        const stuff = words.splice(0, 8);
        const start = stuff.at(0)?.start_time;
        const end = stuff.at(-1)?.end_time;
        vtt += `${new Date(start * 1000).toISOString().substr(11, 8)}.000 --> ${new Date(
          end * 1000,
        )
          .toISOString()
          .substr(11, 8)}.000\n`;
        vtt += stuff.map((word) => word.word).join(" ") + "\n\n";
      }
    }

    const vttBlob = new Blob([vtt], { type: "text/plain" });
    const file = new File([vttBlob], "transcript.vtt", { type: "text/vtt" });
    const vttUrl = URL.createObjectURL(file);
    console.log(vtt);
    setTranscriptUrl(vttUrl);
  }, [transcriptData]);

  if (!transcriptData) {
    return <>Loading...</>;
  }

  return (
    <video controls className="rounded-lg">
      <source src={props.lesson.videoUrl} type="video/mp4" />
      <track
        default
        src={transcriptUrl}
        kind="captions"
        srcLang="en"
        label="English"
      />
    </video>
  );
}
