import { execSync } from 'child_process';
import fs from 'fs';

function runTests() {
  let lintResult = '';
  try {
    lintResult = execSync('npm run lint').toString();
  } catch (error) {
    lintResult = error.stdout.toString();
  }

  let testResult = '';
  try {
    testResult = execSync('npm test').toString();
  } catch (error) {
    testResult = error.stdout.toString();
  }

  const summary = `
# Test Summary

## Linting

\`\`\`
${lintResult}
\`\`\`

## Tests

\`\`\`
${testResult}
\`\`\`
  `;

  fs.writeFileSync('test-summary.md', summary);
}

runTests();
