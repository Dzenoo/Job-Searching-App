import React, { FormEvent, Fragment, useState } from "react";
import Image from "next/image";

import { ImagePlusIcon, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";

import useEditEmployer from "@/hooks/mutations/useEditEmployer";
import useUploads from "@/hooks/useUploads";
import useAuthentication from "@/hooks/useAuthentication";

import { EmployerTypes } from "@/types";

import { deleteEmployerProfile } from "@/lib/actions/employers.actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import EmployerInformations from "./informations/EmployerInformations";

type EmployerDeleteDialogProps = {
  token: string;
  closeDialog: () => void;
};

const DeleteEmployerProfileDialog: React.FC<EmployerDeleteDialogProps> = ({
  token,
  closeDialog,
}) => {
  const { toast } = useToast();
  const { deleteCookieHandler } = useAuthentication();
  const { mutateAsync: deleteEmployerProfileMutate } = useMutation({
    mutationFn: () => deleteEmployerProfile(token! as any),
    onSuccess: () => {},
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const onDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    await deleteEmployerProfileMutate();

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
              applications and jobs. Seeker will no longer be able to vi you.
              Are you sure you want to proceed?
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onDeleteAccount}>
            Delete
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

type EmployerProfileInformationProps = {
  employer?: EmployerTypes;
  token: string;
};

const EmployerProfileInformation: React.FC<EmployerProfileInformationProps> = ({
  employer,
  token,
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { getInputProps, getRootProps, selectedFile, restart } = useUploads({
    accept: {
      "application/image": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const { mutateAsync: editEmployerProfileMutate } = useEditEmployer();

  const changeEmployerImage = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({ title: "Error", description: "Please Select Image" });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    await editEmployerProfileMutate(formData);
    restart();
  };

  const profileImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : employer?.image.includes("https:")
    ? employer?.image
    : `https://job-searching-application.s3.amazonaws.com/${employer?.image}`;

  return (
    <Fragment>
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <DeleteEmployerProfileDialog
          token={token}
          closeDialog={() => setIsDialogOpen(false)}
        />
      </Dialog>
      <div>
        <div>
          <div className="flex justify-between items-start gap-5">
            <div className="flex items-center gap-7 flex-wrap">
              <div>
                <Image
                  src={profileImageUrl}
                  alt="Employer_profile_img"
                  width={130}
                  height={130}
                  className="rounded-full w-36 h-36 object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-initial-black">Profile Image</h1>
                <form
                  onSubmit={changeEmployerImage}
                  className="flex items-center gap-3"
                >
                  <div
                    {...getRootProps()}
                    className="tag flex items-center gap-3 w-fit cursor-pointer"
                  >
                    <input {...getInputProps()} type="file" />
                    <div className="flex items-center gap-3">
                      <Button type="button" variant="outline">
                        Upload new photo
                      </Button>
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
                  Please upload your photo in JPG or PNG format.
                </p>
              </div>
            </div>
            <div>
              <Button
                className="flex items-center gap-3"
                variant="destructive"
                onClick={() => setIsDialogOpen(true)}
              >
                <div className="max-sm:hidden whitespace-nowrap">
                  Delete Profile
                </div>
                <Trash color="#fff" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <Separator className="relative top-5" />
          <EmployerInformations employer={employer} />
          {/* <Socials Employer={Employer} />
          <Educations Employer={Employer} />
          <Skills skills={Employer?.skills} /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default EmployerProfileInformation;
