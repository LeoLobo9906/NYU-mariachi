// Grid of performance video clips. `preload="metadata"` so nothing downloads
// until played; object-contain letterboxes any orientation without cropping.
export function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((src) => (
        <video
          key={src}
          src={src}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-black object-contain"
        />
      ))}
    </div>
  );
}
