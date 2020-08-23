const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const blogPost = path.resolve(`./src/templates/blogPost.jsx`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  return graphql(`
    query allBlogQuery {
      notes: allMarkdownRemark(
        filter: {
          fields: { sourceInstance: { eq: "blog" } }
          frontmatter: { stage: { eq: "published" }, private: { neq: "true" } }
        }
      ) {
        edges {
          node {
            fields {
              sourceInstance
              slug
            }
            frontmatter {
              title
              publish
              date
              stage
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const notes = result.data.notes.edges
    notes.forEach((note, index) => {
      createPage({
        // path: note.node.frontmatter.slug // TODO: replace slug value with this per https://github.com/stephencweiss/digital-garden/issues/2
        path: note.node.fields.slug,
        component: blogPost,
        context: {
          slug: note.node.fields.slug,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const sourceInstance = getNode(node.parent).sourceInstanceName
    createNodeField({
      name: "sourceInstance",
      node,
      value: sourceInstance,
    })
    createNodeField({
      name: "slug",
      node,
      value: createFilePath({ node, getNode }),
    })
  }
}
