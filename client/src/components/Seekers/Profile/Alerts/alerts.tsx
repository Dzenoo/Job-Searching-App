import React, { Fragment } from "react";
import { NewAlertsFormProps, SeekerProfileAlertsProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import { Button } from "@/components/Shared/Button";
import useDialogs from "@/hooks/useDialogs";
import { Dialog } from "@/components/Shared/Dialog";

const NewAlertsForm: React.FC<NewAlertsFormProps> = () => {
  return <div></div>;
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
        render={() => <NewAlertsForm closeDialog={closeDialog} />}
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
            <div className="border border-gray-100 bg-white p-3 rounded-lg overflow-hidden flex justify-between gap-3">
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
