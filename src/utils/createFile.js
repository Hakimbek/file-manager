import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const createFile = async (userInput, currentDirectory) => {
    try {
        const fileName = userInput.slice(4).trim();
        const filePath = resolve(currentDirectory, fileName);

        await writeFile(filePath, '', { flag: 'wx' });

        console.log('File created successfully');
    } catch {
        console.log('Operation failed');
    }
}