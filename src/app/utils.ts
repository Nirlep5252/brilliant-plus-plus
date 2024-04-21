export const createTranscriptUrl = (videoUrl: string, add: number = 0) => {
  const stuff: string[] = videoUrl.split("/");
  const i = stuff.findIndex((x) => x === "video");
  stuff[i] = "raw";

  const j = stuff.findIndex((x) => x.match(/^v[0-9]+$/));
  stuff[j] = `v${parseInt(stuff[j]!.substring(1)) + add}`;

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
  let count = 0;
  let transcriptUrl = createTranscriptUrl(videoUrl, count);
  let transcriptData: {
    transcript: string;
    start: number;
    end: number;
  }[];
  let noData = true;
  while (noData && count < 100) {
    console.log("COUNTTTTTTTTTTT", count);
    try {
      transcriptData = await getTranscriptData(transcriptUrl);
      noData = false;
    } catch {
      count++;
      transcriptUrl = createTranscriptUrl(videoUrl, count);
    }
  }
  let finalTranscript = "";
  for (const part of transcriptData) {
    finalTranscript += part.transcript;
  }
  return finalTranscript;
}
