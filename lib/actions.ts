"use server";

export async function fetchTweets() {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN!;

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/${process.env.TWITTER_ID}/tweets?max_results=5`,
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
  }
}

export async function fetchYoutubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("YouTube API key is not configured");
    return [];
  }

  try {
    const searchResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNEL_ID}&maxResults=15&order=date&type=video&key=${apiKey}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 28800 },
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Search API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const videos = searchData.items || [];

    if (videos.length === 0) return [];

    const videoIds = videos.map((video: any) => video.id.videoId).join(",");
    const detailsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoIds}&key=${apiKey}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 28800 },
      }
    );

    if (!detailsResponse.ok) {
      console.warn(
        "Could not check live streaming details, returning original results"
      );
      return videos.slice(0, 5);
    }

    const detailsData = await detailsResponse.json();

    const nonLiveVideos =
      detailsData.items?.filter((video: any) => !video.liveStreamingDetails) ||
      [];
    const processedVideos = nonLiveVideos.map((video: any) => ({
      ...video,
      snippet: {
        ...video.snippet,
        publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(
          "en-CA"
        ),
      },
    }));
    return processedVideos.slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return [];
  }
}

export async function fetchTikTokPosts() {
  const apiKey = process.env.TIKAPI_X_API_KEY;
  const secUid = process.env.TIKTOK_SECUID;

  if (!apiKey) {
    console.error("TikAPI X-API-KEY is not configured");
    return [];
  }

  if (!secUid) {
    console.error("TikAPI secUid is not configured");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.tikapi.io/public/posts?secUid=${secUid}&count=5`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { revalidate: 28800 },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.log("TikAPI rate limit exceeded, waiting...");
      }
      throw new Error(`TikAPI HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const posts = data.itemList?.slice(-5) || [];
    const videos = posts.map((post: any) => ({
      id: post.id,
      createdAt: new Date(post.createTime * 1000).toLocaleDateString("en-CA"),
      description: post.desc,
      thumbnail: post.video.zoomCover[960],
    }));
    return videos;
  } catch (error) {
    console.error("Failed to fetch TikTok posts:", error);
    return [];
  }
}
