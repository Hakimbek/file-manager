import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";

export const decompress = async (userInput, currentDirectory) => {
    try {
        const [ , source, destination ] = userInput.split(' ');
        const sourcePath = resolve(currentDirectory, source);
        const destPath = resolve(currentDirectory, destination);

        await pipeline(
            createReadStream(sourcePath),
            createBrotliDecompress(),
            createWriteStream(destPath)
        );

        console.log('File decompressed successfully');
    } catch {
        console.log('Operation failed');
    }
}