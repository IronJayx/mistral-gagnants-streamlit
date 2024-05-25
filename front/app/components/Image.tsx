// components/Image.tsx
import React, { useEffect } from 'react';
import { CircleHelp, Loader} from 'lucide-react';
import ClipLoader from "react-spinners/ClipLoader";

interface ImageProps {
  url: string;
  icon?: React.ReactNode;
}

const Image: React.FC<ImageProps> = ({ url }) => {
  useEffect(() => {
    console.log('Image URL changed:', url);
  }, [url]);

  return (
    <div className="image-container flex justify-center items-center bg-gray-100 rounded shadow h-64 w-64">
      {!url ? (
        <CircleHelp/>
      ) : url == 'loading' ? (
        <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />      ) : (
        <img src={url} alt="Generated" className="max-w-full h-auto" />
      )}
    </div>
  );
};

export default Image;
