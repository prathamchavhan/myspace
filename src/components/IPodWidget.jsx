"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const songs = [
    {
        title: "Starboy",
        artist: "The Weeknd",
        url: "/assets/starboy.mp3"
    },
    { title: "Perfect", artist: "Ed Sheeran", url: "/assets/perfect.mp3" },
    { title: "I Really Do", artist: "Karan Aujla, Ikky", url: "/assets/karan.mp3" },
    { title: "RUN IT UP", artist: "Hanumankind", url: "/assets/runitup.mp3" },
    { title: "The Night We Met", artist: "Lord Huron", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Take Me Home, Country Roads", artist: "John Denver", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "End of Beginning", artist: "Djo", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "Yellow", artist: "Coldplay", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { title: "Hotel California", artist: "Eagles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
];

export default function IPodWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [viewMode, setViewMode] = useState("playlist"); // "playlist" or "nowPlaying"
    const audioRef = useRef(null);

    // Audio Playback effect
    useEffect(() => {
        if (!isOpen) {
            audioRef.current?.pause();
            setIsPlaying(false);
            return;
        }

        const audio = audioRef.current;
        if (isPlaying) {
            audio.play().catch(e => console.log('Audio autoplay blocked'));
        } else {
            audio.pause();
        }
    }, [isPlaying, isOpen, currentSong]);

    const handlePlayPause = (e) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    const nextSong = (e) => {
        e.stopPropagation();
        setCurrentSong((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    const prevSong = (e) => {
        e.stopPropagation();
        setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const handleSeek = (e) => {
        if (!audioRef.current || duration === 0) return;
        const bar = e.currentTarget;
        const clickPosition = e.clientX - bar.getBoundingClientRect().left;
        const percentage = Math.max(0, Math.min(1, clickPosition / bar.offsetWidth));
        const newTime = percentage * duration;

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(percentage * 100);
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={songs[currentSong].url}
                onTimeUpdate={onTimeUpdate}
                onEnded={nextSong}
            />

            {/* Desktop Icon (Draggable) */}
            <motion.div
                drag
                dragMomentum={false}
                className="absolute left-6 sm:left-12 lg:left-24 bottom-62 sm:bottom-54 lg:bottom-88 z-40 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative flex items-center justify-center transition-transform group-hover:scale-110">
                    <img
                        src="/assets/ipod.png"
                        alt="iPod Icon"
                        className="w-8 sm:w-10 h-auto drop-shadow-md"
                        draggable={false}
                        onError={(e) => {
                            // Fallback if the user hasn't named the file correctly yet
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    {/* Fallback CSS iPod if the image is missing */}
                    <div className="hidden w-8 h-[44px] bg-white rounded shadow-lg border border-gray-200 flex flex-col items-center p-1">
                        <div className="w-full h-4 bg-black rounded-sm border border-gray-800" />
                        <div className="w-5 h-5 mt-1 bg-gray-100 rounded-full border border-gray-300" />
                    </div>
                </div>
                <span className="text-xs font-semibold text-[#0f172a] dark:text-gray-200 group-hover:bg-blue-600 group-hover:text-white px-1.5 py-0.5 rounded transition-colors shadow-sm">
                    iPod
                </span>
            </motion.div>

            {/* Modal Window Wrapper */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        drag
                        dragMomentum={false}
                        className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 z-[1000] w-[340px] h-[550px] bg-white dark:bg-[#1a1c23] rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col"
                        style={{ margin: "auto", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} // Center via CSS
                    >
                        {/* Fake Mac Window Header */}
                        <div className="h-8 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 cursor-grab active:cursor-grabbing justify-between shrink-0">
                            <div className="flex gap-2">
                                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-red-600 shadow-inner border border-black/10" />
                                <button className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-inner border border-black/10" />
                                <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-inner border border-black/10" />
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex-1 text-center pr-16 select-none">iPod</span>
                        </div>

                        {/* iPod Body Container */}
                        <div
                            className="flex-1 overflow-hidden"
                            style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E") #e5e7eb' }}
                        >
                            <div className="w-full h-full flex flex-col items-center pt-8 pb-10 px-5 gap-8 bg-black/5 dark:bg-black/60">
                                {/* Black iPod Device */}
                                <div className="w-[300px] h-[460px] bg-[#1a1a1a] rounded-[32px] border-[5px] border-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center pt-8 pb-10 px-5 gap-8 overflow-hidden relative">

                                    {/* Screen */}
                                    <div className="w-full h-[180px] bg-[#9bb59b] border-[3px] border-black rounded-lg shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] flex flex-col font-mono text-black overflow-hidden relative p-3">
                                        {viewMode === "playlist" ? (
                                            <div
                                                className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                                onPointerDownCapture={(e) => e.stopPropagation()}
                                                onWheelCapture={(e) => e.stopPropagation()}
                                            >
                                                <div className="font-bold text-[15px] mb-2 px-1">iPod</div>
                                                <div className="flex flex-col gap-0.5">
                                                    {songs.map((song, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={(e) => { e.stopPropagation(); setCurrentSong(i); setIsPlaying(true); setViewMode("nowPlaying"); }}
                                                            className={`px-1.5 py-0.5 text-[12px] truncate cursor-pointer font-bold tracking-tight ${currentSong === i ? 'bg-black text-[#9bb59b]' : ''}`}
                                                        >
                                                            {song.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center w-full pt-1 relative">
                                                {/* On-Screen Back Button */}
                                                <div
                                                    className="absolute top-0 left-0 flex items-center gap-0.5 cursor-pointer hover:opacity-60 text-[10px] font-bold"
                                                    onClick={(e) => { e.stopPropagation(); setViewMode("playlist"); }}
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6" /></svg>
                                                    Back
                                                </div>
                                                <h3 className="font-bold text-[14px] truncate w-full text-center mt-2 px-6">{songs[currentSong].title}</h3>
                                                <p className="text-[11px] truncate w-full text-center font-bold mt-2 mb-6 text-black">{songs[currentSong].artist}</p>

                                                <div className="w-full px-2 mb-2">
                                                    <div
                                                        className="w-full h-[4px] bg-black/30 relative cursor-pointer"
                                                        onClick={handleSeek}
                                                    >
                                                        <div className="absolute top-0 left-0 h-full bg-black transition-all duration-75" style={{ width: `${progress}%` }} />
                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-center text-[11px] font-bold tracking-widest mt-1">
                                                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                                                </div>

                                                <div className="text-[12px] font-bold flex items-center gap-2 mt-4">
                                                    {isPlaying ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                                                    <span>{isPlaying ? 'Playing' : 'Paused'}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Click Wheel */}
                                    <div className="relative w-48 h-48 bg-[#f5f5f5] rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.2),_0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center border-2 border-gray-400">
                                        <span onClick={(e) => { e.stopPropagation(); setViewMode("playlist"); }} className="absolute top-4 text-[11px] font-bold text-gray-500 tracking-widest cursor-pointer hover:text-black">MENU</span>
                                        <SkipBack onClick={prevSong} className="absolute left-4 w-5 h-5 text-gray-500 cursor-pointer hover:text-black hover:scale-110 active:scale-95 transition-transform" />
                                        <SkipForward onClick={nextSong} className="absolute right-4 w-5 h-5 text-gray-500 cursor-pointer hover:text-black hover:scale-110 active:scale-95 transition-transform" />
                                        <div onClick={handlePlayPause} className="absolute bottom-4 text-gray-500 cursor-pointer hover:text-black hover:scale-110 active:scale-95 transition-transform flex items-center gap-0.5">
                                            <Play className="w-4 h-4 fill-current" />
                                            <Pause className="w-4 h-4 fill-current" />
                                        </div>

                                        {/* Center Button */}
                                        <div
                                            onClick={handlePlayPause}
                                            className="w-16 h-16 bg-[#e0e0e0] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] border border-[#c0c0c0] cursor-pointer hover:bg-[#d0d0d0] active:scale-95 transition-all"
                                        />
                                    </div>

                                    {/* Shiny glare overlay for IPOD */}
                                    <div className="absolute top-0 left-0 right-0 h-[225px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[28px]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
