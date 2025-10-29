import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";

export const compress = async (userInput, currentDirectory) => {
    try {
        const [ , source, destination ] = userInput.split(' ');
        const sourcePath = resolve(currentDirectory, source);
        const destPath = resolve(currentDirectory, destination);

        await pipeline(
            createReadStream(sourcePath),
            createBrotliCompress(),
            createWriteStream(destPath)
        );

        console.log('File compressed successfully');
    } catch {
        console.log('Operation failed');
    }
}