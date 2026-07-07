import Image from "next/image";

// A large, very faint NYU Mariachi logo fixed behind the page content so a tab
// never reads as an empty white screen. Purely decorative.
export function LogoWatermark() {
  return (
    <Image
      src="/images/logo/nyu_logo.png"
      alt=""
      aria-hidden
      width={900}
      height={900}
      priority={false}
      className="pointer-events-none fixed left-1/2 top-[52%] -z-10 h-auto w-[min(85vw,600px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
    />
  );
}
