import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EmployersItemProps } from "./types";
import { Card, CardContent, CardFooter } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { renderIconText } from "@/utils/jsx";
import { Camera, FileText, Text } from "lucide-react";
import { useMutation } from "react-query";
import { followEmployer } from "@/utils/actions";
import { toast } from "react-toastify";

const EmployerItem: React.FC<EmployersItemProps> = ({ employer, token }) => {
  const { mutateAsync: followEmployerMutate, isLoading } = useMutation({
    mutationFn: () => followEmployer(employer._id, token as string),
    mutationKey: ["companies"],
    onSuccess: (response: any) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const FooterEmployerData = new Array(
    {
      id: "1",
      icon: <Camera color="gray" />,
      data: employer.followers.length + " Followers",
    },
    {
      id: "2",
      icon: <Text color="gray" />,
      data: employer.reviews.length + " Reviews",
    },
    {
      id: "3",
      icon: <FileText color="gray" />,
      data: employer.events.length + " Events",
    }
  );

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          <div>
            <Image
              src="/images/company.png"
              alt="company"
              width={300}
              height={300}
              className="object-cover w-auto h-auto"
            />
          </div>
          <div className="flex flex-col gap-3 basis-full">
            <div className="flex items-center gap-3 justify-between">
              <div>
                <Link href={`/companies/${employer._id}`}>
                  <h1 className="text-base-black font-bold">{employer.name}</h1>
                </Link>
              </div>
              <div>
                <Button
                  className="px-10"
                  variant="default"
                  onClick={async () => await followEmployerMutate()}
                  disabled={isLoading}
                >
                  Follow
                </Button>
              </div>
            </div>
            <div>
              <p className="text-initial-gray truncate">
                {employer.company_description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-6">
        <div className="gap-6 flex items-center justify-between">
          {FooterEmployerData.map((data) => renderIconText(data))}
        </div>
      </CardFooter>
    </Card>
  );
};

export { EmployerItem };
