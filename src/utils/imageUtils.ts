/**
 * Gera caminho para imagem WebP otimizada
 */
export function getWebPPath(src: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
    // Remove extensão original
    const pathWithoutExt = src.replace(/\.(jpg|jpeg|png)$/i, '');

    // Se já for webp, retorna o original
    if (src.endsWith('.webp')) {
        return src;
    }

    // Remove /images/ do início se existir
    const relativePath = pathWithoutExt.replace(/^\/images\//, '');

    return `/images/webp/${size}/${relativePath}.webp`;
}

/**
 * Gera srcset para imagens responsivas
 */
export function generateSrcSet(src: string): string {
    const small = getWebPPath(src, 'small');
    const medium = getWebPPath(src, 'medium');
    const large = getWebPPath(src, 'large');

    return `${small} 640w, ${medium} 1024w, ${large} 1920w`;
}

/**
 * Gera sizes attribute para imagens responsivas
 */
export function generateSizes(customSizes?: string): string {
    if (customSizes) {
        return customSizes;
    }

    return '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px';
}

/**
 * Carrega metadados de imagem (blur data URL)
 */
let imageMetadata: Record<string, { fileName: string; blurDataURL: string }> | null = null;

export async function loadImageMetadata(): Promise<void> {
    if (imageMetadata) return;

    try {
        const response = await fetch('/images/metadata.json');
        imageMetadata = await response.json();
    } catch (error) {
        console.warn('Falha ao carregar metadados de imagem:', error);
        imageMetadata = {};
    }
}

/**
 * Obtém blur data URL para uma imagem
 */
export function getBlurDataURL(src: string): string | undefined {
    if (!imageMetadata) {
        return undefined;
    }

    // Normaliza o caminho
    const normalizedPath = src.replace(/^\/images\//, '').replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Busca nos metadados
    for (const [path, data] of Object.entries(imageMetadata)) {
        if (path.includes(normalizedPath) || normalizedPath.includes(data.fileName)) {
            return data.blurDataURL;
        }
    }

    return undefined;
}

/**
 * Gera um blur data URL padrão (cinza claro)
 */
export function getDefaultBlurDataURL(): string {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';
}

/**
 * Valida se uma URL de imagem é válida
 */
export function isValidImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
}

/**
 * Retorna imagem de erro padrão
 */
export function getErrorImageSrc(): string {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
}
