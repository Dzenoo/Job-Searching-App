import React, { Fragment } from "react";
import { AddEducationsDialogProps, EducationsProps } from "./types";
import { Button } from "@/components/Shared/Button";
import { Plus } from "lucide-react";
import { EducationList } from "./list";
import { Dialog } from "@/components/Shared/Dialog";
import useDialogs from "@/hooks/useDialogs";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { Input } from "@/components/Shared/Input";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditableEducationsSchemas } from "@/utils/zod/seekers";
import { useMutation } from "react-query";
import { addNewEducation } from "@/utils/actions/seekers";
import { toast } from "react-toastify";
import useAuthentication from "@/hooks/useAuthentication";
import { queryClient } from "@/contexts/react-query-client";

const AddEducationsDialog: React.FC<AddEducationsDialogProps> = ({
  closeDialog,
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<zod.infer<typeof EditableEducationsSchemas>>({
    resolver: zodResolver(EditableEducationsSchemas),
    defaultValues: {
      graduationDate: "",
      institution: "",
      degree: "",
      fieldOfStudy: "",
    },
  });
  const { mutateAsync: addNewEducationMutate } = useMutation({
    mutationFn: (formData: any) => addNewEducation(formData, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
      closeDialog("edu");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = async (
    values: zod.infer<typeof EditableEducationsSchemas>
  ) => {
    await addNewEducationMutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <h1 className="text-base-black">Add Education</h1>
          </div>
          <div>
            <p className="text-initial-gray text-center">
              Add education too for a more complete profile. Employers can learn
              more about you and view if you're a good fit.
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Controller
            name="institution"
            control={control}
            render={({ field }) => (
              <Input placeholder="Institution" label="Institution" {...field} />
            )}
          />
          {errors.institution?.message && (
            <FormInfo variant="danger">{errors.institution.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Please enter a valid institution where you studied
          </FormInfo>
        </FormItem>
        <FormItem>
          <Controller
            name="graduationDate"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Pick the date"
                label="Graduation Date"
                {...field}
                type="date"
              />
            )}
          />
          {errors.graduationDate?.message && (
            <FormInfo variant="danger">
              {errors.graduationDate.message}
            </FormInfo>
          )}
        </FormItem>
        <FormItem>
          <Controller
            name="fieldOfStudy"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Software..."
                label="Field Of Study"
                {...field}
              />
            )}
          />
          {errors.fieldOfStudy?.message && (
            <FormInfo variant="danger">{errors.fieldOfStudy.message}</FormInfo>
          )}
        </FormItem>
        <FormItem>
          <Controller
            name="degree"
            control={control}
            render={({ field }) => (
              <Input placeholder="Degree" label="Degree" {...field} />
            )}
          />
          {errors.degree?.message && (
            <FormInfo variant="danger">{errors.degree.message}</FormInfo>
          )}
        </FormItem>
        <div className="pt-7">
          <Button
            variant="default"
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full"
          >
            {isSubmitting ? <ClipLoader color="#fff" /> : "Add"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Educations: React.FC<EducationsProps> = ({ seeker }) => {
  const { dialogs, openDialog, closeDialog } = useDialogs({
    edu: {
      isOpen: false,
    },
  });

  return (
    <Fragment>
      <Dialog
        showCloseButton
        onCloseDialog={() => closeDialog("edu")}
        isOpen={dialogs.edu.isOpen}
        render={() => <AddEducationsDialog closeDialog={closeDialog} />}
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Education</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={() => openDialog("edu")}
            >
              <div className="max-lg:hidden">Add New Education</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <EducationList educations={seeker?.education} />
        </div>
      </div>
    </Fragment>
  );
};

export { Educations };
