import React, { Fragment } from "react";
import { AddSkillsProps, SkillsProps } from "./types";
import { Plus } from "lucide-react";
import useDialogs from "@/hooks/useDialogs";
import { Dialog } from "@/components/Shared/Dialog";
import { Controller, useForm } from "react-hook-form";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import zod from "zod";
import { SeekersSkillsSchemas } from "@/lib/zod/seekers";
import { Tag } from "@/components/Shared/Tag";
import { getSkillsData } from "@/lib/helpers";
import { Button } from "@/components/ui/button";

const AddSkillsForm: React.FC<AddSkillsProps> = ({ skills }) => {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<zod.infer<typeof SeekersSkillsSchemas>>({
    resolver: zodResolver(SeekersSkillsSchemas),
    defaultValues: {
      skills: [],
    },
  });

  const onSelectTechnology = (skills: any) => {
    setValue("skills", skills);
  };

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const onSubmit = async (values: zod.infer<typeof SeekersSkillsSchemas>) => {
    await editSeekerProfileMutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <h1 className="text-base-black">Add Skills</h1>
          </div>
          <div>
            <p className="text-initial-gray text-center">
              Adding skills is an excellent way to showcase your expertise to
              potential employers.
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Tag
                options={[
                  { label: "React.js", value: "React.js" },
                  { label: "Node.js", value: "Node.js" },
                  { label: "Express.js", value: "Express.js" },
                  { label: "MongoDB", value: "MongoDB" },
                ]}
                {...field}
                label="Skills"
                placeholder="Select Skills"
                initials={skills}
                onSelect={onSelectTechnology}
              />
            )}
          />
          {errors.skills?.message && (
            <FormInfo variant="danger">{errors.skills.message}</FormInfo>
          )}
        </FormItem>
        <div className="pt-7">
          <Button
            variant="default"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? <ClipLoader color="#fff" /> : "Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { dialogs, openDialog, closeDialog } = useDialogs({
    skills: {
      isOpen: false,
    },
  });
  const categorizedSkills = getSkillsData(skills || []);

  return (
    <Fragment>
      <Dialog
        showCloseButton
        onCloseDialog={() => closeDialog("skills")}
        isOpen={dialogs.skills.isOpen}
        render={() => <AddSkillsForm skills={skills} />}
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Skills</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={() => openDialog("skills")}
            >
              <div className="max-lg:hidden">Add Skills</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="text-center">
          {skills?.length === 0 && (
            <p className="text-initial-gray">No Skills Founded</p>
          )}
        </div>
        <div className="flex gap-6">
          {Object.entries(categorizedSkills).map(
            ([category, skills]) =>
              skills.length > 0 && (
                <div key={category} className="flex flex-col gap-3">
                  <div>
                    <h1 className="text-initial-black">{category}</h1>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="tag">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </Fragment>
  );
};

export { Skills };
