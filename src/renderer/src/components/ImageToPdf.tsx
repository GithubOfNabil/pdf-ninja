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
      <div className="">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        <div className="flex flex-row flex-wrap gap-4 ">
          {previewURLs.map((url, index) => (
            <div className="w-64 p-1.5 bg-teal-100 rounded-lg shadow-md" key={index}>
            <img key={index} src={url} alt={`Preview ${index}`} className="py-2" />
            </div>
          ))}
        </div>
        <div className="m-5">
        <button className="w-36 h-8 bg-green-500 rounded-sm shadow-md" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    );
};