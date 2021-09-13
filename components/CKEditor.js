import { useState, useEffect, useRef } from "react";
import FacebookLoading from "./FacebookLoading";

export default function Editor({ setContent, initialContent }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, InlineEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      InlineEditor: require("../ckeditor5-build-with-htmlembed-master"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={InlineEditor}
          data=""
          config={{
            toolbar: {
              items: [
                "removeformat",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "subscript",
                "superscript",
                "blockquote",
                "specialcharacters",
                "|",
                "fontfamily",
                "fontsize",
                "fontcolor",
                "fontbackgroundcolor",
                "highlight",
                "|",
                "bulletedList",
                "numberedList",
                "todolist",
                "|",
                "alignment",
                "outdent",
                "indent",
                "|",
                "imageInsert",
                "mediaembed",
                "insertTable",
                "tabletoolbar",
                "|",
                "htmlembed",
                "link",
                "|",
                "horizontalline",
                "pagebreak",
                "|",
                "findAndReplace",
                "undo",
                "redo",
              ],
            },
            placeholder: "Bạn đang nghĩ gì...🥰😘😍",
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
              ],
            },
            image: {
              styles: ["alignLeft", "alignCenter", "alignRight"],
              resizeOptions: [
                {
                  name: "resizeImage: original",
                  value: null,
                  icon: "original",
                },
                {
                  name: "resizeImage: 25",
                  value: "25",
                  icon: "small",
                },
                {
                  name: "resizeImage: 50",
                  value: "50",
                  icon: "medium",
                },
                {
                  name: "resizeImage: 75",
                  value: "75",
                  icon: "large",
                },
              ],
              toolbar: [
                "imageStyle:full",
                "imageStyle:alignLeft",
                "imageStyle:alignCenter",
                "imageStyle:alignRight",
                "|",
                "imageTextAlternative",
                "|",
                "resizeImage: 25",
                "resizeImage: 50",
                "resizeImage: 75",
                "resizeImage: original",
              ],
            },
            fontSize: {
              options: [9, 10, 11, 12, 13, "default", 16, 17, 19, 21],
            },
            table: {
              contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
            },
            // fontFamily: {
            //   options: [
            //       'default',
            //       'Ubuntu, Arial, sans-serif',
            //       'Ubuntu Mono, Courier New, Courier, monospace'
            //   ]
            // },
            htmlEmbed: {
              showPreviews: true,
            },
            // This value must be kept in sync with the language defined in webpack.config.js.
            language: "vn",
          }}
          onReady={(editor) => {
            const data = editor?.getData();

            if (!data) return;

            setContent(data);

            if (initialContent) {
              setContent(initialContent);
              editor.setData(initialContent);
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            setContent(data);
          }}
        />
      ) : (
        <p tw="flex items-center justify-center text-lg">
          Đang tải Editor... <FacebookLoading />
        </p>
      )}
    </>
  );
}
