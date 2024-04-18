import { FC, memo, useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { Avatar, Box } from "@mui/material";
import _ from "lodash";


interface UploadImageProps {
  setValue: any;
  defaultImg?: string;
}

const UploadImage: FC<UploadImageProps> = memo(({ setValue, defaultImg }) => {
  const [image, setImage] = useState<File | string | undefined>(defaultImg);
  const [error, setError] = useState<string | undefined>();

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImage = files[0];
      //Check type
      if (!newImage.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const error = "Hình ảnh chỉ hỗ trợ kiểu jpg, jpeg, png và gif.";
        setError(error);
        return;
      }

      // Check Image Size
      if (newImage.size > 5000000) {
        const error = "File không được lớn hơn 5MB.";
        setError(error);
        return;
      }

      setError(undefined);
      setImage(newImage);
      setValue("image", newImage);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", "");
    setImage(undefined);
    setError(undefined);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-3">
      {image !== undefined && (
        <Box className="relative group">
          <Avatar
            src={_.isString(image) ? image : URL.createObjectURL(image)}
            sx={{ width: "10rem", height: "10rem" }}
          />
          <Box
            className="justify-center absolute top-0 right-0 flex items-center w-5 h-5 text-white bg-red-600 rounded-full p-1 cursor-pointer"
            onClick={() => handleRemoveImage()}
          >
            -
          </Box>
        </Box>
      )}
      {image === undefined && (
        <Label
          htmlFor="dropzone-file"
          className="flex h-40 w-40 rounded-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 inline-flex items-center justify-center">
              <span className="font-semibold">Nhấn để thêm</span>
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            accept="image/*"
            onChange={handleFileImageChange}
          />
        </Label>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
});

export default UploadImage;
