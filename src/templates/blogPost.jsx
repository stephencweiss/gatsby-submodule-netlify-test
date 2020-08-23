import React from "react"
import { graphql } from "gatsby"
import { Layout, SEO } from "../components"

export function BlogPost(props) {
  const entry = props.data.markdownRemark
  const { title } = entry.frontmatter
  console.log(`entry -> `, { entry })
  return (
    <Layout>
      <SEO title={title} />
      <div dangerouslySetInnerHTML={{ __html: entry.html }} />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query EntryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
