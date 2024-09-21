import React, { Fragment, useState } from "react";

import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import { SeekersSkillsSchemas } from "@/lib/zod/seekers";
import { getSkillsData, multiselectSkills } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/multiselect";
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
import { renderSkills } from "@/helpers";

type AddSkillsProps = {
  skills?: string[];
};

const AddSkillsForm: React.FC<AddSkillsProps> = ({ skills = [] }) => {
  const form = useForm<zod.infer<typeof SeekersSkillsSchemas>>({
    resolver: zodResolver(SeekersSkillsSchemas),
    defaultValues: {
      skills: skills,
    },
  });

  const { mutateAsync: editSeekerProfileMutate } = useEditSeeker();

  const onSubmit = async (values: zod.infer<typeof SeekersSkillsSchemas>) => {
    await editSeekerProfileMutate(values);
  };

  return (
    <DialogContent className="sm:max-w-lg p-6">
      <DialogHeader>
        <DialogTitle>Add Skills</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={multiselectSkills}
                    selectedValues={field.value}
                    onChange={(selectedValues) => {
                      form.setValue("skills", selectedValues);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Select skills that represent your expertise
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
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

type SkillsProps = {
  skills?: string[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

  const categorizedSkills = getSkillsData(skills || []);

  return (
    <Fragment>
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <AddSkillsForm skills={skills} />
      </Dialog>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Skills</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openDialog}
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
            <p className="text-initial-gray">No Skills Found</p>
          )}
        </div>
        {renderSkills(categorizedSkills)}
      </div>
    </Fragment>
  );
};

export default Skills;
