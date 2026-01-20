import { useState, useEffect, type ImgHTMLAttributes } from 'react';
import {
    getWebPPath,
    generateSrcSet,
    generateSizes,
    getBlurDataURL,
    getDefaultBlurDataURL,
    getErrorImageSrc,
    isValidImageUrl,
    loadImageMetadata,
} from '@/utils/imageUtils';

export interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
    /** Caminho da imagem original */
    src: string;
    /** Texto alternativo (obrigatório para acessibilidade) */
    alt: string;
    /** Largura da imagem */
    width?: number | string;
    /** Altura da imagem */
    height?: number | string;
    /** Prioridade de carregamento (desabilita lazy loading) */
    priority?: boolean;
    /** Tamanho preferencial da imagem */
    size?: 'small' | 'medium' | 'large';
    /** Custom sizes attribute */
    customSizes?: string;
    /** Desabilitar blur placeholder */
    noBlur?: boolean;
    /** Desabilitar WebP (usar imagem original) */
    noWebP?: boolean;
    /** Desabilitar srcset (usar apenas uma imagem) */
    noSrcSet?: boolean;
    /** Callback quando a imagem carrega */
    onLoad?: () => void;
    /** Callback quando ocorre erro */
    onError?: () => void;
}

/**
 * Componente de imagem otimizada com suporte a:
 * - WebP com fallback automático
 * - Lazy loading nativo
 * - Blur placeholders
 * - Responsive images (srcset)
 * - Error handling
 */
export function OptimizedImage({
    src,
    alt,
    width,
    height,
    priority = false,
    size = 'medium',
    customSizes,
    noBlur = false,
    noWebP = false,
    noSrcSet = false,
    className = '',
    style,
    onLoad,
    onError,
    ...rest
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [blurDataURL, setBlurDataURL] = useState<string | undefined>(undefined);

    // Carrega metadados na montagem do componente
    useEffect(() => {
        if (!noBlur) {
            loadImageMetadata().then(() => {
                const blur = getBlurDataURL(src);
                setBlurDataURL(blur || getDefaultBlurDataURL());
            });
        }
    }, [src, noBlur]);

    // Valida URL da imagem
    if (!isValidImageUrl(src)) {
        console.warn(`OptimizedImage: URL inválida - ${src}`);
        return (
            <div
                className={`inline-block bg-gray-100 text-center align-middle ${className}`}
                style={{ width, height, ...style }}
            >
                <img src={getErrorImageSrc()} alt={alt} {...rest} />
            </div>
        );
    }

    // Handlers
    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    // Se houver erro, mostra imagem de erro
    if (hasError) {
        return (
            <div
                className={`inline-block bg-gray-100 text-center align-middle ${className}`}
                style={{ width, height, ...style }}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <img src={getErrorImageSrc()} alt="Erro ao carregar imagem" {...rest} data-original-url={src} />
                </div>
            </div>
        );
    }

    // Determina o caminho da imagem
    const imageSrc = noWebP ? src : getWebPPath(src, size);

    // Gera srcset e sizes
    const srcSet = !noSrcSet && !noWebP ? generateSrcSet(src) : undefined;
    const sizes = srcSet ? generateSizes(customSizes) : undefined;

    // Estilo com blur placeholder
    const imageStyle: React.CSSProperties = {
        ...style,
        ...(blurDataURL &&
            !isLoaded &&
            !noBlur && {
                backgroundImage: `url(${blurDataURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }),
    };

    return (
        <picture>
            {/* Source WebP com srcset */}
            {!noWebP && srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}

            {/* Fallback ou imagem principal */}
            <img
                src={imageSrc}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                style={imageStyle}
                onLoad={handleLoad}
                onError={handleError}
                {...rest}
            />
        </picture>
    );
}

/**
 * Componente de imagem com prioridade (para hero, LCP)
 */
export function PriorityImage(props: Omit<OptimizedImageProps, 'priority'>) {
    return <OptimizedImage {...props} priority />;
}

/**
 * Componente de imagem simples (sem otimizações)
 */
export function SimpleImage({ src, alt, className, style, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
                <img src={getErrorImageSrc()} alt={alt || 'Erro'} {...rest} />
            </div>
        );
    }

    return <img src={src} alt={alt} className={className} style={style} onError={() => setHasError(true)} {...rest} />;
}

export default OptimizedImage;
