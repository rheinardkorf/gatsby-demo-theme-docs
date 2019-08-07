var plugins = [{
      plugin: require('/Users/rheinardkorf/Development/GatsbyDemos/gatsby-demo-theme-docs/node_modules/gatsby-plugin-theme-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/rheinardkorf/Development/GatsbyDemos/gatsby-demo-theme-docs/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[{"resolve":"/Users/rheinardkorf/Development/GatsbyDemos/gatsby-demo-theme-docs/node_modules/gatsby-remark-images","id":"3626c0e0-58d4-5046-b0e5-cb7731a052f2","name":"gatsby-remark-images","version":"3.1.7","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":["onRouteUpdate"],"ssrAPIs":["onRenderBody"]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1024,"linkImagesToOriginal":false}},{"resolve":"gatsby-remark-mermaid","options":{"language":"mermaid","theme":"forest","viewport":{"width":1200,"height":1200},"mermaidOptions":{"themeCSS":"* {\n                                        font-size: 14px;\n                                        stroke-width: 1px;\n                                        margin: 0;\n                                        padding: 0;\n                                        font-family: Consolas, \"Andale Mono WT\", \"Andale Mono\", \"Lucida Console\", \"Lucida Sans Typewriter\", \"DejaVu Sans Mono\", \"Bitstream Vera Sans Mono\", \"Liberation Mono\", \"Nimbus Mono L\", Monaco, \"Courier New\", Courier, monospace;\n                                    }"}}},{"resolve":"gatsby-remark-prismjs","options":{"showLineNumbers":true}}]},
    },{
      plugin: require('/Users/rheinardkorf/Development/GatsbyDemos/gatsby-demo-theme-docs/node_modules/gatsby-remark-images/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
