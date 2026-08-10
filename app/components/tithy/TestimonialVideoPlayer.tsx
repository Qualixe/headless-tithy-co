import {useEffect, useRef, useState} from 'react';
import {Volume2, VolumeX} from 'lucide-react';

export function TestimonialVideoPlayer({url}: {url: string}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // `autoPlay`/`muted` as JSX attributes aren't reliably synced to the live
  // DOM properties browsers check for autoplay after hydration, so set them
  // imperatively and kick off playback explicitly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="relative w-full aspect-9/16 rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={url}
        muted
        loop
        playsInline
        preload="auto"
      />
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
