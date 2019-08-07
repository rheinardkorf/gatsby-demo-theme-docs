module.exports = {
    siteMetadata: {
        title: `Demo Theme Docs`,
        footer: `Powered by Gatsby`,
    },
    plugins: [
        {
            resolve: `@xhq/gatsby-theme-docs`,
            options: {
                basePath: '',
            }
        }
    ],
}
