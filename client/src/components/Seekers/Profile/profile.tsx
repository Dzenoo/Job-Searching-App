import React, { FormEvent } from "react";
import { SeekerProfileInformationProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import { ImagePlusIcon, Trash } from "lucide-react";
import { Button } from "@/components/Shared/Button";
import { Form } from "@/components/Shared/Forms";
import { toast } from "react-toastify";
import { Informations } from "./Informations";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import useUploads from "@/hooks/useUploads";
import Image from "next/image";
import { Socials } from "./Socials";

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
  const { mutateAsync: editSeekerProfileMutate, isSuccess } = useEditSeeker();

  const changeSeekerImage = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (!selectedFile) {
      toast.error("Please Select Image");
      return;
    }

    formData.append("image", selectedFile!);

    await editSeekerProfileMutate(formData);

    if (isSuccess) {
      restart();
    }
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : `https://job-searching-application.s3.amazonaws.com/${seeker?.image}`;

  return (
    <Card>
      <CardHeader className="flex justify-between gap-3 border-b border-gray-300 pb-7">
        <div className="flex items-center gap-7">
          <div>
            <Image
              src={profileImageUrl}
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
      <CardContent className="flex flex-col gap-6">
        <Informations seeker={seeker} />
        <Socials seeker={seeker} />
      </CardContent>
    </Card>
  );
};

export { SeekerProfileInformation };
