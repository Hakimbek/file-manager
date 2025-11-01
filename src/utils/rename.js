import { resolve } from 'node:path'
import { rename } from 'node:fs/promises'
import { logCurrentDirectory } from "./logCurrentDirectory.js";

export const renameFile = async (userInput, currentDirectory) => {
    try {
        const [ , source, destination ] = userInput.split(' ');
        const sourcePath = resolve(currentDirectory, source);
        const destPath = resolve(currentDirectory, destination);

        await rename(sourcePath, destPath);

        console.log('File renamed successfully');
        logCurrentDirectory(currentDirectory);
    } catch {
        console.log('Operation failed');
    }
}