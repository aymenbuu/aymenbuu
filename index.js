/**
 * README Generator
 */
const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

const BLOG_HOST = `https://blog.aymenbou.com/`;

/* README Sections */
const introTitle = generateTitle(2, `Hey :wave:, I'm ${generateLink('Aymen', 'https://aymenbou.com/')}`);
const introDescription = `I build, advise and invest in startups. I'm currently the sole founder of **${generateLink('Subset', 'https://www.getsubset.com/')}** , **${generateLink('Linear', 'https://www.getlinear.com/')}** & **${generateLink('SQRT', 'https://www.sqrtt.com/')}**, and formerly at **${generateLink(
    'IBM',
    'https://ibm.com/'
)}** & **${generateLink('Lloyds Bank', 'https://www.tsb.co.uk/')}** based in 🇬🇧 London, UK.`;

const notice = `</> Same day, different syntax </>`

const badgeConfigs = [{
        name: 'Website',
        badgeText: 'aymenbou.com',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'maildotru',
        link: 'https://aymenbou.com/',
    },
    {
        name: '𝕏',
        badgeText: '@aymenbuu',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'x',
        link: 'https://x.com/aymenbuu/',
    },
    {
        name: 'LinkedIn',
        badgeText: '@aymenbuu',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'medium',
        link: 'https://www.linkedin.com/in/aymenbou/',
    },
    {
        name: 'Instagram',
        badgeText: '@aymenbuu',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'Instagram',
        link: 'https://instagram.com/aymenbuu/',
    },
    {
        name: 'GitHub',
        badgeText: '@aymenbuu',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'GitHub',
        link: 'https://github.com/aymenbuu',
    },
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" width="35%" src="https://media.giphy.com/media/Y349mkUUL76bwZHlJR/giphy.gif?cid=790b76110zikg9z4r2h6s45sel4rimgobgyr28qdj1tku784&ep=v1_gifs_search&rid=giphy.gif&ct=g" />`;
const factsTitle = generateTitle(2, `:zap: I've spent the last decade (growing list)`);
const factsConfigs = [
    `🔭 Working on Investment Tracker [Subset](https://getsubset.com/).`,
    `🧐 Helping **Startups** Build **MVP's** with [Linear](https://getlinear.com/).`,
    `👨‍💻 Investing in Stocks, Crypto, & Software Startups.`,
    `📝 Writing a fictional novel.`,
    `💬 Conversating with the world through [X](https://x.com/).`,
    `📙 Find more [about me](https://www.aymenbou.com/about).`,
    `🎉 Fun Fact: 「私はユダヤ系とアラブ系の血を引いており、母方を通じてダビデ王の子孫であり、父方を通じてムハンマドの子孫です。」`,
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const postsTitle = generateTitle(2, `:black_nib: Recent Posts`)

const toolsTitle = generateTitle(2, `:rocket: Some Tools I Use`)
const toolsIconSize = 25;
const toolsConfig = [{
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
        alt: 'react',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
        alt: 'angular-js',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
        alt: 'vue',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg',
        alt: 'bootstrap',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
        alt: 'css3',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/gulp/gulp-plain.svg',
        alt: 'gulp',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg',
        alt: 'java',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        alt: 'javascript',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        alt: 'typescript',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
        alt: '.NET',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
        alt: 'mongodb',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        alt: 'mysql',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
        alt: 'redis',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
        alt: 'nodejs',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/springio/springio-icon.svg',
        alt: 'spring',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg',
        alt: 'python',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
        alt: 'nginx',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cucumber/cucumber-plain.svg',
        alt: 'cucumber',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-plain.svg',
        alt: 'heroku',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/travis/travis-plain.svg',
        alt: 'travis',
    },
    {
        src: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/aws/aws.png',
        alt: 'aws',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
        alt: 'gcp',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
        alt: 'Docker',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
        alt: 'Kubernetes',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
        alt: 'Go',
    },
];
const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=aymenbuu&show_icons=true&count_private=true" alt="aymenbuu" />`;

// Count is down, will they ever recover from this catastrophe? https://github.com/jwenjian/visitor-badge/issues/32
// const visitors = `![visitors](https://visitor-badge.glitch.me/badge?page_id=aymenbuu.aymenbuu)`;
// const visitors = `[![HitCount](https://hits.dwyl.com/aymenbuu/aymenbuu.svg?style=flat-square)](http://hits.dwyl.com/aymenbuu/aymenbuu.svg?style=flat-square)`;

(async () => {

    // Get blog entries
    // const response = await axios.get(`${BLOG_HOST}/page-data/index/page-data.json`);
    // const postData = response.data.result.data.allMarkdownRemark.edges;
    let posts = ``;

    // postData.slice(0, Math.min(postData.length, 5)).map(post => {
    //     const title = post.node.frontmatter.title;
    //     const date = post.node.frontmatter.date;
    //     const path = post.node.frontmatter.path;
    //     posts += `<li><a target="_blank" href="${BLOG_HOST}${path}">${title} — ${date}</a></li>`;
    // });

    const content = `${introTitle}\n
${introDescription}\n
${badges}\n
${notice}\n
${gif}\n
${factsTitle}\n
${facts}\n
${postsTitle}\n
<details>
    <summary>Explore</summary>
    ${posts}\n
</details>\n
<a target="_blank" href="${BLOG_HOST}">Read More</a>\n
${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n
${stats}\n
`;

    const markdownContent = md.render(content);

    fs.writeFile('README.md', markdownContent, (err) => {
        if (err) {
            return console.error(err);
        }
        console.info(`Writing to README.md`);
    });
})();

function generateBadge(badgeConfig) {
    return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat-square&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
    return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
    return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
    return `[${label}](${link})`;
}
