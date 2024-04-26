/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment PageData on IContent {\n  ...IContentData\n}": types.PageDataFragmentDoc,
    "query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...IContentData\n      ...BlockData\n      ...PageData\n    }\n  }\n}": types.getContentByIdDocument,
    "fragment IContentListItem on IContent {\n  ...IContentData\n}": types.IContentListItemFragmentDoc,
    "query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      _metadata {\n        types\n      }\n    }\n  }\n}": types.getContentTypeDocument,
    "query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) {\n  content: Content(\n    where: {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...IContentData\n      ...BlockData\n      ...PageData\n    }\n  }\n}": types.getContentByPathDocument,
    "fragment ElementData on IElement {\n  ...IElementData\n}": types.ElementDataFragmentDoc,
    "fragment BlockData on IContent {\n  ...IContentData\n}": types.BlockDataFragmentDoc,
    "fragment IElementData on IElement {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}": types.IElementDataFragmentDoc,
    "fragment IContentInfo on IContentMetadata {\n  key\n  locale\n  types\n  displayName\n  version\n  url {\n    ...LinkData\n  }\n}": types.IContentInfoFragmentDoc,
    "fragment CompositionData on ICompositionNode {\n  name\n  type\n  ... on ICompositionStructureNode {\n    nodes @recursive(depth: 5) {\n      name\n    }\n  }\n  ... on ICompositionElementNode {\n    element {\n      ...ElementData\n    }\n  }\n}": types.CompositionDataFragmentDoc,
    "fragment IContentData on IContent {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}": types.IContentDataFragmentDoc,
    "fragment ReferenceData on ContentReference {\n  key\n  locale\n  url {\n    ...LinkData\n  }\n}": types.ReferenceDataFragmentDoc,
    "fragment LinkData on ContentUrl {\n  base\n  hierarchical\n  default\n}": types.LinkDataFragmentDoc,
    "query searchContent($term: String!, $topInterest: String, $locale: [String!], $types: [String!], $pageSize: Int) {\n  Content(\n    where: {_or: [{_fulltext: {contains: $term}}, {_fulltext: {contains: $topInterest, boost: 2}}], _fulltext: {contains: $term}, _metadata: {types: {in: \"Page\"}}}\n    orderBy: {_ranking: SEMANTIC}\n    limit: $pageSize\n  ) {\n    total\n    cursor\n    items {\n      _score\n      ...IContentData\n      _metadata {\n        published\n      }\n      _fulltext(highlight: {enabled: true, startToken: \"<span>\", endToken: \"</span>\"})\n    }\n    facets {\n      _metadata {\n        types(filters: $types) {\n          name\n          count\n        }\n        locale(filters: $locale) {\n          name\n          count\n        }\n      }\n    }\n  }\n}": types.searchContentDocument,
    "fragment BlogListingBlockData on BlogListingBlock {\n  _metadata {\n    name: displayName\n  }\n  showFilters: BlogListingShowFilters\n  selectedPageSize: BlogListingItemCount\n}": types.BlogListingBlockDataFragmentDoc,
    "\nfragment CardBlockData on CardBlock {\n  button: CardButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  color: CardColor\n  description: CardDescription {\n    structure\n    html\n  }\n  heading: CardHeading\n  icon: CardIcon {\n    ...ReferenceData\n  }\n  image: CardImage {\n    ...ReferenceData\n  }\n  subheading: CardSubHeading\n  imageLayout: ImageLayout\n}\n": types.CardBlockDataFragmentDoc,
    "fragment CarouselBlockData on CarouselBlock {\n    CarouselItemsContentArea {\n        ...IContentListItem\n    }\n}": types.CarouselBlockDataFragmentDoc,
    "\nfragment LayoutContainerBlockData on LayoutContainerBlock {\n  columns: ColumnsCount\n  color: ContainerBackgroundColor\n  backgroundImage: ContainerBackgroundImage {\n    ...ReferenceData\n  }\n  marginBottom: ContainerMarginBottom\n  marginTop: ContainerMarginTop\n  paddingBottom: ContainerPaddingBottom\n  paddingTop: ContainerPaddingTop\n  gap: GapSize\n  LayoutContentArea {\n    ...IContentListItem\n  }\n}\n  ": types.LayoutContainerBlockDataFragmentDoc,
    "fragment HomeHeroBlockData on HomePageHeroBlock {\n  heading: HomeHeroBlockHeading\n  subheading: HomeHeroBlockSubHeading\n  button: HomeHeroButtonBlock {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  leftImage: HomeHeroLeftImage {\n    ...ReferenceData\n  }\n  rightImage: HomeHeroRightImage {\n    ...ReferenceData\n  }\n}": types.HomeHeroBlockDataFragmentDoc,
    "\n    fragment HeroBlockData on HeroBlock {\n      heading: Heading\n      subheading: SubHeading\n      button: HeroButton {\n        className: ButtonClass\n        children: ButtonText\n        buttonType: ButtonType\n        url: ButtonUrl {\n          ...LinkData\n        }\n        buttonVariant: ButtonVariant\n      }\n      color: HeroColor\n      description: Description {\n        structure\n      }\n      eyebrow: Eyebrow\n      image: HeroImage {\n        ...ReferenceData\n      }\n    }\n  ": types.HeroBlockDataFragmentDoc,
    "\n  fragment OdpEmbedBlockData on OdpEmbedBlock {\n    ContentId\n  }\n": types.OdpEmbedBlockDataFragmentDoc,
    "\n    fragment QuoteBlockData on QuoteBlock {\n      quote: QuoteText\n      color: QuoteColor\n      active: QuoteActive\n      name: QuoteProfileName\n      profilePicture: QuoteProfilePicture {\n        ...ReferenceData\n      }\n      location: QuoteProfileLocation\n    }\n  ": types.QuoteBlockDataFragmentDoc,
    "\n    fragment TextBlockData on TextBlock {\n      overline: TextBlockOverline\n      headingSize: TextBlockHeadingSize\n      heading: TextBlockHeading\n      description: TextBlockDescription {\n        structure\n        html\n      }\n      center: TextCenter\n      width: TextBlockWidth\n      className: TextClassName\n    }\n  ": types.TextBlockDataFragmentDoc,
    "query getFooter($locale: [Locales] = en) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      footerSubLinks: FooterNavigationSubLinks {\n        url {\n          ...LinkData\n        }\n        text\n      }\n      footerCopyright: FooterNavigationCopyrightText\n      footerNavigation: FooterNavigationContentArea {\n        __typename\n        ...FooterMenuNavigationItem\n        ...HtmlBlock\n      }\n    }\n  }\n}\n\nfragment HtmlBlock on HtmlBlock {\n  title: HtmlBlockHeading\n  content: HtmlContent {\n    structure\n    html\n  }\n  __typename\n}\n\nfragment FooterMenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}": types.getFooterDocument,
    "query getHeader($locale: [Locales]) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      headerNavigation: MainNavigationContentArea {\n        ...MegaMenuItem\n      }\n      UtilityNavigationContentArea {\n        ...MenuItem\n      }\n    }\n  }\n}\n\nfragment MegaMenuItem on MegaMenuGroupBlock {\n  menuName: MenuMenuHeading\n  menuData: MegaMenuContentArea {\n    ...MenuItem\n  }\n}\n\nfragment MenuItem on IContent {\n  __typename\n  ...MenuNavigationItem\n  ...MenuCardItem\n  ...MenuButton\n}\n\nfragment MenuButton on ButtonBlock {\n  text: ButtonText\n  url: ButtonUrl {\n    ...LinkData\n  }\n  type: ButtonType\n  variant: ButtonVariant\n  __typename\n}\n\nfragment MenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}\n\nfragment MenuCardItem on CardBlock {\n  heading: CardHeading\n  subheading: CardSubHeading\n  description: CardDescription {\n    structure\n  }\n  color: CardColor\n  image: CardImage {\n    src: url {\n      ...LinkData\n    }\n  }\n  link: CardButton {\n    title: ButtonText\n    url: ButtonUrl {\n      ...LinkData\n    }\n  }\n  __typename\n}": types.getHeaderDocument,
    "\n  fragment BlogPostPageData on BlogPostPage {\n    title: Heading\n    subtitle: ArticleSubHeading\n    image: BlogPostPromoImage {\n      src: url {\n        ...LinkData\n      }\n    }\n    description: BlogPostBody {\n      structure\n      html\n    }\n    author: ArticleAuthor\n  }\n": types.BlogPostPageDataFragmentDoc,
    "\n  fragment LandingPageData on LandingPage {\n    TopContentArea {\n      ...BlockData\n    }\n    MainContentArea {\n      ...BlockData\n    }\n  }\n": types.LandingPageDataFragmentDoc,
    "\n  fragment StandardPageData on StandardPage {\n    title: StandardPageHeading\n    subtitle: StandardSubHeading\n    image: StandardPromoImage {\n      src: url {\n        ...LinkData\n      }\n    }\n    description: MainBody {\n      structure\n      html\n    }\n  }\n": types.StandardPageDataFragmentDoc,
    "\n  fragment StartPageData on StartPage {\n    HomePageHeroContentArea {\n      ...BlockData\n    }\n    HomePageMainContentArea {\n      ...BlockData\n    }\n  }\n": types.StartPageDataFragmentDoc,
    "query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {\n  getArticles: BlogPostPage(\n    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}]}\n    locale: $locale\n    limit: $pageSize\n    skip: $start\n    orderBy: {_metadata: {published: DESC}}\n  ) {\n    total\n    items {\n      ...IContentData\n      _metadata {\n        published\n      }\n      title: Heading\n      description: SeoSettings {\n        text: MetaDescription\n      }\n      author: ArticleAuthor\n      image: BlogPostPromoImage {\n        ...ReferenceData\n      }\n    }\n    facets {\n      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {\n        count\n        name\n      }\n      _metadata {\n        published(unit: DAY) {\n          count\n          name\n        }\n      }\n    }\n  }\n}": types.getArticlesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageData on IContent {\n  ...IContentData\n}"): (typeof documents)["fragment PageData on IContent {\n  ...IContentData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...IContentData\n      ...BlockData\n      ...PageData\n    }\n  }\n}"): (typeof documents)["query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...IContentData\n      ...BlockData\n      ...PageData\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IContentListItem on IContent {\n  ...IContentData\n}"): (typeof documents)["fragment IContentListItem on IContent {\n  ...IContentData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      _metadata {\n        types\n      }\n    }\n  }\n}"): (typeof documents)["query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {\n  content: Content(\n    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}\n    locale: $locale\n  ) {\n    total\n    items {\n      _metadata {\n        types\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) {\n  content: Content(\n    where: {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...IContentData\n      ...BlockData\n      ...PageData\n    }\n  }\n}"): (typeof documents)["query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) {\n  content: Content(\n    where: {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}\n    locale: $locale\n  ) {\n    total\n    items {\n      ...IContentData\n      ...BlockData\n      ...PageData\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ElementData on IElement {\n  ...IElementData\n}"): (typeof documents)["fragment ElementData on IElement {\n  ...IElementData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlockData on IContent {\n  ...IContentData\n}"): (typeof documents)["fragment BlockData on IContent {\n  ...IContentData\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IElementData on IElement {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"): (typeof documents)["fragment IElementData on IElement {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IContentInfo on IContentMetadata {\n  key\n  locale\n  types\n  displayName\n  version\n  url {\n    ...LinkData\n  }\n}"): (typeof documents)["fragment IContentInfo on IContentMetadata {\n  key\n  locale\n  types\n  displayName\n  version\n  url {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CompositionData on ICompositionNode {\n  name\n  type\n  ... on ICompositionStructureNode {\n    nodes @recursive(depth: 5) {\n      name\n    }\n  }\n  ... on ICompositionElementNode {\n    element {\n      ...ElementData\n    }\n  }\n}"): (typeof documents)["fragment CompositionData on ICompositionNode {\n  name\n  type\n  ... on ICompositionStructureNode {\n    nodes @recursive(depth: 5) {\n      name\n    }\n  }\n  ... on ICompositionElementNode {\n    element {\n      ...ElementData\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment IContentData on IContent {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"): (typeof documents)["fragment IContentData on IContent {\n  _metadata {\n    ...IContentInfo\n  }\n  _type: __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ReferenceData on ContentReference {\n  key\n  locale\n  url {\n    ...LinkData\n  }\n}"): (typeof documents)["fragment ReferenceData on ContentReference {\n  key\n  locale\n  url {\n    ...LinkData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment LinkData on ContentUrl {\n  base\n  hierarchical\n  default\n}"): (typeof documents)["fragment LinkData on ContentUrl {\n  base\n  hierarchical\n  default\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query searchContent($term: String!, $topInterest: String, $locale: [String!], $types: [String!], $pageSize: Int) {\n  Content(\n    where: {_or: [{_fulltext: {contains: $term}}, {_fulltext: {contains: $topInterest, boost: 2}}], _fulltext: {contains: $term}, _metadata: {types: {in: \"Page\"}}}\n    orderBy: {_ranking: SEMANTIC}\n    limit: $pageSize\n  ) {\n    total\n    cursor\n    items {\n      _score\n      ...IContentData\n      _metadata {\n        published\n      }\n      _fulltext(highlight: {enabled: true, startToken: \"<span>\", endToken: \"</span>\"})\n    }\n    facets {\n      _metadata {\n        types(filters: $types) {\n          name\n          count\n        }\n        locale(filters: $locale) {\n          name\n          count\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query searchContent($term: String!, $topInterest: String, $locale: [String!], $types: [String!], $pageSize: Int) {\n  Content(\n    where: {_or: [{_fulltext: {contains: $term}}, {_fulltext: {contains: $topInterest, boost: 2}}], _fulltext: {contains: $term}, _metadata: {types: {in: \"Page\"}}}\n    orderBy: {_ranking: SEMANTIC}\n    limit: $pageSize\n  ) {\n    total\n    cursor\n    items {\n      _score\n      ...IContentData\n      _metadata {\n        published\n      }\n      _fulltext(highlight: {enabled: true, startToken: \"<span>\", endToken: \"</span>\"})\n    }\n    facets {\n      _metadata {\n        types(filters: $types) {\n          name\n          count\n        }\n        locale(filters: $locale) {\n          name\n          count\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment BlogListingBlockData on BlogListingBlock {\n  _metadata {\n    name: displayName\n  }\n  showFilters: BlogListingShowFilters\n  selectedPageSize: BlogListingItemCount\n}"): (typeof documents)["fragment BlogListingBlockData on BlogListingBlock {\n  _metadata {\n    name: displayName\n  }\n  showFilters: BlogListingShowFilters\n  selectedPageSize: BlogListingItemCount\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment CardBlockData on CardBlock {\n  button: CardButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  color: CardColor\n  description: CardDescription {\n    structure\n    html\n  }\n  heading: CardHeading\n  icon: CardIcon {\n    ...ReferenceData\n  }\n  image: CardImage {\n    ...ReferenceData\n  }\n  subheading: CardSubHeading\n  imageLayout: ImageLayout\n}\n"): (typeof documents)["\nfragment CardBlockData on CardBlock {\n  button: CardButton {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  color: CardColor\n  description: CardDescription {\n    structure\n    html\n  }\n  heading: CardHeading\n  icon: CardIcon {\n    ...ReferenceData\n  }\n  image: CardImage {\n    ...ReferenceData\n  }\n  subheading: CardSubHeading\n  imageLayout: ImageLayout\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CarouselBlockData on CarouselBlock {\n    CarouselItemsContentArea {\n        ...IContentListItem\n    }\n}"): (typeof documents)["fragment CarouselBlockData on CarouselBlock {\n    CarouselItemsContentArea {\n        ...IContentListItem\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment LayoutContainerBlockData on LayoutContainerBlock {\n  columns: ColumnsCount\n  color: ContainerBackgroundColor\n  backgroundImage: ContainerBackgroundImage {\n    ...ReferenceData\n  }\n  marginBottom: ContainerMarginBottom\n  marginTop: ContainerMarginTop\n  paddingBottom: ContainerPaddingBottom\n  paddingTop: ContainerPaddingTop\n  gap: GapSize\n  LayoutContentArea {\n    ...IContentListItem\n  }\n}\n  "): (typeof documents)["\nfragment LayoutContainerBlockData on LayoutContainerBlock {\n  columns: ColumnsCount\n  color: ContainerBackgroundColor\n  backgroundImage: ContainerBackgroundImage {\n    ...ReferenceData\n  }\n  marginBottom: ContainerMarginBottom\n  marginTop: ContainerMarginTop\n  paddingBottom: ContainerPaddingBottom\n  paddingTop: ContainerPaddingTop\n  gap: GapSize\n  LayoutContentArea {\n    ...IContentListItem\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment HomeHeroBlockData on HomePageHeroBlock {\n  heading: HomeHeroBlockHeading\n  subheading: HomeHeroBlockSubHeading\n  button: HomeHeroButtonBlock {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  leftImage: HomeHeroLeftImage {\n    ...ReferenceData\n  }\n  rightImage: HomeHeroRightImage {\n    ...ReferenceData\n  }\n}"): (typeof documents)["fragment HomeHeroBlockData on HomePageHeroBlock {\n  heading: HomeHeroBlockHeading\n  subheading: HomeHeroBlockSubHeading\n  button: HomeHeroButtonBlock {\n    className: ButtonClass\n    children: ButtonText\n    buttonType: ButtonType\n    url: ButtonUrl {\n      ...LinkData\n    }\n    buttonVariant: ButtonVariant\n  }\n  leftImage: HomeHeroLeftImage {\n    ...ReferenceData\n  }\n  rightImage: HomeHeroRightImage {\n    ...ReferenceData\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment HeroBlockData on HeroBlock {\n      heading: Heading\n      subheading: SubHeading\n      button: HeroButton {\n        className: ButtonClass\n        children: ButtonText\n        buttonType: ButtonType\n        url: ButtonUrl {\n          ...LinkData\n        }\n        buttonVariant: ButtonVariant\n      }\n      color: HeroColor\n      description: Description {\n        structure\n      }\n      eyebrow: Eyebrow\n      image: HeroImage {\n        ...ReferenceData\n      }\n    }\n  "): (typeof documents)["\n    fragment HeroBlockData on HeroBlock {\n      heading: Heading\n      subheading: SubHeading\n      button: HeroButton {\n        className: ButtonClass\n        children: ButtonText\n        buttonType: ButtonType\n        url: ButtonUrl {\n          ...LinkData\n        }\n        buttonVariant: ButtonVariant\n      }\n      color: HeroColor\n      description: Description {\n        structure\n      }\n      eyebrow: Eyebrow\n      image: HeroImage {\n        ...ReferenceData\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OdpEmbedBlockData on OdpEmbedBlock {\n    ContentId\n  }\n"): (typeof documents)["\n  fragment OdpEmbedBlockData on OdpEmbedBlock {\n    ContentId\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment QuoteBlockData on QuoteBlock {\n      quote: QuoteText\n      color: QuoteColor\n      active: QuoteActive\n      name: QuoteProfileName\n      profilePicture: QuoteProfilePicture {\n        ...ReferenceData\n      }\n      location: QuoteProfileLocation\n    }\n  "): (typeof documents)["\n    fragment QuoteBlockData on QuoteBlock {\n      quote: QuoteText\n      color: QuoteColor\n      active: QuoteActive\n      name: QuoteProfileName\n      profilePicture: QuoteProfilePicture {\n        ...ReferenceData\n      }\n      location: QuoteProfileLocation\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment TextBlockData on TextBlock {\n      overline: TextBlockOverline\n      headingSize: TextBlockHeadingSize\n      heading: TextBlockHeading\n      description: TextBlockDescription {\n        structure\n        html\n      }\n      center: TextCenter\n      width: TextBlockWidth\n      className: TextClassName\n    }\n  "): (typeof documents)["\n    fragment TextBlockData on TextBlock {\n      overline: TextBlockOverline\n      headingSize: TextBlockHeadingSize\n      heading: TextBlockHeading\n      description: TextBlockDescription {\n        structure\n        html\n      }\n      center: TextCenter\n      width: TextBlockWidth\n      className: TextClassName\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getFooter($locale: [Locales] = en) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      footerSubLinks: FooterNavigationSubLinks {\n        url {\n          ...LinkData\n        }\n        text\n      }\n      footerCopyright: FooterNavigationCopyrightText\n      footerNavigation: FooterNavigationContentArea {\n        __typename\n        ...FooterMenuNavigationItem\n        ...HtmlBlock\n      }\n    }\n  }\n}\n\nfragment HtmlBlock on HtmlBlock {\n  title: HtmlBlockHeading\n  content: HtmlContent {\n    structure\n    html\n  }\n  __typename\n}\n\nfragment FooterMenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}"): (typeof documents)["query getFooter($locale: [Locales] = en) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      footerSubLinks: FooterNavigationSubLinks {\n        url {\n          ...LinkData\n        }\n        text\n      }\n      footerCopyright: FooterNavigationCopyrightText\n      footerNavigation: FooterNavigationContentArea {\n        __typename\n        ...FooterMenuNavigationItem\n        ...HtmlBlock\n      }\n    }\n  }\n}\n\nfragment HtmlBlock on HtmlBlock {\n  title: HtmlBlockHeading\n  content: HtmlContent {\n    structure\n    html\n  }\n  __typename\n}\n\nfragment FooterMenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getHeader($locale: [Locales]) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      headerNavigation: MainNavigationContentArea {\n        ...MegaMenuItem\n      }\n      UtilityNavigationContentArea {\n        ...MenuItem\n      }\n    }\n  }\n}\n\nfragment MegaMenuItem on MegaMenuGroupBlock {\n  menuName: MenuMenuHeading\n  menuData: MegaMenuContentArea {\n    ...MenuItem\n  }\n}\n\nfragment MenuItem on IContent {\n  __typename\n  ...MenuNavigationItem\n  ...MenuCardItem\n  ...MenuButton\n}\n\nfragment MenuButton on ButtonBlock {\n  text: ButtonText\n  url: ButtonUrl {\n    ...LinkData\n  }\n  type: ButtonType\n  variant: ButtonVariant\n  __typename\n}\n\nfragment MenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}\n\nfragment MenuCardItem on CardBlock {\n  heading: CardHeading\n  subheading: CardSubHeading\n  description: CardDescription {\n    structure\n  }\n  color: CardColor\n  image: CardImage {\n    src: url {\n      ...LinkData\n    }\n  }\n  link: CardButton {\n    title: ButtonText\n    url: ButtonUrl {\n      ...LinkData\n    }\n  }\n  __typename\n}"): (typeof documents)["query getHeader($locale: [Locales]) {\n  menuItems: StartPage(locale: $locale) {\n    items {\n      headerNavigation: MainNavigationContentArea {\n        ...MegaMenuItem\n      }\n      UtilityNavigationContentArea {\n        ...MenuItem\n      }\n    }\n  }\n}\n\nfragment MegaMenuItem on MegaMenuGroupBlock {\n  menuName: MenuMenuHeading\n  menuData: MegaMenuContentArea {\n    ...MenuItem\n  }\n}\n\nfragment MenuItem on IContent {\n  __typename\n  ...MenuNavigationItem\n  ...MenuCardItem\n  ...MenuButton\n}\n\nfragment MenuButton on ButtonBlock {\n  text: ButtonText\n  url: ButtonUrl {\n    ...LinkData\n  }\n  type: ButtonType\n  variant: ButtonVariant\n  __typename\n}\n\nfragment MenuNavigationItem on MenuNavigationBlock {\n  title: MenuNavigationHeading\n  items: NavigationLinks {\n    url {\n      ...LinkData\n    }\n    title\n    target\n    text\n  }\n  __typename\n}\n\nfragment MenuCardItem on CardBlock {\n  heading: CardHeading\n  subheading: CardSubHeading\n  description: CardDescription {\n    structure\n  }\n  color: CardColor\n  image: CardImage {\n    src: url {\n      ...LinkData\n    }\n  }\n  link: CardButton {\n    title: ButtonText\n    url: ButtonUrl {\n      ...LinkData\n    }\n  }\n  __typename\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BlogPostPageData on BlogPostPage {\n    title: Heading\n    subtitle: ArticleSubHeading\n    image: BlogPostPromoImage {\n      src: url {\n        ...LinkData\n      }\n    }\n    description: BlogPostBody {\n      structure\n      html\n    }\n    author: ArticleAuthor\n  }\n"): (typeof documents)["\n  fragment BlogPostPageData on BlogPostPage {\n    title: Heading\n    subtitle: ArticleSubHeading\n    image: BlogPostPromoImage {\n      src: url {\n        ...LinkData\n      }\n    }\n    description: BlogPostBody {\n      structure\n      html\n    }\n    author: ArticleAuthor\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment LandingPageData on LandingPage {\n    TopContentArea {\n      ...BlockData\n    }\n    MainContentArea {\n      ...BlockData\n    }\n  }\n"): (typeof documents)["\n  fragment LandingPageData on LandingPage {\n    TopContentArea {\n      ...BlockData\n    }\n    MainContentArea {\n      ...BlockData\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment StandardPageData on StandardPage {\n    title: StandardPageHeading\n    subtitle: StandardSubHeading\n    image: StandardPromoImage {\n      src: url {\n        ...LinkData\n      }\n    }\n    description: MainBody {\n      structure\n      html\n    }\n  }\n"): (typeof documents)["\n  fragment StandardPageData on StandardPage {\n    title: StandardPageHeading\n    subtitle: StandardSubHeading\n    image: StandardPromoImage {\n      src: url {\n        ...LinkData\n      }\n    }\n    description: MainBody {\n      structure\n      html\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment StartPageData on StartPage {\n    HomePageHeroContentArea {\n      ...BlockData\n    }\n    HomePageMainContentArea {\n      ...BlockData\n    }\n  }\n"): (typeof documents)["\n  fragment StartPageData on StartPage {\n    HomePageHeroContentArea {\n      ...BlockData\n    }\n    HomePageMainContentArea {\n      ...BlockData\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {\n  getArticles: BlogPostPage(\n    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}]}\n    locale: $locale\n    limit: $pageSize\n    skip: $start\n    orderBy: {_metadata: {published: DESC}}\n  ) {\n    total\n    items {\n      ...IContentData\n      _metadata {\n        published\n      }\n      title: Heading\n      description: SeoSettings {\n        text: MetaDescription\n      }\n      author: ArticleAuthor\n      image: BlogPostPromoImage {\n        ...ReferenceData\n      }\n    }\n    facets {\n      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {\n        count\n        name\n      }\n      _metadata {\n        published(unit: DAY) {\n          count\n          name\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {\n  getArticles: BlogPostPage(\n    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}]}\n    locale: $locale\n    limit: $pageSize\n    skip: $start\n    orderBy: {_metadata: {published: DESC}}\n  ) {\n    total\n    items {\n      ...IContentData\n      _metadata {\n        published\n      }\n      title: Heading\n      description: SeoSettings {\n        text: MetaDescription\n      }\n      author: ArticleAuthor\n      image: BlogPostPromoImage {\n        ...ReferenceData\n      }\n    }\n    facets {\n      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {\n        count\n        name\n      }\n      _metadata {\n        published(unit: DAY) {\n          count\n          name\n        }\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;