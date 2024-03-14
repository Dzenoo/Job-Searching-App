import React, { FormEvent } from "react";
import { SeekerProfileInformationProps } from "./types";
import { Card, CardHeader } from "@/components/Shared/Card";
import Image from "next/image";
import { ImagePlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/Shared/Button";
import useUploads from "@/hooks/useUploads";
import { useMutation } from "react-query";
import { editSeekerProfile } from "@/utils/actions";
import { useForm } from "react-hook-form";
import { EditSeekerProfileSchemas } from "@/utils/validation";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Shared/Forms";
import { toast } from "react-toastify";
import { queryClient } from "@/contexts/react-query-client";

const SeekerProfileInformation: React.FC<SeekerProfileInformationProps> = ({
  seeker,
  token,
}) => {
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
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const {} = useForm<zod.infer<typeof EditSeekerProfileSchemas>>({
    resolver: zodResolver(EditSeekerProfileSchemas),
    defaultValues: {
      first_name: seeker?.first_name || "",
      last_name: seeker?.last_name || "",
      github: seeker?.github || "",
      linkedin: seeker?.linkedin || "",
      portfolio: seeker?.portfolio || "",
      image: seeker?.image || "",
    },
  });

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
              className="rounded-full w-36 h-36"
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
    </Card>
  );
};

export { SeekerProfileInformation };
