#!/usr/bin/env node

import {Command} from "commander";
import fs from "fs";
import TailwindForReact, {nextui_config} from "./react/react.js";
import {log, select, spinner, confirm, intro, outro} from "@clack/prompts";
import shell from "shelljs";
import * as process from "node:process";
import chalk from "chalk";
import ora from "ora";
import {resolve} from "path";
import CSSdirectives from "./css/directives.js";
import gradient from "gradient-string"
import {nextui_message} from "./res_messages.js";

const command = new Command();
const filesystem = fs.promises;

interface Frameworkoptions {
    value : string,
    label : string
}

const framework_options : Frameworkoptions[] = [
    {
        value: "react",
        label: "ReactJS"
    },
    {
        value : "vue",
        label : "VueJS"
    }
];

command
    .name("testing")
    .action(async (): Promise<any> => {
        const s = spinner();
        let next;
        try {
            intro(gradient.passion("WindSpark v2.0.0"))
            s.start("Locating Project Metadata")
            await new Promise(resolve => setTimeout(resolve, 2000));
            await filesystem.access("package.json");
            s.stop()
            log.success(`Found ${chalk.green("package.json")}`);
            s.start("Analyzing Project Framework Compatibility")
            await new Promise(resolve => setTimeout(resolve, 2000));

            const buffer : Buffer = await filesystem.readFile("package.json");
            const parsed_data = JSON.parse(buffer.toLocaleString());

            if (parsed_data.dependencies.react) {
                s.stop();
                log.success(`${chalk.cyan("React")} project detected.`)
                const should_cotinue = await confirm({
                    message : `${chalk.yellowBright(`This tool works only on projects without ${chalk.cyanBright("Tailwind")}. Continuing may overwrite current configurations. Proceed?`)}`
                });
                if (should_cotinue !== true) {
                    log.error("Exiting...");
                    process.exit(0);
                }


                const react_library  = await TailwindForReact();

                if (react_library === "nextui") {
                    next = react_library
                    try {
                        await filesystem.access("tailwind.config.js");
                        s.start("Configuring Nextui in Tailwind.Config.js");
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        await filesystem.writeFile("tailwind.config.js", nextui_config);
                        s.stop();
                      log.success("Successfully Configured NextUI");
                    } catch (e) {
                        console.log(e)
                    }
                }
            } else if (parsed_data.name === "v") {
                console.log("v2");
            }

            await CSSdirectives();

            s.start("Prettier formatting all written files");
            await new Promise<void>((resolve, reject) => {
                shell.exec("npx prettier --write tailwind.config.js", { silent : true }, (code, stdout, stderr) => {
                    if (code !== 0) {
                        reject();
                    } else {
                        resolve();
                    }
                })
            })
            await new Promise<void>((resolve, reject) => {
                shell.exec("npx prettier src/index.css", { silent : true }, (code, stdout, stderr) => {
                    if (code !== 0) {
                        reject();
                    } else {
                        resolve();
                    }
                })
            })
                s.stop();

            log.success(chalk.green("✔ Prettier successfully formated tailwind.config.js"));
            log.success(chalk.green("✔ Prettier successfully formated index.css"));


            if (next === "nextui") {
                log.message(nextui_message);
                outro("Thank you for using WindSpark");
            }
        } catch (error) {
            console.log("gg");
            process.exit(0)
        }


    })

command.parse(process.argv);