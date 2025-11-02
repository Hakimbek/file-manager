import { createReadStream } from 'node:fs';
import {resolve} from "node:path";
import { logCurrentDirectory } from "./logCurrentDirectory.js";

export const readFile = (userInput, currentDirectory) => {
    const targetFile = userInput.slice(4).trim();
    const path = resolve(currentDirectory, targetFile);
    const stream = createReadStream(path, { encoding: 'utf8' });

    stream.on('data', chunk => {
        console.log(chunk);
    });

    stream.on('end', () => logCurrentDirectory(currentDirectory));

    stream.on('error', () => {
        console.error('Operation failed');
    });
}