/**
 * Debug page to check environment variables
 * Visit: http://localhost:3000/debug-env
 */
export default function DebugEnvPage() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const hasToken = !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  const tokenLength = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN?.length || 0

  return (
    <div style={{ padding: '50px', fontFamily: 'monospace' }}>
      <h1>Environment Variables Debug</h1>
      <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5' }}>
        <p><strong>NEXT_PUBLIC_STRAPI_URL:</strong> {strapiUrl || '❌ NOT SET'}</p>
        <p><strong>Has API Token:</strong> {hasToken ? '✅ YES' : '❌ NO'}</p>
        <p><strong>Token Length:</strong> {tokenLength} characters</p>
        <hr />
        <p style={{ marginTop: '20px' }}>
          {strapiUrl && hasToken ? (
            <span style={{ color: 'green' }}>✅ Environment variables are loaded!</span>
          ) : (
            <span style={{ color: 'red' }}>❌ Environment variables are missing. Did you restart Next.js?</span>
          )}
        </p>
      </div>
    </div>
  )
}


