import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Home(): ReactElement {

  return (
    <div>
      <h1>Home</h1>
      <Link to="/image-to-pdf"><button>Image To PDF</button></Link>
      <Link to="/pdf-split"><button>PDF Split</button></Link>
    </div>
  )
}