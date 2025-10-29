import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'

export const hash = (userInput, currentDirectory) => {
    const fileName = userInput.slice(5).trim();
    const filePath = resolve(currentDirectory, fileName);
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    stream.on('data', data => hash.update(data));

    stream.on('end', () => {
        console.log(hash.digest('hex'));
    });

    stream.on('error', () => {
        console.error('Operation failed');
    });
}