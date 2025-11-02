import { getUserName } from './utils/getUserName.js';
import { logCurrentDirectory } from './utils/logCurrentDirectory.js';
import { readFile } from './utils/readFile.js';
import { list } from './utils/list.js';
import { createFile } from './utils/createFile.js';
import { createDirectory } from './utils/createDirectory.js';
import { renameFile } from './utils/rename.js';
import { remove } from './utils/remove.js';
import { copy } from './utils/copy.js';
import { move } from './utils/move.js';
import { hash } from './utils/hash.js';
import { compress } from './utils/compress.js';
import { decompress } from './utils/decompress.js';
import { arch, cpus, EOL, homedir, userInfo } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { existsSync, lstatSync } from "node:fs";

const main = () => {
    const username = getUserName();
    const homeDirectory = homedir();
    let currentDirectory = homeDirectory;

    console.log(`Welcome to the File Manager, ${username}!`);
    logCurrentDirectory(currentDirectory);

    process.stdin.setEncoding('utf8');

    process.stdin.on("data", async (data) => {
        const userInput = data.trim();

        if (userInput === '.exit') {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            process.exit(0);
        } else if (userInput === 'ls') {
            await list(currentDirectory);
        } else if (userInput === 'up') {
            const parentDir = dirname(currentDirectory);
            if (resolve(parentDir).startsWith(resolve(homeDirectory))) {
                currentDirectory = parentDir;
                logCurrentDirectory(currentDirectory);
            } else {
                console.log('Cannot go above home directory.');
            }
        } else if (userInput.startsWith('cd ')) {
            const targetPath = userInput.slice(3).trim();
            const newPath = isAbsolute(targetPath)
                ? targetPath
                : join(currentDirectory, targetPath);

            if (existsSync(newPath) && lstatSync(newPath).isDirectory()) {
                const resolvedPath = resolve(newPath);
                if (resolvedPath.startsWith(resolve(homeDirectory))) {
                    currentDirectory = resolvedPath;
                    logCurrentDirectory(currentDirectory);
                } else {
                    console.log('Access outside home directory is not allowed.');
                }
            } else {
                console.log('Invalid path');
            }
        } else if (userInput.startsWith('rn ')) {
            await renameFile(userInput, currentDirectory);
        } else if (userInput.startsWith('rm ')) {
            await remove(userInput, currentDirectory)
        } else if (userInput.startsWith('cp ')) {
            await copy(userInput, currentDirectory)
        } else if (userInput.startsWith('mv ')) {
            await move(userInput, currentDirectory)
        } else if (userInput.startsWith('cat ')) {
            readFile(userInput, currentDirectory);
        } else if (userInput.startsWith('mkdir ')) {
            await createDirectory(userInput, currentDirectory);
        } else if (userInput.startsWith('add ')) {
            await createFile(userInput, currentDirectory);
        } else if (userInput === 'os --EOL') {
            console.log(JSON.stringify(EOL));
        } else if (userInput === 'os --cpus') {
            console.log('Amount: ', cpus().length);
            console.log(cpus().map(({ model }) => model));
        } else if (userInput === 'os --homedir') {
            console.log(homedir());
        } else if (userInput === 'os --username') {
            console.log(userInfo().username);
        } else if (userInput === 'os --architecture') {
            console.log(arch());
        } else if (userInput.startsWith('hash ')) {
            hash(userInput, currentDirectory);
        } else if (userInput.startsWith('compress ')) {
            await compress(userInput, currentDirectory);
        } else if (userInput.startsWith('decompress ')) {
            await decompress(userInput, currentDirectory)
        } else {
            console.log('Invalid input');
        }
    })

    process.on("SIGINT", () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    })
}

main();
