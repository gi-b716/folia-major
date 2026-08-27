import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// src/components/app/overlays/NowPlayingToast.tsx

const NOW_PLAYING_TOAST_VISIBLE_MS = 3500;

export interface NowPlayingToastSong {
    title: string;
    artist: string | null;
    coverUrl: string | null;
}

type NowPlayingToastProps = {
    song: NowPlayingToastSong;
    trackKey: string;
    isDaylight: boolean;
};

const NowPlayingToast: React.FC<NowPlayingToastProps> = ({ song, trackKey, isDaylight }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = window.setTimeout(() => setVisible(false), NOW_PLAYING_TOAST_VISIBLE_MS);
        return () => window.clearTimeout(timer);
    }, [trackKey]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key={trackKey}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`pointer-events-none fixed bottom-6 left-4 z-40 flex items-center gap-3 overflow-hidden rounded-2xl border p-2 pr-4 backdrop-blur-xl shadow-lg transition-colors ${isDaylight
                        ? 'border-black/10 bg-white/35 text-zinc-900'
                        : 'border-white/10 bg-black/35 text-white'
                        }`}
                >
                    <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`absolute inset-x-0 top-0 h-[2px] origin-left ${isDaylight
                            ? 'bg-gradient-to-r from-transparent via-black/40 to-transparent'
                            : 'bg-gradient-to-r from-transparent via-white/50 to-transparent'
                            }`}
                    />
                    <div
                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cover bg-center ${isDaylight ? 'bg-zinc-200' : 'bg-zinc-800'
                            }`}
                        style={song.coverUrl ? { backgroundImage: `url(${song.coverUrl})` } : undefined}
                    >
                        {!song.coverUrl && <Music size={18} className={isDaylight ? 'text-black/35' : 'text-white/35'} />}
                    </div>
                    <div className="min-w-0 max-w-[200px]">
                        <div className="truncate text-[13px] font-bold leading-5">{song.title}</div>
                        <div className={`truncate text-[11px] font-medium ${isDaylight ? 'text-black/55' : 'text-white/50'
                            }`}>
                            {song.artist || t('ui.unknownArtist')}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NowPlayingToast;
