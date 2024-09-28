"use client";

import { useToast } from "@/components/ui/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 3000,
      className: 'bg-green-500 text-white' 
    })
  }

  const onUploadErrorHandler = () => {
    toast({
      title: 'Upload failed',
      description: 'Please try again',
      duration: 3000,
      className: 'bg-red-500 text-white' 
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="mare_app"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Original Image
            </h3>

            <div className="transition-opacity duration-300 ease-in-out">
              {publicId ? (
                <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <CldImage 
                    width={getImageSize(type, image, "width")}
                    height={getImageSize(type, image, "height")}
                    src={publicId}
                    alt="Uploaded image"
                    sizes={"(max-width: 767px) 100vw, 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-300 ease-in-out"
                  onClick={() => open()}
                >
                  <Image 
                    src="/assets/icons/add.svg"
                    alt="Add Image"
                    width={48}
                    height={48}
                    className="mb-4"
                  />
                  <p className="text-lg text-gray-600 text-center">Click or drag to upload an image</p>
                </div>
              )}
            </div>

            {publicId && (
              <Button
                onClick={() => open()}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 ease-in-out"
              >
                Replace Image
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader