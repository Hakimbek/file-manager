import { resolve } from "node:path";
import { copyFile } from "node:fs/promises";
import { logCurrentDirectory } from "./logCurrentDirectory.js";

export const copy = async (userInput, currentDirectory) => {
    try {
        const [ , source, destination ] = userInput.split(' ');
        const sourcePath = resolve(currentDirectory, source);
        const destPath = resolve(currentDirectory, destination);

        await copyFile(sourcePath, destPath);

        console.log('File copied successfully');
        logCurrentDirectory(currentDirectory);
    } catch {
        console.log('Operation failed');
    }
}