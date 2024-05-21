const fs = require('fs');
const axios = require('axios');

const repoOwner = 'kmabasa212';
const repoName = 'sprint';
const branch = 'main';
const token = '8d1931e8-60fc-4f3e-87f3-bda91f597a0c';  // Use a secret manager in CI for security

axios.get(`https://codecov.io/api/gh/${repoOwner}/${repoName}/branches/${branch}`, {
    headers: {
        Authorization: `token ${token}`
    }
})
.then(response => {
    const coveragePercentage = response.data.commit.totals.c;
    updateReadme(coveragePercentage);
})
.catch(error => {
    console.error('Error fetching coverage percentage:', error);
});

function updateReadme(coveragePercentage) {
    const readmePath = './README.md';
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    const badgeRegex = /\[!\[codecov\]\([^)]+\)\]\([^)]+\)/;
    const newBadge = `[![codecov](https://codecov.io/gh/${repoOwner}/${repoName}/branch/${branch}/graph/badge.svg)](https://codecov.io/gh/${repoOwner}/${repoName}) ${coveragePercentage}%`;

    const updatedReadme = readmeContent.replace(badgeRegex, newBadge);

    fs.writeFileSync(readmePath, updatedReadme, 'utf8');
    console.log('README.md updated with new coverage percentage');
}
