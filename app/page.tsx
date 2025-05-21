"use client"

import { useState, useEffect } from "react"
import { ArrowRight, QrCode, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-purple-100 to-teal-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500 to-violet-500 opacity-20 dark:opacity-30 rounded-full"></div>
              <QrCode className="w-24 h-24 text-rose-500 dark:text-rose-400 relative z-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-6"
          >
            QR <span className="text-rose-500 dark:text-rose-400">Forge</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mb-8"
          >
            <p className="mb-4">
              Create stunning, customizable QR codes with advanced styling options, logo embedding, and QR code scanning
              capabilities.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/generate">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 rounded-xl">
                Create QR Code <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/scan">
              <Button size="lg" variant="outline" className="px-8 py-6 rounded-xl">
                Scan QR Code <ImageIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
