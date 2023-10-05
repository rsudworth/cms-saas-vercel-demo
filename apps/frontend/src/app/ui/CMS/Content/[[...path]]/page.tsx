import 'server-only'
import type * as Types from '@remkoj/optimizely-dxp-react'

// Next.JS
import { notFound } from 'next/navigation'
import Script from 'next/script'

// Apollo Client
import { isApolloError, type ServerError, type ApolloError } from '@apollo/client'

// Re-usable Libraries
import { getContentGraphConfig, Utils } from '@remkoj/optimizely-dxp-react'
import { CmsContent } from '@remkoj/optimizely-dxp-react-server'

// GraphQL Client
import type * as GraphQL from '@gql/graphql'
import { getContentById } from '@gql/functions'
import { getAuthorizedServerClient } from '@/lib/client'

// Components
import { setupFactory } from '@components/factory'
import OnPageEdit from '@/components/on-page-edit'
import RefreshNotice from '@/components/refresh-notice'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// Site configuration
import siteConfig from '@/site-config'

const DEVELOPMENT = process.env.NODE_ENV == "development"
const OPTIMIZELY_GRAPH_UPDATE_TIMEOUT_MS : number = 2000
const config = getContentGraphConfig()

export type OptimizelyCmsEditPageProps = {
    params: {
        path: string[]
    },
    searchParams: Partial<{
        epieditmode: string
        preview_token: string
    }>
}

export const fetchCache = 'force-no-store' // Disable fetch caching
export const revalidate = 0 // Ensure we're running in dynamic mode

export default async function OptimizelyCmsEditPage({ params, searchParams }: OptimizelyCmsEditPageProps) : Promise<JSX.Element>
{
    // Validate the search parameters
    const epiEditMode = searchParams?.epieditmode?.toLowerCase()
    if (epiEditMode != 'true' && epiEditMode != 'false') {
        console.error("Edit mode requested without valid EpiEditMode, refused to render the page. Mode set:", searchParams.epieditmode)
        return notFound()
    }

    // Allow use-hmac as magic token to be used only on a development environment, otherwise require a minimal length string as token
    const validDev = DEVELOPMENT && searchParams.preview_token == 'use-hmac'
    if (!searchParams.preview_token || (searchParams.preview_token.length < 20 && !validDev)) {
        console.error("Edit mode requested without valid Preview Token, refused to render the page")
        return notFound()
    }

    // Create the context
    const factory = setupFactory()
    const client = getAuthorizedServerClient(searchParams.preview_token)

    // Get information from the Request URI
    const slugs = params.path.map(x => decodeURIComponent(x))
    const locale = siteConfig.locales.some(x => x.slug == slugs[0]) ? slugs[0] : siteConfig.defaultLocale
    const contentString = slugs.join('/').split(',,').pop() ?? ''
    const [ contentId, workId ] = contentString.split('_',3)
    const contentLink : Types.ContentLinkWithLocale = {
        id: Number.parseInt(contentId),
        workId: Number.parseInt(workId) || null,
        guidValue: null,
        locale: locale
    }
    const variables = {
        ...contentLink,
        locale: contentLink.locale as GraphQL.Locales,
        isCommonDraft: !contentLink.workId ? true : null
    }
    if (DEVELOPMENT)
        console.log("Requested content:", JSON.stringify(variables))
    
    try {
        const contentInfo = await getContentById(client, variables)
        const contentItem = (contentInfo?.Content?.items ?? [])[0]
        const contentType = Utils.normalizeContentType(contentItem?.contentType)

        // Return a 404 if the content item or type could not be resolved
        if (!contentItem || !contentType)
            return notFound()

        if (DEVELOPMENT)
            console.log("Resolved content:", JSON.stringify({ id: contentItem.id?.id, workId: contentItem.id?.workId, guidValue: contentItem.id?.guidValue, locale: contentItem.locale?.name, type: (contentItem.contentType ?? []).slice(0,-1).join('/')}))

        // Render the content, with edit mode context
        const isPage = contentItem.contentType?.some(x => x?.toLowerCase() == "page") ?? false
        const inEditMode = epiEditMode == 'true'
        const loadedContentId = Utils.normalizeContentLinkWithLocale({ ...contentItem?.id, locale: contentItem?.locale?.name })
        const output =  <>
            { inEditMode && <Script src={`${ config.dxp_url }/ui/CMS/latest/clientresources/communicationinjector.js`} strategy='afterInteractive' /> }
            { isPage && <Header locale={ locale } />}
            <OnPageEdit timeout={ OPTIMIZELY_GRAPH_UPDATE_TIMEOUT_MS } mode={ inEditMode ? 'edit' : 'preview' } className='bg-slate-900 absolute top-0 left-0 w-screen h-screen opacity-60 z-50'>
                <RefreshNotice />
            </OnPageEdit>
            <CmsContent contentType={ contentType } contentLink={ contentLink } inEditMode={ inEditMode } fragmentData={ contentItem } factory={ factory } client={ client } />
            { isPage && <Footer locale={ locale } />}
            <div className='optly-contentLink'>ID: { loadedContentId?.id ?? "-"} | Version: { loadedContentId?.workId ?? "-"} | Global ID: { loadedContentId?.guidValue ?? "-"} | Locale: { loadedContentId?.locale ?? ""}</div>
        </>
        return output
    } catch (e) {
        if (isApolloError(e as Error) && ((e as ApolloError).networkError as ServerError | null)?.statusCode == 404) {
            return notFound()
        }
        if (isApolloError(e as Error) && ((e as ApolloError).networkError as ServerError | null)?.statusCode == 401) {
            return <div className='max-w-screen-2xl mx-auto my-16 bg-red-200 p-4 text-red-900 border-red-900 border-solid border rounded-lg text-lg'>
                <h1 className='font-bold text-2xl'><ExclamationTriangleIcon className='inline-block h-10 w-10 pr-2' />Not authorized</h1>
                <p>The propagation of the CMS authentication yielded a &quot;Not authorized&quot; error from Optimizely Graph, please check your configuration.</p>
            </div>
        }
        throw e
    }
}