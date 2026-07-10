// Grid of performance video clips. `preload="metadata"` so nothing downloads
// until played; object-contain letterboxes any orientation without cropping.
// The `#t=0.001` media fragment nudges the player to seek to the first frame so
// iOS Safari paints a real preview frame instead of a black box.
export function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((src) => (
        <video
          key={src}
          src={`${src}#t=0.001`}
          controls
          playsInline
          muted
          preload="metadata"
          className="aspect-video w-full bg-black object-contain"
        />
      ))}
    </div>
  );
}
