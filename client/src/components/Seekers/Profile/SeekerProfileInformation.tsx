import React, { FormEvent, Fragment, useState } from "react";
import { ImagePlusIcon, Trash } from "lucide-react";
import { toast } from "react-toastify";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import useUploads from "@/hooks/useUploads";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SeekerTypes } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Informations from "./informations/Informations";
import Socials from "./socials/socials";
import Educations from "./educations/Educations";
import Skills from "./skills/Skills";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useAuthentication from "@/hooks/useAuthentication";
import { useMutation } from "react-query";
import { deleteSeekerProfile } from "@/lib/actions/seekers.actions";

type SeekerDeleteDialogProps = {
  token: string;
  closeDialog: () => void;
};

const DeleteSeekerProfileDialog: React.FC<SeekerDeleteDialogProps> = ({
  token,
  closeDialog,
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
    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Profile</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-6">
        <div className="max-w-lg">
          <div className="flex items-center justify-center gap-3 flex-col">
            <p className="text-initial-gray text-center">
              Deleting your account will remove all your information, including
              applications, events, and jobs. Employers will no longer be able
              to contact you. Are you sure you want to proceed?
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onDeleteAccount}>
            Delete
          </Button>
          <Button variant="default" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

type SeekerProfileInformationProps = {
  seeker?: SeekerTypes;
  token: string;
};

const SeekerProfileInformation: React.FC<SeekerProfileInformationProps> = ({
  seeker,
  token,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      "application/image": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const changeSeekerImage = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please Select Image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

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
      <Dialog open={isDialogOpen}>
        <DeleteSeekerProfileDialog
          token={token}
          closeDialog={() => setIsDialogOpen(false)}
        />
      </Dialog>
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
              <h1 className="text-initial-black">Profile Image</h1>
              <form
                onSubmit={changeSeekerImage}
                className="flex items-center gap-3"
              >
                <div
                  {...getRootProps()}
                  className="tag flex items-center gap-3 w-fit cursor-pointer"
                >
                  <input {...getInputProps()} type="file" />
                  <div className="flex items-center gap-3">
                    <p>Upload new photo</p>
                    <ImagePlusIcon />
                  </div>
                </div>
                {selectedFile && (
                  <Button variant="default" type="submit">
                    Save
                  </Button>
                )}
              </form>
              <p className="text-initial-gray">
                JPG or PNG formats are needed for photo.
              </p>
            </div>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="destructive"
              onClick={() => setIsDialogOpen(true)}
            >
              <div className="whitespace-nowrap">Delete Profile</div>
              <Trash color="#fff" />
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

export default SeekerProfileInformation;