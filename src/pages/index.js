import React from "react"
import { Link } from "gatsby"

import { Layout, Image, SEO } from "../components"

const IndexPage = props => {
  const posts = props.data.blogPosts.edges
  console.log({ props })
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      {posts.map(({ node }) => {
        const { title } = node.frontmatter
        const { slug } = node.fields
        return (
          <div>
            <Link to={slug}>{title}</Link>
          </div>
        )
      })}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query getBlogData {
    blogPosts: allMarkdownRemark(
      filter: {
        fields: { sourceInstance: { eq: "blog" } }
        frontmatter: { stage: { eq: "published" } }
      }
    ) {
      edges {
        node {
          excerpt(format: PLAIN)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
