import { readdir } from 'node:fs/promises';

export const listDir = async (path) => {
    const files = await readdir(path, { withFileTypes: true });
    const table = files.map((file, index) => {
        return { Name: file.name, Type: file.isDirectory() ? 'directory' : 'file' }
    })
    console.table(table.length ? table : 'Empty directory');
}