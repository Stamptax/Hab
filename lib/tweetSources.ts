"use server";

const apiKey = process.env.TWITTERAPI_IO_API_KEY!;
const targets = [
  process.env.SOURCE_1!,
  process.env.SOURCE_2!,
  process.env.SOURCE_3!,
  process.env.SOURCE_4!,
];

function formatTimeForAPI(date: Date): string {
  return date
    .toISOString()
    .replace(/T/, "_")
    .replace(/\..+/, "_UTC")
    .replace(/:/g, ":");
}

let lastCheckTime = new Date(Date.now() - 30 * 60 * 1000);

export const getRawTweets = async (target: string) => {
  try {
    const currentTime = new Date();
    const sinceStr = formatTimeForAPI(lastCheckTime);
    const untilStr = formatTimeForAPI(currentTime);
    const query = `from:${target} since:${sinceStr} until:${untilStr}`;

    const response = await fetch(
      `https://api.twitterapi.io/twitter/tweet/advanced_search?query=${encodeURIComponent(
        query
      )}&queryType=Latest`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    lastCheckTime = currentTime;

    return data.tweets || [];
  } catch (error) {
    console.error("Failed to get tweets:", error);
    throw error;
  }
};
