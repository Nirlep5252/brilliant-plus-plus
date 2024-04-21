export const createTranscriptUrl = (videoUrl: string): Promise<string> => {
  const stuff: string[] = videoUrl.split("/");
  const i = stuff.findIndex((x) => x === "video");
  stuff[i] = "raw";

  const j = stuff.findIndex((x) => x.match(/^v[0-9]+$/));
  stuff[j] = `v${parseInt(stuff[j]!.substring(1)) + 1}`;

  let newUrl = stuff.join("/");
  newUrl = newUrl.replace("mp4", "transcript");

  return newUrl;
};

export async function getTranscriptData(transcriptUrl: string) {
  const data = await fetch(transcriptUrl, {
    keepalive: true,
  });
  const text = await data.text();
  return JSON.parse(text);
}

export async function getTranscript(videoUrl: string): Promise<string> {
  const transcriptUrl = await createTranscriptUrl(videoUrl);
  console.log("TRANSCRIPT URL", transcriptUrl);
  const transcriptData = (await getTranscriptData(transcriptUrl)) as {
    transcript: string;
    start: number;
    end: number;
  }[];
  let finalTranscript = "";
  for (const part of transcriptData) {
    finalTranscript += part.transcript;
  }
  return finalTranscript;
}
