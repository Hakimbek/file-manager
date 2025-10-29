import { resolve } from "node:path";
import { rm } from "node:fs/promises";

export const remove = async (userInput, currentDirectory) => {
    try {
        const fileName = userInput.slice(3).trim();
        const filePath = resolve(currentDirectory, fileName);

        await rm(filePath);

        console.log('File removed successfully');
    } catch {
        console.log('Operation failed');
    }
}