"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, Scan, Copy, ExternalLink, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import jsQR from "jsqr"

export default function QRCodeScanner() {
  const [scannedResult, setScannedResult] = useState<string | null>(null)
  const [isUrl, setIsUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)
    setScannedResult(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions to match image
        canvas.width = img.width
        canvas.height = img.height

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, img.width, img.height)

        // Get image data for QR code scanning
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        // Scan for QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
          setScannedResult(code.data)
          // Check if result is a URL
          try {
            new URL(code.data)
            setIsUrl(true)
          } catch {
            setIsUrl(false)
          }
        } else {
          setError("No QR code found in the image. Try another image or ensure the QR code is clearly visible.")
        }

        setIsLoading(false)
      }

      img.onerror = () => {
        setError("Failed to load image. Please try another image.")
        setIsLoading(false)
      }

      img.src = event.target?.result as string
    }

    reader.onerror = () => {
      setError("Failed to read file. Please try again.")
      setIsLoading(false)
    }

    reader.readAsDataURL(file)
  }

  const copyToClipboard = () => {
    if (!scannedResult) return

    navigator.clipboard
      .writeText(scannedResult)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The QR code content has been copied to your clipboard.",
        })
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard. Please try again.",
          variant: "destructive",
        })
      })
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-purple-100 to-teal-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">QR Code Scanner</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="qr-image">Upload an image containing a QR code</Label>
                <Input
                  ref={fileInputRef}
                  id="qr-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border-2 focus-visible:ring-rose-500"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-rose-500 hover:bg-rose-600"
                  disabled={isLoading}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isLoading ? "Processing..." : "Upload Image"}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                <p>Supported file types: JPG, PNG, GIF, BMP</p>
                <p className="mt-1">For best results, ensure the QR code is clear and well-lit</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center">
                <Scan className="mr-2 h-5 w-5 text-rose-500" />
                Scan Result
              </h2>

              {scannedResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg break-all">{scannedResult}</div>

                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>

                    {isUrl && (
                      <Button
                        onClick={() => window.open(scannedResult, "_blank")}
                        className="flex-1 bg-rose-500 hover:bg-rose-600"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Open URL
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
                  <Scan className="h-12 w-12 mb-4 opacity-50" />
                  <p>Upload an image to scan for QR codes</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
