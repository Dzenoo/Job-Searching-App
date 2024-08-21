import React, { Fragment, useEffect } from "react";
import { NewAlertsFormProps, SeekerProfileAlertsProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import useDialogs from "@/hooks/useDialogs";
import { Dialog } from "@/components/Shared/Dialog";
import zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobAlertsSchemas } from "@/lib/zod/seekers";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { Input } from "@/components/Shared/Input";
import { ClipLoader } from "react-spinners";
import useJobAlert from "@/hooks/mutations/useJobAlert";
import { Button } from "@/components/ui/button";

const NewAlertsForm: React.FC<NewAlertsFormProps> = ({
  alerts,
  closeDialog,
}) => {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<zod.infer<typeof JobAlertsSchemas>>({
    defaultValues: {
      title: "",
      level: "",
      type: "",
    },
    resolver: zodResolver(JobAlertsSchemas),
  });

  const { mutateAsync: generateJobAlertMutate } = useJobAlert();

  useEffect(() => {
    setValue("title", alerts.title || "");
    setValue("level", alerts.level || "");
    setValue("type", alerts.type || "");
  }, [alerts, setValue]);

  const onSubmit = async (values: zod.infer<typeof JobAlertsSchemas>) => {
    const formData = new FormData();

    formData.append("title", values.title || "");
    formData.append("type", values.type || "");
    formData.append("level", values.level || "");

    await generateJobAlertMutate(formData);

    closeDialog("alerts");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 flex-col text-center">
          <div>
            <h1 className="text-base-black">Add Job Alerts</h1>
          </div>
          <div>
            <p className="text-initial-gray text-center">
              Stay updated with personalized alerts tailored to your job
              preferences. Receive notifications about new job postings
            </p>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Title"
                label="Title"
                {...field}
                value={field.value}
              />
            )}
          />
          {errors.title?.message && (
            <FormInfo variant="danger">{errors.title.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Enter a title for your job alert.
          </FormInfo>
        </FormItem>
        <FormItem>
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Level"
                label="Level"
                {...field}
                value={field.value}
              />
            )}
          />
          {errors.level?.message && (
            <FormInfo variant="danger">{errors.level.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Select the desired job level for the alert.
          </FormInfo>
        </FormItem>
        <FormItem>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Type"
                label="Type"
                {...field}
                value={field.value}
              />
            )}
          />
          {errors.type?.message && (
            <FormInfo variant="danger">{errors.type.message}</FormInfo>
          )}
          <FormInfo variant="default">
            Select the preferred job type for the alert.
          </FormInfo>
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

const SeekerProfileAlerts: React.FC<SeekerProfileAlertsProps> = ({
  alerts,
}) => {
  const { dialogs, openDialog, closeDialog } = useDialogs({
    alerts: {
      isOpen: false,
    },
  });

  function areObjectKeysEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key]) {
        return false;
      }
    }
    return true;
  }

  return (
    <Fragment>
      <Dialog
        showCloseButton
        onCloseDialog={() => closeDialog("alerts")}
        isOpen={dialogs.alerts.isOpen}
        render={() => (
          <NewAlertsForm alerts={alerts!} closeDialog={closeDialog} />
        )}
      />
      <Card>
        <CardHeader>
          <div className="flex justify-between gap-3">
            <div>
              <h1 className="text-base-black">Job Alerts</h1>
            </div>
            <div>
              <Button onClick={() => openDialog("alerts")} variant="default">
                Edit Job Alerts
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {areObjectKeysEmpty(alerts) ? (
            <div className="text-center flex flex-col gap-[10px]">
              <div>
                <h1 className="text-base-black">No alert generated</h1>
              </div>
              <div>
                <p className="text-initial-gray">
                  Consider enabling alerts to help you find the best job and
                  opportunity.
                </p>
              </div>
              <div>
                <Button variant="default">Add New Alert</Button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-100 bg-white p-3 rounded-lg overflow-hidden dark:bg-[#0d0d0d] flex justify-between gap-3 dark:border-[#3b3b3b]">
              {Array.from([
                {
                  id: "1",
                  title: "Title",
                  data: alerts?.title,
                },
                {
                  id: "2",
                  title: "Type",
                  data: alerts?.type,
                },
                {
                  id: "3",
                  title: "Level",
                  data: alerts?.level,
                },
              ]).map((alertsInfoData) => (
                <div key={alertsInfoData.id} className="flex flex-col gap-3">
                  <div>
                    <h1 className="font-bold">{alertsInfoData.title}</h1>
                  </div>
                  <div>
                    <p className="text-initial-gray">{alertsInfoData?.data}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export { SeekerProfileAlerts };
