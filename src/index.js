import { getUserName, logCurrentDirectory, readFile } from './utils';
import { homedir } from "node:os";
import { resolve } from 'node:path'

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
        } else if (userInput.startsWith('cat ')) {
            const targetFile = userInput.slice(4).trim();
            const fullPath = resolve(currentDirectory, targetFile);
            readFile(fullPath);
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