import { resolve } from "node:path";
import { mkdir } from 'node:fs/promises';

export const createDirectory = async (userInput, currentDirectory) => {
    try {
        const dirName = userInput.slice(6).trim();
        const path = resolve(currentDirectory, dirName);

        await mkdir(path);

        console.log('Directory created successfully');
    } catch {
        console.log('Operation failed');
    }
}