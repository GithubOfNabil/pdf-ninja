import { ReactElement, useState } from "react";
import ImageToPdf from "./ImageToPdf";

export default function Home(): ReactElement {
    const [imgToPdf, setImgToPdf] = useState<boolean>(false);
    const imgToPdfHandler = ():void => {
        if(imgToPdf == false){
        setImgToPdf(true);
        }else{
            setImgToPdf(false);
        }
    }

  return (
    <div>
<button onClick={imgToPdfHandler}>Image To PDF</button>
{imgToPdf &&
<ImageToPdf />
}
    </div>
  )
}