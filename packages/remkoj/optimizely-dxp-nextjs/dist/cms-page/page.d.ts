/// <reference types="react" />
import 'server-only';
import type { ApolloClient } from '@apollo/client';
import type { Metadata, ResolvingMetadata } from 'next';
import { type ComponentFactory, type ChannelDefinition } from '@remkoj/optimizely-dxp-react';
import { type GetContentByPathMethod } from './data';
export type Params = {
    path: string[] | undefined;
    lang: string | undefined;
};
export type Props = {
    params: Params;
    searchParams: {};
};
export type GenerateMetadataProps<TParams extends {} = {}, TSearch extends {} = {}> = {
    params: Params;
};
export type NextJsPage = {
    generateStaticParams: () => Promise<Params[]>;
    generateMetadata: (props: Props, resolving: ResolvingMetadata) => Promise<Metadata>;
    CmsPage: (props: Props) => Promise<JSX.Element>;
};
export type CreatePageOptions = {
    defaultLocale: string;
    getContentByPath: GetContentByPathMethod;
};
export declare function createPage(client: ApolloClient<any>, factory: ComponentFactory, channel: ChannelDefinition, options?: Partial<CreatePageOptions>): NextJsPage;
