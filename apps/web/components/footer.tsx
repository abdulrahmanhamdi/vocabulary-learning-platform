// components/footer.tsx
'use client';

import Link from 'next/link';
import { Heart, Globe, Share2, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-footer text-footer-foreground transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">© All Rights Reserved</p>
            <p className="text-xs font-semibold text-primary">Eng: Abdulrahaman Hamdi</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>VocabLearn</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="Website"
              className="text-muted-foreground hover:text-link-hover transition-colors"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Share"
              className="text-muted-foreground hover:text-link-hover transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Code"
              className="text-muted-foreground hover:text-link-hover transition-colors"
            >
              <Code className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}