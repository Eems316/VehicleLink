import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans">
      <main className="min-h-screen bg-repeat-y bg-center w-3xl"
            style={{backgroundImage: "url('/chain.png')",
              backgroundSize: "clamp(3px, .5vw, 15px) auto",
            }}>
        <Image
            src="/hoist.png"
            alt="VehicleLink"
            width={1980}
            height={1855}
            className="fixed h-auto w-95% min-w-[425px] m-auto left-1/2 top-[50px] -translate-x-1/2 z-995"
            priority
        />

      </main>
    </div>
  );
}
