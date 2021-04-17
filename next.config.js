const markdownIt = require('markdown-it');
const markdownItPrism = require('markdown-it-prism');

module.exports = {
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { 
                    markdownIt: markdownIt({ xhtmlOut: true }).use(markdownItPrism)
                }
            }
        )
        return cfg;
    },
    target: 'serverless'
}