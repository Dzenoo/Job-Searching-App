import React, { Fragment, useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditSeeker from "@/hooks/mutations/useEditSeeker";
import zod from "zod";
import { SeekersSkillsSchemas } from "@/lib/zod/seekers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getSkillsData } from "@/lib/utils";
import MultiSelect from "@/components/ui/multiselect";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type AddSkillsProps = {
  skills?: string[];
};

const AddSkillsForm: React.FC<AddSkillsProps> = ({ skills }) => {
  const form = useForm<zod.infer<typeof SeekersSkillsSchemas>>({
    resolver: zodResolver(SeekersSkillsSchemas),
    defaultValues: {
      skills: [],
    },
  });

  const onSelectTechnology = (skills: any) => {
    form.setValue("skills", skills);
  };

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
                    options={[
                      { label: "React.js", value: "React.js" },
                      { label: "Node.js", value: "Node.js" },
                      { label: "Express.js", value: "Express.js" },
                      { label: "MongoDB", value: "MongoDB" },
                    ]}
                    selectedValues={field.value || []}
                    onChange={field.onChange}
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
                      <Button variant="outline" key={index}>
                        {skill}
                      </Button>
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

export default Skills;
