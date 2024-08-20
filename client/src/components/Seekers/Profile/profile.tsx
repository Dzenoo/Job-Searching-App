import React, { FormEvent, Fragment } from "react";
import {
  SeekerDeleteDialogProps,
  SeekerProfileInformationProps,
} from "./types";
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
import { Dialog } from "@/components/Shared/Dialog";
import useDialogs from "@/hooks/useDialogs";
import { useMutation } from "react-query";
import { deleteSeekerProfile } from "@/utils/actions/seekers";
import useAuthentication from "@/hooks/useAuthentication";
import { Educations } from "./Educations";
import { Skills } from "./Skills";

const DeleteSeekerProfileDialog: React.FC<SeekerDeleteDialogProps> = ({
  token,
}) => {
  const { deleteCookieHandler } = useAuthentication();
  const { mutateAsync: deleteSeekerProfileMutate } = useMutation({
    mutationFn: () => deleteSeekerProfile(token),
    onSuccess: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    await deleteSeekerProfileMutate();

    deleteCookieHandler();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <h1 className="text-base-black">Delete Profile</h1>
          </div>
          <div>
            <p className="text-initial-gray text-center">
              Deleting your account will remove all your information, including
              applications, events, and jobs. Employers will no longer be able
              to contact you. Are you sure you want to proceed?
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={onDeleteAccount}>
        <Button variant="danger" type="submit" className="w-full">
          Delete
        </Button>
      </Form>
    </div>
  );
};

const SeekerProfileInformation: React.FC<SeekerProfileInformationProps> = ({
  seeker,
  token,
}) => {
  const { dialogs, openDialog, closeDialog } = useDialogs({
    delete: {
      isOpen: false,
    },
  });
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

    restart();
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : seeker?.image.includes("https:")
    ? seeker?.image
    : `https://job-searching-application.s3.amazonaws.com/${seeker?.image}`;

  return (
    <Fragment>
      <Dialog
        showCloseButton
        onCloseDialog={() => closeDialog("delete")}
        isOpen={dialogs.delete.isOpen}
        render={() => <DeleteSeekerProfileDialog token={token} />}
      />
      <Card>
        <CardHeader className="flex justify-between gap-6 border-b border-gray-300 pb-7 dark:border-[#0d0d0d] max-lg:flex-col">
          <div className="flex items-center gap-7 flex-wrap">
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
            <Button
              className="flex items-center gap-3"
              variant="danger"
              onClick={() => openDialog("delete")}
            >
              <div className="whitespace-nowrap">Delete Profile</div>
              <div>
                <Trash color="#fff" />
              </div>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Informations seeker={seeker} />
          <Socials seeker={seeker} />
          <Educations seeker={seeker} />
          <Skills skills={seeker?.skills} />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export { SeekerProfileInformation };
