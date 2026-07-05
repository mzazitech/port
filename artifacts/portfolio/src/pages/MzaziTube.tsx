import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, Download, Music2, Video, Play, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchYoutube } from "@workspace/api-client-react";

export default function MzaziTubePage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const { data, isFetching, isError, error } = useSearchYoutube(
    { q: submittedQuery },
    { query: { enabled: submittedQuery.length > 0, queryKey: ["searchYoutube", submittedQuery] } },
  );

  const results = data?.results ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length > 0) setSubmittedQuery(trimmed);
  };

  const handleDownload = async (videoId: string, format: "mp3" | "mp4", title: string) => {
    const key = `${videoId}-${format}`;
    setDownloadingKey(key);
    setDownloadError(null);
    try {
      const res = await fetch(`/api/youtube/download?videoId=${videoId}&format=${format}`);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Download failed. Please try again.");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^\w\s-]/g, "").trim() || "download"}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError((err as Error).message);
    } finally {
      setDownloadingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b border-border overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12">
              <ArrowLeft size={16} /> Back to Portfolio
            </button>
          </Link>

          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
            Mzazi<span className="text-primary">Tube</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Search, stream, and download YouTube videos directly as MP4 or MP3 files.
          </p>

          <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a video..."
              className="flex-1 h-14 px-5 bg-card border-2 border-border focus:border-primary outline-none text-lg placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              disabled={isFetching}
              className="h-14 px-8 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-white hover:text-background transition-colors"
            >
              {isFetching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </Button>
          </form>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {submittedQuery.length === 0 && (
            <p className="text-muted-foreground text-lg">Enter a search term above to find videos.</p>
          )}

          {isError && (
            <p className="text-destructive text-lg">
              {(error as Error)?.message || "Something went wrong. Please try again."}
            </p>
          )}

          {submittedQuery.length > 0 && !isFetching && !isError && results.length === 0 && (
            <p className="text-muted-foreground text-lg">No results found for "{submittedQuery}".</p>
          )}

          {downloadError && (
            <div className="flex items-start justify-between gap-4 mb-6 p-4 border-2 border-primary bg-primary/10 text-sm">
              <p>{downloadError}</p>
              <button
                onClick={() => setDownloadError(null)}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {results.map((video) => {
              const mp3Key = `${video.videoId}-mp3`;
              const mp4Key = `${video.videoId}-mp4`;
              return (
                <div
                  key={video.videoId}
                  className="flex flex-col sm:flex-row gap-4 p-4 border border-border bg-card"
                >
                  <button
                    onClick={() => setActiveVideoId(video.videoId)}
                    className="relative shrink-0 w-full sm:w-56 aspect-video overflow-hidden bg-black group"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="text-white drop-shadow-lg" size={36} fill="currentColor" />
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-xs font-bold">
                      {video.duration}
                    </span>
                  </button>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg leading-snug mb-1 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {video.channel} · {video.views}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button
                        onClick={() => handleDownload(video.videoId, "mp3", video.title)}
                        disabled={downloadingKey === mp3Key}
                        variant="outline"
                        className="rounded-none border-2 font-bold uppercase tracking-wider text-xs h-10"
                      >
                        {downloadingKey === mp3Key ? (
                          <Loader2 className="animate-spin mr-2" size={16} />
                        ) : (
                          <Music2 className="mr-2" size={16} />
                        )}
                        MP3
                      </Button>
                      <Button
                        onClick={() => handleDownload(video.videoId, "mp4", video.title)}
                        disabled={downloadingKey === mp4Key}
                        variant="outline"
                        className="rounded-none border-2 font-bold uppercase tracking-wider text-xs h-10"
                      >
                        {downloadingKey === mp4Key ? (
                          <Loader2 className="animate-spin mr-2" size={16} />
                        ) : (
                          <Video className="mr-2" size={16} />
                        )}
                        MP4
                      </Button>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs h-10 hover:bg-white hover:text-background transition-colors">
                          <Download className="mr-2" size={16} />
                          Open on YouTube
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeVideoId && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setActiveVideoId(null)}
        >
          <button
            onClick={() => setActiveVideoId(null)}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            aria-label="Close player"
          >
            <X size={32} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
