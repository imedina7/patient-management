import { cn } from "@/lib/utils/ui";
import { useState } from "react";
import Dropzone from "react-dropzone";

export function FileDropArea({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => setAcceptedFiles(acceptedFiles)}
      onDragEnter={() => setIsHovering(true)}
      onDragLeave={() => setIsHovering(false)}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="my-2.5">
          <div
            {...getRootProps({
              className: cn(
                "px-4 py-9 border-2 rounded-sm border-gray-500",
                className,
                {
                  "border-cyan-400 bg-cyan-400/10": isHovering,
                }
              ),
            })}
          >
            <input {...getInputProps(props)} />
            {acceptedFiles.length === 0 && (
              <p className="text-center">
                Drag and drop some files here, or click to select files
              </p>
            )}
            {acceptedFiles.length > 0 && (
              <div>
                {acceptedFiles.map((file) => (
                  <p key={file.name}>
                    {file.name} - {file.size} bytes
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
