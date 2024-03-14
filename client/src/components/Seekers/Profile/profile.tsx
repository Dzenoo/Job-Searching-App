import React, { FormEvent, useEffect, useState } from "react";
import { SeekerProfileInformationProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import Image from "next/image";
import { Edit, ImagePlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/Shared/Button";
import useUploads from "@/hooks/useUploads";
import { useMutation } from "react-query";
import { editSeekerProfile } from "@/utils/actions";
import { Controller, useForm } from "react-hook-form";
import { EditableSeekerInformationsSchemas } from "@/utils/validation";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { toast } from "react-toastify";
import { queryClient } from "@/contexts/react-query-client";
import { Input } from "@/components/Shared/Input";
import { Textarea } from "@/components/Shared/Textarea";
import { ClipLoader } from "react-spinners";

const SeekerProfileInformation: React.FC<SeekerProfileInformationProps> = ({
  seeker,
  token,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      "application/image": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });
  const { mutateAsync: editSeekerProfileMutate } = useMutation({
    mutationFn: (formData: FormData) => editSeekerProfile(formData, token),
    onSuccess: (response: any) => {
      restart();
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);

      setIsEditMode(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<zod.infer<typeof EditableSeekerInformationsSchemas>>({
    resolver: zodResolver(EditableSeekerInformationsSchemas),
  });

  useEffect(() => {
    setValue("first_name", seeker?.first_name || "");
    setValue("last_name", seeker?.last_name || "");
    setValue("biography", seeker?.biography || "");
  }, [setValue, isEditMode]);

  const changeSeekerImage = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (!selectedFile) {
      toast.error("Please Select Image");
      return;
    }

    formData.append("image", selectedFile!);

    await editSeekerProfileMutate(formData);
  };

  const changeSeekerInformation = async (
    values: zod.infer<typeof EditableSeekerInformationsSchemas>
  ) => {
    const formData = new FormData();

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("biography", values.biography);

    await editSeekerProfileMutate(formData);
  };

  const ProfileInformationArrays = new Array(
    {
      id: "1",
      title: "First Name",
      data: seeker?.first_name,
    },
    {
      id: "2",
      title: "Last Name",
      data: seeker?.last_name,
    },
    {
      id: "3",
      title: "Email",
      data: seeker?.email,
    }
  );

  return (
    <Card>
      <CardHeader className="flex justify-between gap-3 border-b border-gray-300 pb-7">
        <div className="flex items-center gap-7">
          <div>
            <Image
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : `https://job-searching-application.s3.amazonaws.com/${seeker?.image}`
              }
              alt="seeker_profile_img"
              width={130}
              height={130}
              className="rounded-full w-36 h-36 object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-initial-black">Profile Image</h1>
            </div>
            <Form
              onSubmit={changeSeekerImage}
              className="px-0 flex items-center gap-3"
            >
              <div
                {...getRootProps()}
                className="tag flex items-center gap-3 w-fit cursor-pointer"
              >
                <input {...getInputProps()} type="submit" />
                <div className="flex items-center gap-3">
                  <div>
                    <p>Upload new photo</p>
                  </div>
                  <div>
                    <ImagePlusIcon />
                  </div>
                </div>
              </div>
              {selectedFile && (
                <Button variant="default" type="submit">
                  Save
                </Button>
              )}
            </Form>
            <div>
              <p className="text-initial-gray">
                JPG or PNG formats are needed for photo.
              </p>
            </div>
          </div>
        </div>
        <div>
          <Button className="flex items-center gap-3" variant="danger">
            <div>Delete Profile</div>
            <div>
              <Trash color="#fff" />
            </div>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-7 border border-gray-300 rounded-lg flex flex-col gap-10">
          <div className="flex justify-between items-center gap-3">
            <div>
              <h1 className="text-base-black">Profile Information</h1>
            </div>
            <div>
              <Button
                className="flex items-center gap-3"
                variant="default"
                onClick={() => setIsEditMode((prevEditMode) => !prevEditMode)}
              >
                <div>Edit Profile</div>
                <div>
                  <Edit color="#fff" />
                </div>
              </Button>
            </div>
          </div>
          <div>
            {!isEditMode ? (
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-[3rem]">
                  {ProfileInformationArrays.map(({ id, data, title }) => (
                    <div key={id} className="flex flex-col gap-[3px]">
                      <div>
                        <p className="text-initial-gray">{title}</p>
                      </div>
                      <div>
                        <h1 className="font-bold">{data}</h1>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-[3px]">
                  <div>
                    <h1 className="text-initial-black">Biography</h1>
                  </div>
                  <div>
                    <p className="text-initial-gray">
                      {seeker?.biography || "No Biography Defined"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Form
                onSubmit={handleSubmit(changeSeekerInformation)}
                className="p-0"
              >
                <div className="flex items-center gap-3">
                  <FormItem className="w-full">
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="First Name"
                          type="text"
                          placeholder="First Name"
                          value={field.value || ""}
                        />
                      )}
                    />
                    {errors.first_name?.message && (
                      <FormInfo variant="danger">
                        {errors.first_name.message}
                      </FormInfo>
                    )}
                  </FormItem>
                  <FormItem className="w-full">
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Last Name"
                          type="text"
                          value={field.value || ""}
                        />
                      )}
                    />
                    {errors.last_name?.message && (
                      <FormInfo variant="danger">
                        {errors.last_name.message}
                      </FormInfo>
                    )}
                  </FormItem>
                </div>
                <FormItem className="w-full">
                  <Controller
                    name="biography"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Biography"
                        type="text"
                        value={field.value || ""}
                      />
                    )}
                  />
                  {errors.biography?.message && (
                    <FormInfo variant="danger">
                      {errors.biography.message}
                    </FormInfo>
                  )}
                </FormItem>
                <div>
                  <Button
                    variant="default"
                    type="submit"
                    disabled={isSubmitting}
                    className=" px-10"
                  >
                    {isSubmitting ? <ClipLoader color="#fff" /> : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { SeekerProfileInformation };
