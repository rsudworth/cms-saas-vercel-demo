import createPublishApi from '@remkoj/optimizely-cms-nextjs/publish'

const handler = createPublishApi({
    paths: [
        '/',
        '/[lang]',
        '/[lang]/[[...path]]'
    ]
})

export const dynamic = 'force-dynamic'      // Make sure all API-Requests are executed
export const dynamicParams = true           // Make sure all matching routes are always executed
export const revalidate = 0                 // Don't cache
export const fetchCache = 'force-no-store'  // Don't cache
export const runtime = 'nodejs'               // Run at the edge
export const GET = handler
export const POST = handler