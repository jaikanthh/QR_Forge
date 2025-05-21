"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Sun, Moon, Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://nextjs.org")
  const [size, setSize] = useState(200)
  const [qrColor, setQrColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [qrStyle, setQrStyle] = useState("squares")
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [logoSize, setLogoSize] = useState(30)
  const [cornerStyle, setCornerStyle] = useState("square")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogoImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDownload = () => {
    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Add padding for border
      const padding = 20
      canvas.width = size + (padding * 2)
      canvas.height = size + (padding * 2)

      // Fill background
      ctx!.fillStyle = bgColor
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Draw QR code
      ctx!.drawImage(img, padding, padding, size, size)

      // Draw logo if exists
      if (logoImage) {
        const logoImg = new Image()
        logoImg.crossOrigin = "anonymous"
        logoImg.onload = () => {
          const logoWidth = size * (logoSize / 100)
          const logoHeight = logoWidth
          const logoX = padding + (size - logoWidth) / 2
          const logoY = padding + (size - logoHeight) / 2

          // Draw white background for logo
          ctx!.fillStyle = "#ffffff"
          ctx!.fillRect(logoX - 5, logoY - 5, logoWidth + 10, logoHeight + 10)

          // Draw logo
          ctx!.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight)

          // Create download
          const pngFile = canvas.toDataURL("image/png")
          const downloadLink = document.createElement("a")
          downloadLink.download = `qrcode-${Date.now()}.png`
          downloadLink.href = pngFile
          downloadLink.click()
        }
        logoImg.src = logoImage
      } else {
        // No logo, just download
        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.download = `qrcode-${Date.now()}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
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
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">QR Forge Generator</h1>
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
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Enter URL or text</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com"
                    className="border-2 focus-visible:ring-rose-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size: {size}px</Label>
                  <Slider
                    id="size"
                    min={100}
                    max={400}
                    step={10}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    className="[&>span:first-child]:bg-rose-500 [&_[role=slider]]:bg-rose-500"
                  />
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qrColor">QR Code Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="qrColor"
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <span className="text-sm font-mono">{qrColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bgColor">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="bgColor"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <span className="text-sm font-mono">{bgColor}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload Logo (Optional)</Label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="flex-1"
                      />
                      {logoImage && (
                        <Button variant="outline" size="sm" onClick={handleRemoveLogo} className="whitespace-nowrap">
                          Remove
                        </Button>
                      )}
                    </div>

                    {logoImage && (
                      <div className="space-y-2">
                        <Label htmlFor="logoSize">Logo Size: {logoSize}%</Label>
                        <Slider
                          id="logoSize"
                          min={5}
                          max={40}
                          step={1}
                          value={[logoSize]}
                          onValueChange={(value) => setLogoSize(value[0])}
                          className="[&>span:first-child]:bg-rose-500 [&_[role=slider]]:bg-rose-500"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Note: Very large logos may make the QR code unscannable
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

            </Tabs>

            <div className="pt-4 mt-4 border-t">
              <Button onClick={handleDownload} className="w-full bg-rose-500 hover:bg-rose-600">
                <Download className="mr-2 h-4 w-4" /> Download QR Code
              </Button>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center">
            <div className="p-8 rounded-xl mb-4 relative" style={{ backgroundColor: bgColor }}>
              <QRCodeSVG
                id="qr-code"
                value={text || " "}
                size={200}
                fgColor={qrColor}
                bgColor={bgColor}
                level="H"
                includeMargin={false}
                imageSettings={logoImage ? {
                  src: logoImage,
                  excavate: true,
                  height: 200 * (logoSize / 100),
                  width: 200 * (logoSize / 100),
                } : undefined}
                {...(qrStyle === "dots"
                  ? { className: "rounded-full" }
                  : {})}
              />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Scan with your phone camera to test
            </p>

            <div className="mt-4 flex gap-2 flex-wrap justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-6 h-6 rounded-full bg-rose-500 cursor-pointer"
                      onClick={() => setQrColor("#f43f5e")}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>Rose</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer"
                      onClick={() => setQrColor("#a855f7")}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>Purple</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"
                      onClick={() => setQrColor("#3b82f6")}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>Blue</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"
                      onClick={() => setQrColor("#22c55e")}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>Green</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-6 h-6 rounded-full bg-amber-500 cursor-pointer"
                      onClick={() => setQrColor("#f59e0b")}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>Amber</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-6 h-6 rounded-full bg-black cursor-pointer"
                      onClick={() => setQrColor("#000000")}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>Black</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
