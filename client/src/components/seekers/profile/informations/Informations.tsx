import React, { useEffect, useState } from "react";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { Edit } from "lucide-react";

import { EditableSeekerInformationsSchemas } from "@/lib/zod/seekers";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import { SeekerTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type InformationsProps = {
  seeker?: SeekerTypes;
};

const Informations: React.FC<InformationsProps> = ({ seeker }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const form = useForm<zod.infer<typeof EditableSeekerInformationsSchemas>>({
    resolver: zodResolver(EditableSeekerInformationsSchemas),
  });
  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  useEffect(() => {
    if (isEditMode && seeker) {
      form.setValue("first_name", seeker.first_name || "");
      form.setValue("last_name", seeker.last_name || "");
      form.setValue("headline", seeker.headline || "");
      form.setValue("biography", seeker.biography || "");
    }
  }, [isEditMode, seeker, form.setValue]);

  const changeSeekerInformation = async (
    values: zod.infer<typeof EditableSeekerInformationsSchemas>
  ) => {
    const formData = new FormData();

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("headline", values.headline);
    formData.append("biography", values.biography);

    await editSeekerProfileMutate(formData);

    setIsEditMode(false);
  };

  const ProfileInformationArrays = [
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
    },
  ];

  return (
    <div className="flex flex-col gap-[16px] dark:border-[#3b3b3b]">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-base-black">Profile Information</h1>
        </div>
        <div>
          <Button
            variant={isEditMode ? "outline" : "default"}
            className="flex items-center gap-3"
            onClick={() => setIsEditMode((prevEditMode) => !prevEditMode)}
          >
            <div className="max-lg:hidden">Edit Profile</div>
            <div>
              <Edit />
            </div>
          </Button>
        </div>
      </div>
      <div>
        {!isEditMode ? (
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-[3rem] flex-wrap max-md:gap-3">
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
            <div>
              <div>
                <h1>Headline</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  {seeker?.headline || "No Headline Defined"}
                </p>
              </div>
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(changeSeekerInformation)}
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your first name as it appears on your official
                        documents.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your last name as it appears on your official
                        documents.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Developer....." {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief headline of your professional background
                      and skills.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Biography" {...field} />
                    </FormControl>
                    <FormDescription>
                      Share more detailed information about your professional
                      journey and experiences.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  variant="default"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="px-10"
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
        )}
      </div>
    </div>
  );
};

export default Informations;
