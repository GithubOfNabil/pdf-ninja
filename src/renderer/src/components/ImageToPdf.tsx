import { ReactElement, useEffect, useState } from "react";



export default function ImageToPdf(): ReactElement {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const [fileExist, setFileExist] = useState<boolean>(false);
  const [primaryUploadForm, setPrimaryUploadForm] = useState<boolean>(true);
  const [deletedImageId, setDeletedImageId] = useState<number | null>(null);
  const [imageAdded, setImageAdded] = useState<number>(0);
  const [savePath, setSavePath] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    const fileArray: string[] = [];
    files.map((file) => fileArray.push(file.path));
    setSelectedFiles(fileArray);
    selectedFiles.map((file) => console.log(file));
    if (fileArray.length != 0){
      setFileExist(true);
      setPrimaryUploadForm(false);
    }else{
      setFileExist(false);
    }
    setPreviewURLs(files.map(file => URL.createObjectURL(file)));
  };

  const handleCreatePdf = (pathSave: string): void => {
    if (selectedFiles.length > 0) {
      try {
        window.electron.ipcRenderer.send('imageToPdf', pathSave, selectedFiles)
        window.electron.ipcRenderer.on('response', (_event, arg) => {
          console.log('Received response:', arg);
          if(arg == 'succeeded'){
              setSuccess(true);
          }
        });
      } catch (error) {
        console.log("failed")
      }
    }
  };

  const handleRemoveImage = (idx: number): void => {
    if (idx == 0){
      selectedFiles.splice(idx, idx+1);
      setSelectedFiles(selectedFiles);
  
      previewURLs.splice(idx, idx+1);
      setPreviewURLs(previewURLs);
  
      setDeletedImageId(idx);      
    }
    selectedFiles.splice(idx, idx);
    setSelectedFiles(selectedFiles);

    previewURLs.splice(idx, idx);
    setPreviewURLs(previewURLs);

    setDeletedImageId(idx);
  };

useEffect(() => {

},[deletedImageId, selectedFiles])


const addImage = (event: React.ChangeEvent<HTMLInputElement>):void => {
  const files = Array.from(event.target.files || []);
  files.map((file) => selectedFiles.push(file.path));
  setSelectedFiles(selectedFiles)
  files.map((file) => previewURLs.push(URL.createObjectURL(file)));
  setPreviewURLs(previewURLs)
  setImageAdded(imageAdded+1);
}

useEffect(() => {

},[imageAdded]) 


const handleSavePath = (event: React.ChangeEvent<HTMLInputElement> ):void => {

  const files = event.target.files;
  console.log(files);
  if (files && files.length > 0) {
    const folder = files[0].path.substring(0, files[0].path.lastIndexOf('\\') + 1)
    console.log(folder)
    handleCreatePdf(folder)
    setSavePath(folder);
  }
  console.log(savePath);
} 

useEffect(() => {

},[success])

  return (
   <div className="min-h-screen bg-teal-800">
    {/* Primary Upload file box */}
    { primaryUploadForm &&
    <div className=" h-screen flex justify-center items-center ">
      <div className=" border-dashed border-2 border-teal-200 rounded-md p-4">  
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </div>
    </div>
     }  
      <div className="  flex flex-row flex-wrap gap-4 p-4">
        {previewURLs.map((url, index) => (
          <div key={index}>
          <div className=" font-bold text-black bg-[#5af79e] rounded-t-md p-1 flex gap-52">{index+1} <button className="bg-[#e9183d] ml-3 w-6 rounded-md text-center" onClick={() => handleRemoveImage(index)} >X</button></div>
          <div className="h-[99mm] w-[70mm] bg-white shadow-md flex justify-center items-center" key={index}>
            <img key={index} src={url} alt={`Preview ${index}`} className="py-2" />
          </div>
          </div>
        ))
        }
       { fileExist &&
        <div className="h-[99mm] w-[70mm] bg-teal-200 rounded-lg shadow-md flex justify-center items-center mt-5 ml-2">
          <label htmlFor="fileUpload">
            <div className=" font-normal text-6xl cursor-pointer">+</div>
            <input id="fileUpload" type="file" accept="image/*" multiple className=" hidden" onChange={addImage}/>
          </label>
          </div>
       }
      </div>
      
      {/* Create PDF button */}
      {fileExist &&  
          <label htmlFor="savePath">
            <div className=" flex justify-center items-center py-4">
            <div className="w-36 h-8 bg-green-500 rounded-md shadow-md text-center" >Create PDF</div>
            <input
              type="file"
              className="hidden"
              /* @ts-expect-error: Jsx wont work */
              webkitdirectory=""  
              onChange={handleSavePath}
              id="savePath" />
          </div>
            </label>
      }
      {success && 
      <div className=" bg-green-400 text-black">
      PDF created
    </div>
    }
    </div>
  );
};