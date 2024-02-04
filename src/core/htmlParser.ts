export class HtmlParser {
  contentBegin: string | undefined;
  contentEnd: string | undefined;

  async parse(path: string, contentMarker: string = "@content") {
    const publicHtml = await Bun.file(path).text();
    const markerStartIndex = publicHtml.indexOf(contentMarker);
    this.contentBegin = publicHtml.substring(0, markerStartIndex);
    this.contentEnd = publicHtml.substring(
      markerStartIndex + contentMarker.length
    );
  }

  injectContent(content: string) {
    if (!this.contentBegin || !this.contentEnd) {
      throw new Error("HtmlParser not initialized");
    }

    return this.contentBegin + content + this.contentEnd;
  }
}

export const htmlParser = new HtmlParser();
