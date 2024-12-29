```markdown
# Windspark CLI

Windspark CLI is a command-line tool designed to streamline the setup of Tailwind CSS and other UI libraries in React projects. With just one command, it automates the installation, configuration, and integration of popular libraries, saving developers time and effort.

## Why I Created Windspark CLI

I created Windspark CLI because I was tired of manually installing and configuring Tailwind CSS every time I started a new project. By automating the repetitive setup process, this tool allows developers to focus on building amazing applications without the hassle of manual configurations.

## Overview

Windspark CLI goes beyond Tailwind CSS setup by including popular libraries like NextUI and DaisyUI out of the box. Future versions aim to expand support for other libraries and frameworks, making Windspark CLI a versatile tool for frontend development.

## Features

- **Tailwind CSS Setup**: Installs Tailwind CSS along with its dependencies and configurations.
- **NextUI Integration**: Easily adds NextUI for React component styling.
- **DaisyUI Support**: Provides DaisyUI setup for pre-designed Tailwind components.
- **Multi-Library Support (Coming Soon)**: Additional UI libraries will be integrated in future releases.
- **Framework Agnostic (v2)**: Plans to support frameworks beyond React in version 2.

## Installation

### 1. Install Windspark CLI Globally

Install Windspark CLI using npm:

```bash
npm install -g windspark
```

### 2. Create or Navigate to Your Project

If you don’t have a React project yet, create one:

```bash
npx create-react-app my-project
cd my-project
```

### 3. Run Windspark to Set Up Tailwind and Libraries

Run the following command to install and configure Tailwind CSS, NextUI, and DaisyUI:

```bash
windspark tailwindcss
```

This command will:

- Install the required dependencies for Tailwind CSS, NextUI, and DaisyUI.
- Automatically generate configuration files for Tailwind CSS and PostCSS.
- Integrate these libraries into your project.

### 4. Add Tailwind CSS Directives

In your `src/index.css` (or `src/index.scss`) file, include:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ensure this file is imported in your `src/index.js`:

```javascript
import './index.css';
```

### 5. Start Your Project

Run the development server to see your setup in action:

```bash
npm start
```

## Upcoming Features

- **Additional Libraries**: Support for more UI and CSS libraries in future releases.
- **Framework Support**: Version 2 will bring compatibility with frameworks other than React, such as Vue.js, Angular, and Svelte.
- **Custom Configuration Options**: Allow users to customize the setup process to suit their needs.

## Example Usage

Create a React project:

```bash
npx create-react-app my-project
cd my-project
```

Run Windspark CLI:

```bash
windspark setup
```

Add Tailwind CSS directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Start your project:

```bash
npm start
```

Your project is now ready with Tailwind CSS, NextUI, and DaisyUI configured.

## Why Choose Windspark?

- **Time-Saving**: Automates tedious installation processes.
- **All-in-One Solution**: Combines multiple libraries into a single, easy-to-use CLI.
- **Future-Ready**: Continuous updates to support more frameworks and libraries.

