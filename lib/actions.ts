"use server";

import axios from "axios";
import { load } from "cheerio";
import axiosRetry from "axios-retry";
import { unstable_cache } from "next/cache";

export const fetchTweets = unstable_cache(async () => {
  try {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN!;

    console.log("🔄 Fetching fresh tweets...");
    const response = await fetch(
      `https://api.twitter.com/2/users/${process.env.TWITTER_ID}/tweets?max_results=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.log("Rate limit exceeded, waiting...");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tweets = data.data || [];

    console.log(`✅ Tweets fetched: ${tweets.length} items`);
    return tweets;
  } catch (error) {
    console.log("Failed to fetch tweets:", error);
    throw error;
  }
}, ["tweets"]);

export const fetchYoutubeVideos = unstable_cache(async () => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error("YouTube API key is not configured");
    }

    console.log("🔄 Fetching fresh YouTube videos...");
    const searchResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNEL_ID}&maxResults=15&order=date&type=video&key=${apiKey}`,
      {
        method: "GET",
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Search API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const videos = searchData.items || [];

    if (videos.length === 0) {
      console.log("No new videos found");
      return [];
    }

    const videoIds = videos.map((video: any) => video.id.videoId).join(",");
    const detailsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoIds}&key=${apiKey}`,
      {
        method: "GET",
      }
    );

    if (!detailsResponse.ok) {
      console.warn(
        "Could not check live streaming details, using original results"
      );
      const processedVideos = videos.slice(0, 5);
      console.log(`✅ YouTube videos fetched: ${processedVideos.length} items`);
      return processedVideos;
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

    const finalVideos = processedVideos.slice(0, 5);
    console.log(`✅ YouTube videos fetched: ${finalVideos.length} items`);
    return finalVideos;
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    throw error;
  }
}, ["youtube-videos"]);

export const fetchTikTokPosts = unstable_cache(async () => {
  try {
    const apiKey = process.env.TIKAPI_X_API_KEY;
    const secUid = process.env.TIKTOK_SECUID;

    if (!apiKey) {
      throw new Error("TikAPI X-API-KEY is not configured");
    }

    if (!secUid) {
      throw new Error("TikAPI secUid is not configured");
    }

    console.log("🔄 Fetching fresh TikTok posts...");
    const response = await fetch(
      `https://api.tikapi.io/public/posts?secUid=${secUid}&count=5`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
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

    console.log(`✅ TikTok posts fetched: ${videos.length} items`);
    return videos;
  } catch (error) {
    console.error("Failed to fetch TikTok posts:", error);
    throw error;
  }
}, ["tiktok-posts"]);

const http = axios.create({
  timeout: 8000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/125 Safari/537.36",
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
});

axiosRetry(http, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (err) => {
    return Boolean(
      axiosRetry.isNetworkError(err) ||
        (err.response?.status && err.response.status >= 500)
    );
  },
});

export const getLatestNews = unstable_cache(async () => {
  try {
    console.log("🔄 Fetching fresh news...");
    const url = "https://moony.club/news/";
    const { data } = await http.get(url);
    const $ = load(data);
    const news: {
      id: number;
      headline: string;
      publishedAt: string;
      link: string;
    }[] = [];

    $("ul.mc__news-li li")
      .slice(0, 5)
      .each((_, li) => {
        const $li = $(li);
        const href = $li.find("a").attr("href");
        const title = $li.find(".ttl").text().trim();
        const date = $li.find(".date").text().trim();

        if (title && href) {
          const link = new URL(href, url).href;
          const formattedDate = date ? date.replace(/\./g, "-") : "";

          news.push({
            id: news.length + 1,
            headline: title,
            publishedAt: formattedDate,
            link,
          });
        }
      });

    if (news.length === 0) {
      throw new Error("No news found");
    }

    console.log(`✅ News fetched: ${news.length} items`);
    return news;
  } catch (error) {
    console.log("Failed to fetch news:", error);
    throw error;
  }
}, ["latest-news"]);
