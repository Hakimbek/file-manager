export const getUserName = () => {
    const username = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1];

    return username ? username : 'Anonymous user';
}
