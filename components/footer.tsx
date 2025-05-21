import Link from "next/link"
import { Instagram, Linkedin, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 mt-auto bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-slate-700 dark:text-slate-300">
            Designed and developed by{" "}
            <Link
              href="https://jayakanthkamisetti.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Jayakanth Kamisetti
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://instagram.com/jayakanthkamisetti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/jayakanthkamisetti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/jayakanthkamisetti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:contact@jayakanthkamisetti.com"
            className="text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
