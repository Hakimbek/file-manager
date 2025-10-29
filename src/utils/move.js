import { resolve } from 'node:path'
import { rename } from 'node:fs/promises'

export const move = async (userInput, currentDirectory) => {
    try {
        const [ , source, destination ] = userInput.split(' ');
        const sourcePath = resolve(currentDirectory, source);
        const destPath = resolve(currentDirectory, destination);

        await rename(sourcePath, destPath);

        console.log('File moved successfully');
    } catch {
        console.log('Operation failed');
    }
}