import { fetchGlobalData } from '@/lib/globalData'
import { RootLayoutWithStrapi } from '@/components/RootLayoutWithStrapi'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

/**
 * Test page to verify Strapi integration
 * Visit: http://localhost:3000/strapi-test
 */
export default async function StrapiTestPage() {
  const globalData = await fetchGlobalData()

  return (
    <RootLayoutWithStrapi globalData={globalData}>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            Strapi Integration Test
          </h1>

          <div className="mt-10 space-y-6 text-base text-neutral-600">
            <p className="text-xl">
              This page tests the Strapi API connection. Check the data below:
            </p>

            {globalData ? (
              <div className="rounded-lg bg-neutral-50 p-8">
                <h2 className="text-2xl font-semibold text-neutral-950 mb-4">
                  ✅ Successfully connected to Strapi!
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-950">SEO Data:</h3>
                    <pre className="mt-2 overflow-auto rounded bg-white p-4 text-sm">
                      {JSON.stringify(globalData.seo, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-950">
                      Header Navigation Items:
                    </h3>
                    <pre className="mt-2 overflow-auto rounded bg-white p-4 text-sm">
                      {JSON.stringify(
                        globalData.header?.navItems?.map((item) => ({
                          label: item.label,
                          url: item.url,
                        })),
                        null,
                        2
                      )}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-950">Footer Text:</h3>
                    <pre className="mt-2 overflow-auto rounded bg-white p-4 text-sm">
                      {globalData.footer?.text || 'No footer text'}
                    </pre>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600">
                      The header and footer on this page are being rendered from
                      Strapi data!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-red-50 p-8">
                <h2 className="text-2xl font-semibold text-red-950 mb-4">
                  ❌ Failed to connect to Strapi
                </h2>
                <div className="space-y-2 text-sm text-red-900">
                  <p>Possible issues:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Strapi is not running (run: cd strapi && pnpm run dev)</li>
                    <li>
                      Environment variable not set (create .env.local with
                      NEXT_PUBLIC_STRAPI_URL)
                    </li>
                    <li>Global content not published in Strapi admin</li>
                    <li>API permissions not set correctly in Strapi</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-8 rounded-lg bg-blue-50 p-6">
              <h3 className="font-semibold text-blue-950 mb-2">
                Next Steps:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-900">
                <li>
                  Make sure Strapi is running: <code className="bg-blue-100 px-2 py-1 rounded">cd strapi && pnpm run dev</code>
                </li>
                <li>
                  Create <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> with{' '}
                  <code className="bg-blue-100 px-2 py-1 rounded">NEXT_PUBLIC_STRAPI_URL=http://localhost:1337</code>
                </li>
                <li>Add content in Strapi admin panel and publish it</li>
                <li>Enable public permissions for Global content type</li>
                <li>Refresh this page to see the data</li>
              </ol>
            </div>
          </div>
        </FadeIn>
      </Container>
    </RootLayoutWithStrapi>
  )
}

export const metadata = {
  title: 'Strapi Integration Test',
  description: 'Testing Strapi API connection',
}


