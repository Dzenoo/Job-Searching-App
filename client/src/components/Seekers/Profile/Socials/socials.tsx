import React, { Fragment, useState } from "react";
import zod from "zod";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { Edit, Github, Image, Linkedin } from "lucide-react";

import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import { EditableSeekerSocialsSchemas } from "@/lib/zod/seekers";
import { SeekerTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatURL } from "@/lib/utils";

type SocialsDialogProps = {
  closeDialog: () => void;
  seeker?: {
    portfolio: string;
    linkedin: string;
    github: string;
  };
};

const EditSocialsDialog: React.FC<SocialsDialogProps> = ({
  closeDialog,
  seeker,
}) => {
  const form = useForm<zod.infer<typeof EditableSeekerSocialsSchemas>>({
    resolver: zodResolver(EditableSeekerSocialsSchemas),
    defaultValues: {
      portfolio: seeker?.portfolio || "",
      github: seeker?.github || "",
      linkedin: seeker?.linkedin || "",
    },
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const onSubmit = async (
    values: zod.infer<typeof EditableSeekerSocialsSchemas>
  ) => {
    const formData = new FormData();

    formData.append("portfolio", values.portfolio || "");
    formData.append("github", values.github || "");
    formData.append("linkedin", values.linkedin || "");

    await editSeekerProfileMutate(formData);

    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Socials</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourportfolio.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide the URL to your online portfolio or personal
                    website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the URL to your Github profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide the URL to your LinkedIn profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-7">
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                {form.formState.isSubmitting ? (
                  <ClipLoader color="#fff" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

type SocialsProps = {
  seeker?: SeekerTypes;
};

const Socials: React.FC<SocialsProps> = ({ seeker }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const SocialsArrays = [
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
    },
  ];

  return (
    <Fragment>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <EditSocialsDialog seeker={seeker} closeDialog={closeDialog} />
      </Dialog>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Socials</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openDialog}
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
                  <a
                    className="text-[--blue-base-color]"
                    href={formatURL(data)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Socials;
