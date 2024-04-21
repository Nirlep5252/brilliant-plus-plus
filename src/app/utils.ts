export const createTranscriptUrl = (videoUrl: string, add: boolean = false) => {
  const stuff: string[] = videoUrl.split("/");
  const i = stuff.findIndex((x) => x === "video");
  stuff[i] = "raw";

  const j = stuff.findIndex((x) => x.match(/^v[0-9]+$/));
  stuff[j] = `v${parseInt(stuff[j]!.substring(1)) + (add ? 1 : 0)}`;

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
  const transcriptUrl = createTranscriptUrl(videoUrl);
  const transcriptUrl2 = createTranscriptUrl(videoUrl, true);
  console.log("TRANSCRIPT URL", transcriptUrl);
  let transcriptData: {
    transcript: string;
    start: number;
    end: number;
  }[];
  try {
    transcriptData = await getTranscriptData(transcriptUrl);
  } catch {
    transcriptData = await getTranscriptData(transcriptUrl2);
  }
  let finalTranscript = "";
  for (const part of transcriptData) {
    finalTranscript += part.transcript;
  }
  return finalTranscript;
}
