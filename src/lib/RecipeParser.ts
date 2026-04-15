import { fromMarkdown } from "mdast-util-from-markdown";
import markdownit from "markdown-it";

const md = markdownit();

const parseRecipe = (markdown: string) => {
  console.log(md.parse(markdown, {}));
  return fromMarkdown(markdown);
};

export default parseRecipe;
