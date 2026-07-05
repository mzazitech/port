import { Router, type IRouter } from "express";
import yts from "yt-search";
import ytdl from "@distube/ytdl-core";
import {
  SearchYoutubeQueryParams,
  SearchYoutubeResponse,
  DownloadYoutubeQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/youtube/search", async (req, res): Promise<void> => {
  const parsed = SearchYoutubeQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const result = await yts(parsed.data.q);
    const results = result.videos.slice(0, 20).map((video) => ({
      videoId: video.videoId,
      title: video.title,
      thumbnail: video.thumbnail,
      duration: video.timestamp || "Live",
      channel: video.author?.name || "Unknown",
      views: video.views ? `${video.views.toLocaleString()} views` : "N/A",
    }));

    res.json(SearchYoutubeResponse.parse({ results }));
  } catch (err) {
    req.log.error({ err }, "YouTube search failed");
    res.status(502).json({ error: "Failed to search YouTube" });
  }
});

router.get("/youtube/download", async (req, res): Promise<void> => {
  const parsed = DownloadYoutubeQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { videoId, format } = parsed.data;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  if (!ytdl.validateID(videoId)) {
    res.status(400).json({ error: "Invalid video ID" });
    return;
  }

  const upstreamBlockedError =
    "YouTube is currently blocking server-side downloads for this video (it now requires a proof-of-origin token that only a real browser session can generate). Use \"Watch\" to stream it, or \"Open on YouTube\" to download from there.";

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s-]/g, "").trim() || "download";

    if (format === "mp3") {
      res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);
      res.setHeader("Content-Type", "audio/mpeg");
      ytdl(url, { filter: "audioonly", quality: "highestaudio" })
        .on("error", (err) => {
          req.log.error({ err }, "YouTube audio stream failed");
          if (!res.headersSent) res.status(502).json({ error: upstreamBlockedError });
        })
        .pipe(res);
    } else {
      res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
      res.setHeader("Content-Type", "video/mp4");
      ytdl(url, { filter: "videoandaudio", quality: "highest" })
        .on("error", (err) => {
          req.log.error({ err }, "YouTube video stream failed");
          if (!res.headersSent) res.status(502).json({ error: upstreamBlockedError });
        })
        .pipe(res);
    }
  } catch (err) {
    req.log.error({ err }, "YouTube download failed");
    if (!res.headersSent) res.status(502).json({ error: upstreamBlockedError });
  }
});

export default router;
