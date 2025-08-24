import Image from 'next/image';
export default function LoadingPage() {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <video
                width="80"
                height="80"
                autoPlay
                loop
                muted
                playsInline
                className="object-contain"
            >
                <source src="/assests/logo_gif.mp4" type="video/mp4" />
                {/* Fallback to GIF if MP4 doesn't work */}
                <Image
                    src="loading.png"
                    alt="Loading..."
                    width={100}
                    height={100}
                    unoptimized={true}
                    priority={true}
                />
            </video>
        </div>
    );
}