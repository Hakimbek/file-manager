import { resolve } from "node:path";
import { rm } from "node:fs/promises";
import { logCurrentDirectory } from "./logCurrentDirectory.js";

export const remove = async (userInput, currentDirectory) => {
    try {
        const fileName = userInput.slice(3).trim();
        const filePath = resolve(currentDirectory, fileName);

        await rm(filePath);

        console.log('File removed successfully');
        logCurrentDirectory(currentDirectory);
    } catch {
        console.log('Operation failed');
    }
}