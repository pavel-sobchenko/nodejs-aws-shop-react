import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useError } from "~/context/ErrorContext";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };
  const { setError } = useError();

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    // Get the presigned URL
    if (file) {
      const authorization_token = btoa(
        localStorage.getItem("authorization_token") || ""
      );
      try {
        const response = await axios({
          method: "GET",
          url,
          params: {
            name: encodeURIComponent(file.name),
          },
          headers: {
            Authorization: `Basic ${authorization_token}`,
          },
        });
        console.log("File to upload: ", file.name);
        console.log("Uploading to: ", response.data.signedUrl);
        const result = await fetch(response.data.signedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "text/csv",
          },
        });
        console.log("Result: ", result);
        setFile(undefined);
      } catch (error) {
        setError(error as Error);
      }
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
