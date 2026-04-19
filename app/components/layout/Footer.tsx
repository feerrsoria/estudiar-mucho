import Link from "next/link";
import { Briefcase, Mail, Globe, X, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-white/10 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Estudiar Mucho
          </Link>
          <p className="text-foreground/60">
            The best way to study and learn, powered by AI.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Estudiar-Mucho. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-foreground/60 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-foreground/60 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:bercho001@gmail.com" className="text-foreground/60 hover:text-primary flex items-center gap-2"><Mail size={18} /> Email</a></li>
              <li><a href="https://fernandosoria.site" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary flex items-center gap-2"><Globe size={18} /> Portfolio</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Social</h3>
          <div className="flex items-center space-x-4 mt-4">
            <a href="https://www.facebook.com/feerrsoria.1" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Share2 size={24} /></a>
            <a href="https://www.instagram.com/feerrsoria.1" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Share2 size={24} /></a>
            <a href="https://www.linkedin.com/in/fernando-soria-a966903b3/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Briefcase size={24} /></a>
            <a href="https://x.com/So65307Soria" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><X size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
