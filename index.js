// We need 'inquirer' for prompting user input and 'fs' for file system operations.
import inquirer from 'inquirer';
import fs from 'fs';

// Define the questions to ask the user using Inquirer.
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use this application?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What are the contribution guidelines?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What are the test instructions?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your application:',
        choices: ['MIT', 'GPLv3', 'Apache 2.0', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];

// This function writes the README content to a file.
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('README.md created successfully!');
        }
    });
}

// Function to generate README content based on user input
function generateREADME(answers) {
    const licenseBadge = {
        MIT: '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)',
        GPLv3: '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)',
        'Apache 2.0': '![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)',
        None: ''
    };

    return `
# ${answers.title}

${licenseBadge[answers.license]}  <!-- Badge added here -->

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions, please reach out:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
  `;
}

// This function initializes the app by prompting the user and generating the README.
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = generateREADME(answers);
        writeToFile('README.md', readmeContent);
    });
}

// Function call to initialize app
init();