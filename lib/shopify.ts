export async function shopifyFetch({ query, variables = {} }) {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
      },
      body: JSON.stringify({ query, variables }),
    })

    return {
      status: result.status,
      body: await result.json(),
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      status: 500,
      error: "Error receiving data",
    }
  }
}

export async function getAllProducts() {
  return shopifyFetch({
    query: `
      {
        products(first: 100) {
          edges {
            node {
              id
              title
              description
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `,
  })
}

export async function getProductByHandle(handle) {
  return shopifyFetch({
    query: `
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                availableForSale
              }
            }
          }
        }
      }
    `,
    variables: {
      handle,
    },
  })
}
