import fs from "fs";
import shell, {error} from "shelljs";
import * as process from "node:process";
import {group, log, select, spinner} from "@clack/prompts"
import {createSpinner} from "nanospinner";
import { resolve } from "path";

const fileSystem = fs.promises;

export const nextui_config : string =
    `
    // tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
    `

export default async function TailwindForReact() {
    try {
        const nano = createSpinner();
        const s = spinner();
        s.start("Installing tailwind css");
        await new Promise(resolve => setTimeout(resolve, 1000));
        shell.exec("npm install -D tailwindcss postcss autoprefixer", {
            silent : true, async : true
        })
        s.stop();
        log.success("Tailwind installed");
        s.start("Initialising...")
        await new Promise(resolve => setTimeout(resolve ,3000));
        shell.exec("npx tailwindcss init -p", {silent: true, async : true});
        s.stop();
        log.success("Tailwind config files generated: tailwind.config.js and postcss.config.js");

        const libraries = await select({
            message: "Which tailwind Library do wish to install",
            options: [
                {
                    value: "nextui",
                    label: "NextUI"
                },
                {
                    value : "daiseyui",
                    label : "DaiseyUI"
                },
                {
                    value : "flowbite",
                    label : "FlowBite"
                }

            ]
        });

        if (libraries === "nextui") {
            const executedPath = shell.exec("npm root -g");
            const resolved_path : string = resolve(executedPath.stdout.trim(), "nextui-cli");
            try {
                await fileSystem.access(resolved_path);
            } catch (e : any) {
                if (e.message.includes("no such file or directory")) {
                    s.start("We realised that you don't have the NextUI-cli installed, we are installing it for you");
                    await new Promise<void>((resolve, reject) => {
                        shell.exec("npm install -g nextui-cli", { silent: true }, (code, stdout, stderr) => {
                            if (code !== 0) {
                                reject()
                            } else {
                                resolve();
                            }
                        })
                    })
                    s.stop();
                    log.success("NextUI CLI installed");
                } else {
                    console.log("fff")
                    return
                }
            }

            s.start("Adding NextUI components");
            await new Promise<void>((resolve, reject) => {
                shell.exec("nextui add --all", { silent: true }, (code, stdout, stderr) => {
                    if (code !== 0) {
                        reject()
                    } else {
                        resolve();
                    }
                })
            })
            s.stop()
            log.success("NextUI components added");
            return libraries
        } else {
            console.log("Poooo")
        }
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}
