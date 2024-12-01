import fs from "fs";
const filesystem = fs.promises;

const directives =
    `
@tailwind base;
@tailwind components;
@tailwind utilities;
    `

export default async function CSSdirectives() {
    try {
        await filesystem.writeFile("./src/index.css", directives);
    } catch (e) {
        console.log(e)
    }
}