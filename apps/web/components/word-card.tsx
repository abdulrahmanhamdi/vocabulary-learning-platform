// components/word-card.tsx
'use client';

import { motion } from 'framer-motion';
import { Word } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  StarOff,
  Eye,
  EyeOff,
  Check,
  X,
  Volume2,
} from 'lucide-react';
import { speak } from '@/lib/speech';
import { cn } from '@/lib/utils';

interface WordCardProps {
  word: Word;
  showTranslation: boolean;
  isFavorite: boolean;
  isKnown: boolean;
  onToggleTranslation: () => void;
  onToggleFavorite: () => void;
  onToggleKnown: () => void;
  className?: string;
}

export function WordCard({
  word,
  showTranslation,
  isFavorite,
  isKnown,
  onToggleTranslation,
  onToggleFavorite,
  onToggleKnown,
  className,
}: WordCardProps) {
  const handlePlayPronunciation = () => {
    speak(word.english);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-6 md:p-8">
          {/* English */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                {word.english}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPronunciation}
                className="h-10 w-10 rounded-full"
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Translation */}
          <div className="mt-6">
            {showTranslation ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Turkish</p>
                  <p className="text-lg font-medium md:text-xl">
                    {word.turkish}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Arabic</p>
                  <p className="text-lg font-medium md:text-xl" dir="rtl">
                    {word.arabic}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={onToggleTranslation}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Show Translation
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={showTranslation ? 'outline' : 'default'}
              size="sm"
              onClick={onToggleTranslation}
              className="gap-2"
            >
              {showTranslation ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show
                </>
              )}
            </Button>

            <Button
              variant={isFavorite ? 'default' : 'outline'}
              size="sm"
              onClick={onToggleFavorite}
              className="gap-2"
            >
              {isFavorite ? (
                <>
                  <Star className="h-4 w-4 fill-current" />
                  Favorite
                </>
              ) : (
                <>
                  <StarOff className="h-4 w-4" />
                  Favorite
                </>
              )}
            </Button>

            <Button
              variant={isKnown ? 'default' : 'outline'}
              size="sm"
              onClick={onToggleKnown}
              className="gap-2"
            >
              {isKnown ? (
                <>
                  <Check className="h-4 w-4" />
                  Known
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  Unknown
                </>
              )}
            </Button>
          </div>

          {/* Status Badge */}
          <div className="mt-4 flex justify-center gap-2">
            {isKnown && (
              <Badge variant="default" className="gap-1 bg-green-500">
                <Check className="h-3 w-3" /> Known
              </Badge>
            )}
            {isFavorite && (
              <Badge variant="default" className="gap-1 bg-yellow-500">
                <Star className="h-3 w-3 fill-current" /> Favorite
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}