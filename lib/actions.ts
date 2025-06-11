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
  }
}

export async function fetchYoutubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = "UCOLL3KDzhqu-CQ_uXZUQ7XA";

  if (!apiKey) {
    console.error("YouTube API key is not configured");
    return [];
  }

  try {
    const searchResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=15&order=date&type=video&key=${apiKey}`
    );

    if (!searchResponse.ok) {
      throw new Error(`Search API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const videos = searchData.items || [];

    if (videos.length === 0) return [];

    // 第二步：批量检查直播状态
    const videoIds = videos.map((video: any) => video.id.videoId).join(",");

    const detailsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoIds}&key=${apiKey}`
    );

    if (!detailsResponse.ok) {
      console.warn(
        "Could not check live streaming details, returning original results"
      );
      return videos.slice(0, 5);
    }

    const detailsData = await detailsResponse.json();

    // 过滤掉有直播详情的视频
    const nonLiveVideos =
      detailsData.items?.filter((video: any) => !video.liveStreamingDetails) ||
      [];

    return nonLiveVideos.slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return [];
  }
}
