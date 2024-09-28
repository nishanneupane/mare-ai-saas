"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { getCldImageUrl } from "next-cloudinary"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { updateCredits } from "@/lib/actions/user.actions"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { CustomField } from "./custom-field"
import MediaUploader from "./media-uploader"
import TransformedImage from "./transformed-image"
import { InsufficientCreditsModal } from "./insufficient-credits-modal"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string().min(1, "Image is required"),
})

interface ImageType {
  publicId: string;
  width: number;
  height: number;
  secureURL: string;
  [key: string]: any;
}

const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [image, setImage] = useState<ImageType | null>(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)

  const transformationType = transformationTypes[type]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data && action === 'Update' ? {
      title: data.title,
      aspectRatio: data.aspectRatio,
      color: data.color,
      prompt: data.prompt,
      publicId: data.publicId,
    } : defaultValues
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    if (image) {
      const transformationUrl = getCldImageUrl({
        width: image.width,
        height: image.height,
        src: image.publicId,
        ...transformationConfig
      })

      const imageData = {
        title: values.title,
        publicId: image.publicId,
        transformationType: type,
        width: image.width,
        height: image.height,
        config: transformationConfig,
        secureURL: image.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }

      if (action === 'Add') {
        try {
          const newImage = await addImage({ image: imageData, userId, path: '/' })
          if (newImage) {
            form.reset()
            setImage(data)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.error("Error adding image:", error)
        }
      } else if (action === 'Update') {
        try {
          const updatedImage = await updateImage({
            image: { ...imageData, _id: data._id },
            userId,
            path: `/transformations/${data._id}`
          })
          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.error("Error updating image:", error)
        }
      }
    }

    setIsSubmitting(false)
  }

  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]
    setImage(prevState => prevState ? ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }) : null)
    setNewTransformation(transformationType.config)
    onChangeField(value)
  }

  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
    debounce(() => {
      setNewTransformation(prevState => ({
        ...prevState,
        [type as keyof Transformations]: {
          ...((prevState?.[type as keyof Transformations] as object) || {}),
          [fieldName === 'prompt' ? 'prompt' : 'to']: value
        }
      }))
    }, 1000)()
    onChangeField(value)
  }

  const onTransformHandler = async () => {
    setIsTransforming(true)
    setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig))
    setNewTransformation(null)
    startTransition(async () => {
      await updateCredits(userId, creditFee)
    })
  }

  useEffect(() => {
    if (image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
        
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" placeholder="Enter image title" />}
        />

        {(type === 'remove' || type === 'recolor') && (
          <div className="space-y-4">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
              className="w-full"
              render={({ field }) => (
                <Input
                  {...field}
                  className="input-field"
                  onChange={(e) => onInputChangeHandler('prompt', e.target.value, type, field.onChange)}
                />
              )}
            />

            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="input-field"
                    onChange={(e) => onInputChangeHandler('color', e.target.value, 'recolor', field.onChange)}
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="space-y-4">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />

          {type === 'fill' && (
            <CustomField
              control={form.control}
              name="aspectRatio"
              formLabel="Aspect Ratio"
              className="w-full"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                  value={field.value}
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(aspectRatioOptions).map(([key, { label }]) => (
                      <SelectItem key={key} value={key} className="select-item">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            type="button"
            className="submit-button"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>
          <Button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm