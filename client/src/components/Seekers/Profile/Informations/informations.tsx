import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { EditableSeekerInformationsSchemas } from "@/lib/zod/seekers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { InformationsProps } from "./types";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import zod from "zod";
import { Input } from "@/components/Shared/Input";
import { Button } from "@/components/Shared/Button";
import { Textarea } from "@/components/Shared/Textarea";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";

const Informations: React.FC<InformationsProps> = ({ seeker }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<zod.infer<typeof EditableSeekerInformationsSchemas>>({
    resolver: zodResolver(EditableSeekerInformationsSchemas),
  });
  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  useEffect(() => {
    if (isEditMode && seeker) {
      setValue("first_name", seeker.first_name || "");
      setValue("last_name", seeker.last_name || "");
      setValue("overview", seeker.overview || "");
      setValue("biography", seeker.biography || "");
    }
  }, [isEditMode, seeker, setValue]);

  const changeSeekerInformation = async (
    values: zod.infer<typeof EditableSeekerInformationsSchemas>
  ) => {
    const formData = new FormData();

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("overview", values.overview);
    formData.append("biography", values.biography);

    await editSeekerProfileMutate(formData);

    setIsEditMode(false);
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
    <div className="p-7 border border-gray-300 rounded-lg flex flex-col gap-[16px] dark:border-[#3b3b3b] max-sm:p-4">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-base-black">Profile Information</h1>
        </div>
        <div>
          <Button
            variant={isEditMode ? "outlined" : "default"}
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
                <h1>Overview</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  {seeker?.overview || "No Overview Defined"}
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
          <Form
            onSubmit={handleSubmit(changeSeekerInformation)}
            className="p-0"
          >
            <div className="flex items-center gap-3 flex-wrap">
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
                    <Input {...field} label="Last Name" type="text" />
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
                name="overview"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Overview"
                    type="text"
                    placeholder="Senior Software Engineer..."
                  />
                )}
              />
              {errors.overview?.message && (
                <FormInfo variant="danger">{errors.overview.message}</FormInfo>
              )}
            </FormItem>
            <FormItem className="w-full">
              <Controller
                name="biography"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Biography" type="text" />
                )}
              />
              {errors.biography?.message && (
                <FormInfo variant="danger">{errors.biography.message}</FormInfo>
              )}
            </FormItem>
            <div>
              <Button
                variant="default"
                type="submit"
                disabled={isSubmitting}
                className="px-10"
              >
                {isSubmitting ? <ClipLoader color="#fff" /> : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export { Informations };
