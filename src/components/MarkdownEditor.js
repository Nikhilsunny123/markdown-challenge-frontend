import React, { useState } from "react";
import axios from "axios";
import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const handleChange = async (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);

    try {
      const response = await axios.post("http://localhost:3001/convert", {
        markdown: newMarkdown,
      });
      console.log(response);
      setHtml(response.data.html);
    } catch (error) {
      console.error("Error converting Markdown to HTML:", error);
    }
  };

  return (
    <div className="markdown-editor">
      <textarea
        className="editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Enter Markdown text"
      />

      <div className="preview" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default MarkdownEditor;
