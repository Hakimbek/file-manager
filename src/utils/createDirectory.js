import { resolve } from "node:path";
import { mkdir } from 'node:fs/promises'

export const createDirectory = async (userInput, currentDirectory) => {
    const dirName = userInput.slice(6).trim();
    const path = resolve(currentDirectory, dirName);
    try {
        await mkdir(path);
        console.log('Directory created successfully');
    } catch (error) {
        console.error('Operation failed');
    }
}