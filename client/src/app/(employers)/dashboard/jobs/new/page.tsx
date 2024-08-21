"use client";

import { Details } from "@/components/Employers/Dashboard/Jobs/New/Details";
import { Overview } from "@/components/Employers/Dashboard/Jobs/New/Overview";
import { Scope } from "@/components/Employers/Dashboard/Jobs/New/Scope";
import { Skills } from "@/components/Employers/Dashboard/Jobs/New/Skills";
import { AddJobText } from "@/components/Employers/Dashboard/Jobs/New/Text";
import Protected from "@/components/hoc/Protected";
import { Form } from "@/components/Shared/Forms";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/contexts/react-query-client";
import useAuthentication from "@/hooks/useAuthentication";
import { createNewJob } from "@/lib/actions/jobs.actions";
import { NewJobSchemas } from "@/lib/zod/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import zod from "zod";

const NewJobPage = () => {
  const { token } = useAuthentication().getCookieHandler();
  const { handleSubmit, control, formState, setValue, getValues } = useForm<
    zod.infer<typeof NewJobSchemas>
  >({
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
    resolver: zodResolver(NewJobSchemas),
  });
  const { mutateAsync: addNewJobMutate, isLoading } = useMutation({
    mutationFn: (formData: any) => createNewJob(token!, formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["jobs"]);
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
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
    setValue("skills", skills);
  };

  function renderCurrentStep() {
    const components = [
      <Details formState={formState} control={control} />,
      <Overview formState={formState} control={control} />,
      <Skills
        formState={formState}
        control={control}
        initialSkills={getValues("skills")}
        onSelectSkills={onSelectSkills}
      />,
      <Scope formState={formState} control={control} />,
    ];

    return components[currentJobForm];
  }

  async function addNewJob(values: zod.infer<typeof NewJobSchemas>) {
    await addNewJobMutate(values);
  }

  const stepDetails = [
    {
      title: "Lets start by creating a good basics details for job",
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
      <div className="flex px-36 gap-3 py-16">
        <div className="basis-1/2 flex flex-col gap-3">
          <AddJobText
            step={currentJobForm}
            title={stepDetails[currentJobForm].title}
            description={stepDetails[currentJobForm].description}
          />
        </div>
        <div className="basis-1/2 flex flex-col gap-10 justify-between">
          <div>
            <Form onSubmit={handleSubmit(addNewJob)} className="p-0">
              {renderCurrentStep()}
              {stepDetails.length - 1 === currentJobForm && (
                <div className="flex gap-3 justify-end">
                  <Button
                    type="submit"
                    variant="default"
                    disabled={!formState.isValid}
                  >
                    {isLoading ? <ClipLoader /> : "Submit"}
                  </Button>
                </div>
              )}
            </Form>
          </div>
          <div className="flex gap-3 items-center">
            {currentJobForm != 0 && (
              <div>
                <Button
                  onClick={hadleFormPrev}
                  className="w-28"
                  variant="outlined"
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

export default Protected(NewJobPage, ["employer"]);
