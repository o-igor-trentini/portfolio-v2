import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, type MouseEvent } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface GalleryImage {
    url: string;
    caption: string;
}

interface ImageGalleryProps {
    images: GalleryImage[];
    color: string;
}

export const ImageGallery = ({ images, color }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const goToPrevious = () => {
        if (selectedImage !== null) {
            setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
        }
    };

    const goToNext = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % images.length);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
            >
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <h3>Galeria de Momentos</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => openLightbox(index)}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-800"
                        >
                            <ImageWithFallback
                                src={image.url}
                                alt={image.caption}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white text-sm line-clamp-2">{image.caption}</p>
                                </div>
                            </div>

                            {/* Magnifying glass icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileHover={{ opacity: 1, scale: 1 }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    className="w-4 h-4 text-zinc-700 dark:text-zinc-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white z-10"
                        >
                            <X className="w-5 h-5" />
                        </Button>

                        {/* Navigation buttons */}
                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e: MouseEvent) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white z-10"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e: MouseEvent) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white z-10"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                            </>
                        )}

                        {/* Image counter */}
                        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                            {selectedImage + 1} / {images.length}
                        </div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-5xl w-full"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl">
                                <ImageWithFallback
                                    src={images[selectedImage].url}
                                    alt={images[selectedImage].caption}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Caption */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 text-center"
                            >
                                <p className="text-white text-lg">{images[selectedImage].caption}</p>
                            </motion.div>

                            {/* Thumbnail strip */}
                            {images.length > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-6 flex justify-center gap-2 overflow-x-auto pb-2"
                                >
                                    {images.map((image, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage(index);
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                                                selectedImage === index
                                                    ? 'border-white scale-110'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <ImageWithFallback
                                                src={image.url}
                                                alt={image.caption}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
