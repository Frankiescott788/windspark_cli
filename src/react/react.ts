import fs from "fs";
import shell, {error} from "shelljs";
import * as process from "node:process";
import {group, log, select, spinner, } from "@clack/prompts"
import {createSpinner} from "nanospinner";
import { resolve } from "path";
import chalk from "chalk";
import gradient from "gradient-string";

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
        s.start(chalk.cyanBright("Installing Tailwind CSS"));
        await new Promise<void>((resolve, reject) => {
            shell.exec("npm install -D tailwindcss postcss autoprefixer", { silent : true }, (code, stdout, stderr) => {
                if (code !== 0) {
                    reject();
                } else {
                    resolve()
                }
            })
        })
        s.stop();
        log.success(chalk.green(`Tailwind installed (${chalk.dim("latest")})`));
        s.start("Genarating Tailwind config files.")
        await new Promise(resolve => setTimeout(resolve ,3000));
        shell.exec("npx tailwindcss init -p", {silent: true, async : true});
        s.stop();
        log.success(chalk.green("Tailwind config files generated."));

        const libraries = await select({
            message: `${chalk.cyan("Select a Tailwind library")}`,
            options: [
                {
                    value: "nextui",
                    label: "NextUI",
                    hint : "v2.4.8"
                },
                {
                    value : "daiseyui",
                    label : "DaisyUI",
                    hint : "4.12.14"
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
                    s.start("Installing NextUI CLI");
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
