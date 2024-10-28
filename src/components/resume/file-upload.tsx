"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import useChatStore from "@/app/hooks/useChatStore";
import { toast } from "sonner";
import PreviewAttachment from "../preview-attachment";

interface FileUploaderProps {}

const FileUploader: React.FC<FileUploaderProps> = () => {
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const setAttachments = useChatStore((state) => state.setAttachments);
  const attachments = useChatStore((state) => state.attachments);

  const uploadFile = useCallback(
    async (
      file: File
    ): Promise<
      | { url: string; name: string; contentType: string; content: string }
      | undefined
    > => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`/api/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Server error during file upload."
          );
        }

        const { url, pathname, contentType, markdown } = await response.json();
        // setInput(markdown || "");
        return { url, name: pathname, contentType, content: markdown };
      } catch (error) {
        console.error("File upload error:", error);
        toast.error((error as Error).message || "Upload failed, try again.");
        return undefined;
      }
    },
    []
  );

  const handleFilesPick = useCallback(
    async (files: File[]) => {
      setUploadQueue(files.map((file) => file.name));
      try {
        const uploadPromises = files.map(uploadFile);
        const uploadedFiles = await Promise.all(uploadPromises);

        const validAttachments = uploadedFiles.filter(
          (
            file
          ): file is {
            url: string;
            name: string;
            contentType: string;
            content: string;
          } => file !== undefined
        );

        setAttachments((current) => [...(current || []), ...validAttachments]);
        // setInput && setInput(validAttachments[0].content || "");
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setUploadQueue([]);
      }
    },
    [uploadFile]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFilesPick(acceptedFiles);
    },
    [handleFilesPick]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
  });

  return (
    <div className="mb-12">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <section className="mb-12">
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <h3 className="mt-4 text-xl font-semibold">Upload Your Resume</h3>
            <p className="mt-2 text-sm text-gray-500">
              Drag and drop your resume file (PDF or Word) or click to browse
            </p>
            <Button className="mt-4">Select File</Button>
          </div>
        </section>
      </div>
      <div>
        {((attachments && attachments.length > 0) ||
          uploadQueue.length > 0) && (
          <div className="flex flex-row gap-2">
            {attachments &&
              attachments.map((attachment, index) => (
                <div key={index}>
                  <PreviewAttachment
                    key={attachment.url}
                    attachment={attachment}
                    onDelete={() => {
                      const updatedImages = (attachments: any) =>
                        attachments.filter((_, i) => i !== index);
                      setAttachments(updatedImages(attachments));
                    }}
                  />
                </div>
              ))}

            {uploadQueue.map((filename) => (
              <PreviewAttachment
                key={filename}
                attachment={{
                  url: "",
                  name: filename,
                  contentType: "",
                }}
                isUploading={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
