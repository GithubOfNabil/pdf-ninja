import { ReactElement, useState } from "react";


export default function ImageToPdf():ReactElement {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
      const files = Array.from(event.target.files || []);
      setSelectedFiles(files);
      setPreviewURLs(files.map(file => URL.createObjectURL(file)));
    };
  
    const handleUpload = ():void => {
      if (selectedFiles.length > 0) {
       try {
        const fileArray :string[] = [];
         selectedFiles.map(file => {
          fileArray.push(file.path);
        });
        window.electron.ipcRenderer.send('uploadFiles',fileArray)
       } catch (error) {
        console.log("failed")
       }
      }
    window.electron.ipcRenderer.send("greet", "hello main bitch")
    };
  
    return (
      <div>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        <div>
          {previewURLs.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
          ))}
        </div>
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
};