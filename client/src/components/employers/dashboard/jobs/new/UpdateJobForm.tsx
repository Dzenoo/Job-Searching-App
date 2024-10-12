"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";
import zod from "zod";

import useAuthentication from "@/hooks/defaults/useAuthentication";

import { createNewJob, editJob } from "@/lib/actions/jobs.actions";
import { UpdateJobSchemas } from "@/lib/zod/jobs";
import { useRouter } from "next/navigation";

import { queryClient } from "@/context/react-query-client";

import Details from "@/components/employers/dashboard/jobs/new/Details";
import Overview from "@/components/employers/dashboard/jobs/new/Overview";
import Scope from "@/components/employers/dashboard/jobs/new/Scope";
import Skills from "@/components/employers/dashboard/jobs/new/Skills";
import Text from "@/components/employers/dashboard/jobs/new/Text";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { JobTypes } from "@/types";

type UpdateJobFormProps =
  | {
      isEdit: false;
    }
  | {
      isEdit: true;
      formData: JobTypes;
      jobId: string;
    };

const UpdateJobForm: React.FC<UpdateJobFormProps> = (props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const { isEdit } = props;
  const formData = isEdit ? props.formData : undefined;
  const jobId = isEdit ? props.jobId : undefined;

  const form = useForm<zod.infer<typeof UpdateJobSchemas>>({
    mode: "all",
    defaultValues: {
      title: "",
      overview: "",
      location: "",
      description: "",
      expiration_date: "",
      salary: 0,
      skills: [],
      position: "Hybrid",
      level: "Junior",
      type: "Freelance",
    },
    resolver: zodResolver(UpdateJobSchemas),
  });

  const { setValue, reset } = form;

  useEffect(() => {
    if (formData) {
      reset({
        title: formData.title,
        overview: formData.overview,
        location: formData.location,
        description: formData.description,
        expiration_date: formData.expiration_date,
        salary: formData.salary || 0,
        skills: formData.skills || [],
        position: formData.position || "Hybrid",
        level: formData.level || "Junior",
        type: formData.type || "Freelance",
      });
    }
  }, [formData, reset]);

  const { mutateAsync: updateJobMutate, isLoading } = useMutation({
    mutationFn: (formData: any) =>
      isEdit
        ? editJob(token!, jobId as string, formData)
        : createNewJob(token!, formData),
    onSuccess: (response) => {
      router.push(`/dashboard/jobs/?page=1`);
      queryClient.invalidateQueries(["jobs"]);
      toast({ title: "Success", description: response.message });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });
  const [currentJobForm, setCurrentJobForm] = useState<number>(0);

  function hadleFormNext(): void {
    setCurrentJobForm(currentJobForm === 3 ? 3 : currentJobForm + 1);
  }

  function hadleFormPrev(): void {
    setCurrentJobForm(currentJobForm === 0 ? 0 : currentJobForm - 1);
  }

  const onSelectSkills = (skills: any) => {
    form.setValue("skills", skills);
  };

  function renderCurrentStep() {
    const components = [
      <Details control={form.control} />,
      <Overview control={form.control} />,
      <Skills control={form.control} onSelectSkills={onSelectSkills} />,
      <Scope control={form.control} />,
    ];

    return components[currentJobForm];
  }

  async function updateJob(values: zod.infer<typeof UpdateJobSchemas>) {
    await updateJobMutate(values);
  }

  const stepDetails = [
    {
      title: "Begin by crafting a solid foundation for the job",
      description:
        "Crafting a compelling job title is key to attracting top-tier candidates. It's the first impression seekers will have of your job, so make it count.",
    },
    {
      title: "Provide a detailed description of the job",
      description:
        "This information helps candidates assess their fit for the position and enhances the quality of applications you receive",
    },
    {
      title: "What key skills are essential for this role?",
      description:
        "Clearly defined skills help applicants gauge their qualifications and suitability for the role.",
    },
    {
      title: "Describe the scope of the job",
      description:
        " A clear scope helps candidates understand the role's impact and envision their future within the organization",
    },
  ];

  return (
    <section>
      <div className="flex px-36 gap-10 py-16 max-xl:flex-col max-lg:px-0">
        <div className="basis-1/2 flex flex-col gap-3">
          <Text
            step={currentJobForm}
            title={stepDetails[currentJobForm].title}
            description={stepDetails[currentJobForm].description}
          />
        </div>
        <div className="basis-1/2 flex flex-col gap-10 justify-between">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updateJob)}
                className="space-y-10"
              >
                {renderCurrentStep()}
                {stepDetails.length - 1 === currentJobForm && (
                  <div className="flex gap-3 justify-end">
                    <Button type="submit" variant="default">
                      {isLoading ? <ClipLoader /> : "Submit"}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
          <div className="flex gap-3 items-center">
            {currentJobForm != 0 && (
              <div>
                <Button
                  onClick={hadleFormPrev}
                  className="w-28"
                  variant="outline"
                >
                  Previous
                </Button>
              </div>
            )}
            {stepDetails.length - 1 != currentJobForm && (
              <div>
                <Button
                  onClick={hadleFormNext}
                  className="w-28"
                  variant="default"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateJobForm;
