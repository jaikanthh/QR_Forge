import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QR Forge",
    short_name: "QR Forge",
    description: "Generate customizable QR codes with a beautiful interface",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f43f5e",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
