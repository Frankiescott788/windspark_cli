import chalk from "chalk";

export const nextui_message = `
     🎉 ${chalk.green(`Setup Complete!`)}
    
    The following steps were successfully completed:
    1. Installed Tailwind CSS and configured it for your project.
    2. Integrated ${chalk.magenta("NextUI")} with your Tailwind setup.
    3. Added Tailwind CSS directives to your ${chalk.cyan("src/index.css")}.
    4. Formatted all written files using Prettier for consistent styling.
    
    🚀 You can now start coding! Check the ${chalk.magenta(
    "NextUI documentation"
)} for components and themes: ${chalk.blue("https://nextui.org/")}
    
   Run ${chalk.cyan("npm start")} if you are using ${chalk.cyan("CRA")} and ${chalk.cyan("npm run dev")} if you are using ${chalk.yellow("VITE")} to start your development server.
    Happy coding! ✨
`