import {
    getUserName,
    logCurrentDirectory,
    readFile,
    list,
    createDirectory,
} from './utils';
import { homedir } from "node:os";
import {dirname, isAbsolute, join, resolve} from "node:path";
import {existsSync, lstatSync} from "node:fs";

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
                console.log(`You are currently in ${currentDirectory}`);
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
                    console.log(`You are currently in ${currentDirectory}`);
                } else {
                    console.log('Access outside home directory is not allowed.');
                }
            } else {
                console.log('Invalid path');
            }
        } else if (userInput.startsWith('cat ')) {
            readFile(userInput, currentDirectory);
        } else if (userInput.startsWith('mkdir ')) {
            await createDirectory(userInput, currentDirectory);
        } else {
            console.log('Invalid input');
        }
    })

    process.on("SIGINT", () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`)
        process.exit(0);
    })
}

main()
