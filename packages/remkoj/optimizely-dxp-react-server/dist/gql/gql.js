/* eslint-disable */
import * as types from './graphql';
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
    "fragment ContentLink on ContentModelReference {\n      id: Id,\n      workId: WorkId,\n      guidValue: GuidValue\n    }": types.ContentLinkFragmentDoc,
    "fragment ContentLinkSearch on ContentModelReferenceSearch {\n      id: Id,\n      workId: WorkId,\n      guidValue: GuidValue\n    }": types.ContentLinkSearchFragmentDoc,
    "fragment IContentData on IContent {\n        contentType: ContentType\n        id: ContentLink {\n          ...ContentLink\n        }\n        locale: Language {\n            name: Name\n        }\n        path:RelativePath\n    }": types.IContentDataFragmentDoc,
    "fragment ContentAreaItemData on ContentAreaItemModelSearch {\n        item: ContentLink {\n            ...ContentLinkSearch\n            data: Expanded {\n            ...BlockData\n            }\n        }\n        displayOption:DisplayOption\n    }": types.ContentAreaItemDataFragmentDoc,
    "fragment BlockContentAreaItemData on ContentAreaItemModelSearch {\n        item: ContentLink {\n            ...ContentLinkSearch\n            data: Expanded {\n            ...IContentData\n            }\n        }\n        displayOption:DisplayOption\n    }": types.BlockContentAreaItemDataFragmentDoc,
    "fragment LinkItemData on LinkItemNode {\n      children: Text\n      title: Title\n      href: Href\n      target: Target\n      content: ContentLink {\n        href: Url\n        data: Expanded {\n          path: RelativePath\n        }\n      }\n    }": types.LinkItemDataFragmentDoc,
    "fragment ImageData on ContentModelReference {\n      ...ContentLink\n      url: Url\n      data: Expanded {\n        url: Url\n        alt: Name \n        path: RelativePath\n      }\n    }": types.ImageDataFragmentDoc,
    "fragment ImageDataSearch on ContentModelReferenceSearch {\n      ...ContentLinkSearch\n      url: Url\n      data: Expanded {\n        url: Url\n        alt: Name \n        path: RelativePath\n      }\n    }": types.ImageDataSearchFragmentDoc,
    "fragment BlockData on IContent {\n        ...IContentData\n    }": types.BlockDataFragmentDoc,
    "fragment PageData on IContent {\n        ...IContentData\n    }": types.PageDataFragmentDoc,
    "fragment ContentAreaItemBase on ContentAreaItemModelSearch {\n      contentLink:ContentLink { \n          id:Id\n          workId:WorkId\n          guidValue:GuidValue\n          component:Expanded {\n              path:RelativePath\n              type:ContentType\n          }\n      }\n      displayOption:DisplayOption\n  }": types.ContentAreaItemBaseFragmentDoc,
    "query getContentById($id: Int, $workId: Int, $guidValue: String, $locale: [Locales!], $isCommonDraft: Boolean) {\n    Content(\n        where: {\n            ContentLink: { \n                Id: { eq: $id }, \n                WorkId: { eq: $workId }, \n                GuidValue: { eq: $guidValue } \n            }\n            IsCommonDraft: { eq: $isCommonDraft }\n        }\n        locale: $locale\n    ) {\n        total\n        items {\n            ...PageData\n            ...BlockData\n        }\n    }\n}": types.GetContentByIdDocument,
    "query getContentByPath($path: String!, $locale: [Locales], $siteId: String)\n{\n  Content(\n    where: {\n      RelativePath: {\n        eq: $path\n      }\n      SiteId: {\n        eq: $siteId\n      }\n  \t},\n    locale: $locale\n  ) {\n    items {\n      ...PageData\n    }\n  }\n}": types.GetContentByPathDocument,
    "query getContentType($id: Int, $workId: Int, $guidValue: String, $locale: [Locales])\n{\n  Content(\n    where: {\n      ContentLink: {\n        GuidValue: {\n          eq: $guidValue\n        }\n        Id: {\n          eq: $id\n        },\n        WorkId: {\n          eq: $workId\n        }\n      }\n    },\n    locale: $locale\n    limit: 1\n  ) {\n    items {\n    \tContentType\n    },\n    total\n  }\n}": types.GetContentTypeDocument,
};
export function gql(source) {
    return documents[source] ?? {};
}
