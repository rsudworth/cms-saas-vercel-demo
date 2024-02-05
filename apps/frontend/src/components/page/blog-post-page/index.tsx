import "server-only";
import { gql } from "@gql/index";
import Image from "next/image";
import type { OptimizelyNextPage } from "@remkoj/optimizely-dxp-nextjs";
import ContainerBlock from "@/components/block/container-block";
import TextBlock from "@/components/block/text-block";
import BlogListingBlock from "@/components/block/blog-listing-block";
import { BlogPostPageDataFragment } from "@gql/graphql";

type DateTimeFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
};

const formatDate = (dateString: string): string => {
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export const BlogPostPage: OptimizelyNextPage<BlogPostPageDataFragment> = ({
  contentLink,
  data,
  children,
  client,
  inEditMode,
}) => {
  const { title, image, description, publish, author, subtitle } = data;

  return (
    <>
      <div className="outer-padding">
        <div className="container mx-auto grid grid-cols-12">
          {image && image.src && (
            <Image
              className="col-span-12 rounded-[40px] mt-16 lg:mt-32 mb-24 lg:mb-48 mx-auto"
              src={image.src}
              alt=""
              width={1920}
              height={1080}
            />
          )}
          <section className="col-span-12 lg:col-span-10 lg:col-start-2 mx-auto">
            <div className="prose max-w-[960px] prose-h2:text-[36px] prose-h2:leading-[40px] prose-h2:mb-[24px] prose-h2:mt-[48px] prose-a:text-azure prose-a:font-bold prose-a:no-underline hover:prose-a:underline focus:prose-a:underline prose-img:rounded-[40px] prose-img:p-[20px] prose-img:border-2">
              <p className="eyebrow">{formatDate(publish)}</p>
              <h1
                className="mb-[24px] text-[48px]"
                dangerouslySetInnerHTML={{ __html: title ?? "" }}
              ></h1>
              <p className="text-people-eater my-[24px] text-[24px]">
                {author}
              </p>
              <p
                className="text-[30px] leading-[36px] mt-[24px] mb-20"
                dangerouslySetInnerHTML={{ __html: subtitle ?? "" }}
              ></p>

              <div
                dangerouslySetInnerHTML={{ __html: description ?? "" }}
              ></div>

              <div className="col-span-12 lg:col-span-10 lg:col-start-2 mx-auto border-t-2 my-64"></div>
            </div>
          </section>
        </div>
      </div>
      <ContainerBlock
        data={{ columns: 1, color: "none", marginBottom: "large" }}
        contentLink={contentLink}
      >
        <TextBlock
          contentLink={contentLink}
          data={{
            center: true,
            overline: "More picks just for you",
            heading: "Want to keep reading?",
            headingSize: "medium",
          }}
        />
      </ContainerBlock>
      <BlogListingBlock
        contentLink={contentLink}
        data={{
          showFilters: false,
          selectedPageSize: 3,
        }}
      ></BlogListingBlock>
    </>
  );
};

BlogPostPage.getDataFragment = () => ["BlogPostPageData", BlogPostPageData];

export default BlogPostPage;

export const BlogPostPageData = gql(/* GraphQL */ `
  fragment BlogPostPageData on BlogPostPage {
    Name
    title: Heading
    subtitle: ArticleSubHeading
    image: BlogPostPromoImage {
      src: Url
    }
    description: BlogPostBody
    publish: StartPublish
    author: ArticleAuthor
  }
`);
