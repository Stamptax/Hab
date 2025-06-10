"use server";

export async function fetchTweets() {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN!;

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/3853228393/tweets?max_results=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { revalidate: 28800 },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.log("Rate limit exceeded, waiting...");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.log("Failed to fetch tweets:", error);
    return [];
  }
}
