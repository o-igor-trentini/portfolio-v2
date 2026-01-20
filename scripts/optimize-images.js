import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const WEBP_DIR = path.join(IMAGES_DIR, 'webp');
const BLUR_DIR = path.join(IMAGES_DIR, 'blur');

// Configurações de tamanhos responsivos
const SIZES = {
    small: 640,
    medium: 1024,
    large: 1920,
};

// Configurações de qualidade
const QUALITY = {
    webp: 80,
    blur: 10,
};

/**
 * Cria diretórios necessários
 */
async function ensureDirectories() {
    await fs.mkdir(WEBP_DIR, { recursive: true });
    await fs.mkdir(BLUR_DIR, { recursive: true });

    // Criar subdiretórios para cada tamanho
    for (const size of Object.keys(SIZES)) {
        await fs.mkdir(path.join(WEBP_DIR, size), { recursive: true });
    }
}

/**
 * Obtém todas as imagens do diretório
 */
async function getImageFiles(dir) {
    try {
        const files = await fs.readdir(dir);
        const imageFiles = [];

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                // Recursivamente buscar em subdiretórios (exceto webp e blur)
                if (!['webp', 'blur'].includes(file)) {
                    const subFiles = await getImageFiles(filePath);
                    imageFiles.push(...subFiles);
                }
            } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
                imageFiles.push(filePath);
            }
        }

        return imageFiles;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Diretório ${dir} não existe. Criando...`);
            await fs.mkdir(dir, { recursive: true });
            return [];
        }
        throw error;
    }
}

/**
 * Converte imagem para WebP em múltiplos tamanhos
 */
async function convertToWebP(imagePath) {
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const relativePath = path.relative(IMAGES_DIR, path.dirname(imagePath));

    console.log(`Processando: ${fileName}`);

    try {
        // Converter para cada tamanho
        for (const [sizeName, width] of Object.entries(SIZES)) {
            const outputDir = path.join(WEBP_DIR, sizeName, relativePath);
            await fs.mkdir(outputDir, { recursive: true });

            const outputPath = path.join(outputDir, `${fileName}.webp`);

            await sharp(imagePath)
                .resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside',
                })
                .webp({ quality: QUALITY.webp })
                .toFile(outputPath);

            console.log(`  ✓ ${sizeName}: ${outputPath}`);
        }

        // Criar versão blur (placeholder)
        const blurOutputDir = path.join(BLUR_DIR, relativePath);
        await fs.mkdir(blurOutputDir, { recursive: true });

        const blurOutputPath = path.join(blurOutputDir, `${fileName}.webp`);

        await sharp(imagePath)
            .resize(10, 10, { fit: 'inside' })
            .webp({ quality: QUALITY.blur })
            .blur(2)
            .toFile(blurOutputPath);

        console.log(`  ✓ blur: ${blurOutputPath}`);
    } catch (error) {
        console.error(`Erro ao processar ${fileName}:`, error.message);
    }
}

/**
 * Gera data URI base64 para placeholders blur
 */
async function generateBlurDataURL(imagePath) {
    const buffer = await sharp(imagePath)
        .resize(10, 10, { fit: 'inside' })
        .webp({ quality: 10 })
        .blur(2)
        .toBuffer();

    return `data:image/webp;base64,${buffer.toString('base64')}`;
}

/**
 * Cria arquivo de metadados com blur data URLs
 */
async function createMetadataFile(imageFiles) {
    const metadata = {};

    for (const imagePath of imageFiles) {
        const fileName = path.basename(imagePath, path.extname(imagePath));
        const relativePath = path.relative(IMAGES_DIR, imagePath);
        const blurDataURL = await generateBlurDataURL(imagePath);

        metadata[relativePath.replace(/\\/g, '/')] = {
            fileName,
            blurDataURL,
        };
    }

    const metadataPath = path.join(IMAGES_DIR, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    console.log(`\n✓ Arquivo de metadados criado: ${metadataPath}`);
}

/**
 * Função principal
 */
async function main() {
    console.log('🖼️  Iniciando otimização de imagens...\n');

    try {
        await ensureDirectories();
        const imageFiles = await getImageFiles(IMAGES_DIR);

        if (imageFiles.length === 0) {
            console.log('⚠️  Nenhuma imagem encontrada em public/images/');
            console.log('💡 Adicione suas imagens em public/images/ e execute novamente.');
            return;
        }

        console.log(`📁 Encontradas ${imageFiles.length} imagens\n`);

        // Processar cada imagem
        for (const imagePath of imageFiles) {
            await convertToWebP(imagePath);
        }

        // Criar arquivo de metadados
        await createMetadataFile(imageFiles);

        console.log('\n✅ Otimização concluída!');
        console.log(`\n📊 Estatísticas:`);
        console.log(`   - ${imageFiles.length} imagens processadas`);
        console.log(`   - ${Object.keys(SIZES).length} tamanhos por imagem`);
        console.log(`   - Total de arquivos WebP: ${imageFiles.length * (Object.keys(SIZES).length + 1)}`);
    } catch (error) {
        console.error('❌ Erro durante otimização:', error);
        process.exit(1);
    }
}

main();
