import React, { Fragment, useEffect } from "react";
import { SocialsDialogProps, SocialsProps } from "./types";
import { Button } from "@/components/Shared/Button";
import { Input } from "@/components/Shared/Input";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { Dialog } from "@/components/Shared/Dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditableSeekerSocialsSchemas } from "@/utils/zod/seekers";
import { Edit, Github, Image, Linkedin } from "lucide-react";
import { ClipLoader } from "react-spinners";
import useDialogs from "@/hooks/useDialogs";
import zod from "zod";
import Link from "next/link";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";

const EditSocialsDialog: React.FC<SocialsDialogProps> = ({
  closeDialog,
  seeker,
}) => {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<zod.infer<typeof EditableSeekerSocialsSchemas>>({
    resolver: zodResolver(EditableSeekerSocialsSchemas),
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  useEffect(() => {
    setValue("portfolio", seeker?.portfolio || "");
    setValue("github", seeker?.github || "");
    setValue("linkedin", seeker?.linkedin || "");
  }, [seeker, setValue]);

  const onSubmit = async (
    values: zod.infer<typeof EditableSeekerSocialsSchemas>
  ) => {
    const formData = new FormData();

    formData.append("portfolio", values.portfolio || "");
    formData.append("github", values.github || "");
    formData.append("linkedin", values.linkedin || "");

    await editSeekerProfileMutate(formData);

    closeDialog("socials");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <h1 className="text-base-black">Edit Socials</h1>
          </div>
          <div>
            <p className="text-initial-gray text-center">
              Add social profiles for a more complete profile. Employers can
              learn more about you and view if you're a good fit.
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Controller
            name="portfolio"
            control={control}
            render={({ field }) => (
              <Input placeholder="Portfolio" label="Portfolio" {...field} />
            )}
          />
          {errors.portfolio?.message && (
            <FormInfo variant="danger">{errors.portfolio.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Please enter a valid URL for your social media profile.
          </FormInfo>
        </FormItem>
        <FormItem>
          <Controller
            name="github"
            control={control}
            render={({ field }) => (
              <Input placeholder="Github" label="Github" {...field} />
            )}
          />
          {errors.github?.message && (
            <FormInfo variant="danger">{errors.github.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Please enter a valid URL for your social media profile.
          </FormInfo>
        </FormItem>
        <FormItem>
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <Input placeholder="Linkedin" label="Linkedin" {...field} />
            )}
          />
          {errors.linkedin?.message && (
            <FormInfo variant="danger">{errors.linkedin.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Please enter a valid URL for your social media profile.
          </FormInfo>
        </FormItem>
        <div className="pt-7">
          <Button
            variant="default"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? <ClipLoader color="#fff" /> : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Socials: React.FC<SocialsProps> = ({ seeker }) => {
  const { dialogs, openDialog, closeDialog } = useDialogs({
    socials: {
      isOpen: false,
    },
  });

  const SocialsArrays = new Array(
    {
      id: "1",
      title: "Portfolio",
      data: seeker?.portfolio || "",
      icon: <Image />,
    },
    {
      id: "2",
      title: "Github",
      data: seeker?.github || "",
      icon: <Github />,
    },
    {
      id: "3",
      title: "Linkedin",
      data: seeker?.linkedin || "",
      icon: <Linkedin />,
    }
  );

  return (
    <Fragment>
      <Dialog
        showCloseButton
        onCloseDialog={() => closeDialog("socials")}
        isOpen={dialogs.socials.isOpen}
        render={() => (
          <EditSocialsDialog seeker={seeker} closeDialog={closeDialog} />
        )}
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Socials</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={() => openDialog("socials")}
            >
              <div className="max-lg:hidden">Edit Socials</div>
              <div>
                <Edit color="#fff" />
              </div>
            </Button>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {SocialsArrays.map(({ id, title, data, icon }) => (
            <div
              key={id}
              className="flex flex-col gap-3 items-center justify-center px-16 py-7 border border-gray-300 rounded-lg transition-all hover:bg-gray-100 overflow-hidden dark:border-[#3b3b3b] dark:hover:bg-[#0d0d0d]"
            >
              <div>{icon}</div>
              <div>
                <h1 className="font-bold">{title}</h1>
              </div>
              <div className="text-center">
                {data === "" ? (
                  <p className="text-initial-gray">Add {title}</p>
                ) : (
                  <Link
                    className="text-[--blue-base-color]"
                    href={data}
                    target="_blank"
                  >
                    {data}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export { Socials };
