import { createReadStream } from 'node:fs';

export const readFile = (path) => {
    const stream = createReadStream(path, { encoding: 'utf8' });

    stream.on('data', chunk => {
        console.log(chunk);
    });

    stream.on('end', () => console.log('\n'));

    stream.on('error', () => {
        console.error('Operation failed');
    });
}