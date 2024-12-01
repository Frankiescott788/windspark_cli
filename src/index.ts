#!/usr/bin/env node

import {Command} from "commander";
import fs from "fs";
import TailwindForReact, {nextui_config} from "./react/react.js";
import {log, select, spinner, confirm} from "@clack/prompts";
import shell from "shelljs";
import * as process from "node:process";
import chalk from "chalk";
import ora from "ora";
import {resolve} from "path";
import CSSdirectives from "./css/directives.js";

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
        const s = spinner()
        try {
            s.start("Locating Project Metadata")
            await new Promise(resolve => setTimeout(resolve, 2000));
            await filesystem.access("package.json");
            log.success("Detected package.json in the Project");
            s.stop()
            s.start("package.json Detected, analyzing Project for Framework Compatibility")
            await new Promise(resolve => setTimeout(resolve, 2000));

            const buffer : Buffer = await filesystem.readFile("package.json");
            const parsed_data = JSON.parse(buffer.toLocaleString());

            if (parsed_data.dependencies.react) {
                s.stop();
                const should_cotinue = await confirm({
                    message : `${chalk.yellow("React project detected. This tool works only on without Tailwind. Continuing may overwrite Tailwind and CSS current configurations. Proceed?")}`
                });
                if (should_cotinue === false) {
                    log.error("Exiting...");
                    process.exit(0);
                }

                const react_library  = await TailwindForReact();

                if (react_library === "nextui") {
                    try {
                        await filesystem.access("tailwind.config.js");
                        s.start("Writing in Tailwind configuration for Nextui");
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        await filesystem.writeFile("tailwind.config.js", nextui_config);
                        s.stop();
                        log.success("Wrote")

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

            log.success("Formatted")



        } catch (error) {
            console.log("gg");
            process.exit(0)
        }


    })

command.parse(process.argv);