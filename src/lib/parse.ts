import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
// import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { marked } from "marked";
// 将Markdown转换为HTML字符串
export async function getFileContent(file: File) {
  console.log(file.name);
  const loader = new PDFLoader(file, {
    splitPages: false,
  });
  const docs = await loader.load();
  return {
    markdown: marked(docs[0].pageContent),
  };
}
