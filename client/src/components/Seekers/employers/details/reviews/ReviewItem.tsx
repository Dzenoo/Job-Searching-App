import React from "react";
import { Briefcase, Calendar, Timer } from "lucide-react";
import { ReviewTypes } from "@/types";
import { getTime } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { renderIconText } from "@/helpers";

type ReviewItemProps = {
  review: ReviewTypes;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const createdTime = getTime(review?.createdAt);

  const ReviewFooterData = new Array(
    {
      id: "1",
      data: review?.time,
      icon: <Timer color="gray" />,
    },
    {
      id: "2",
      data: review?.type,
      icon: <Briefcase color="gray" />,
    },
    {
      id: "3",
      data: createdTime,
      icon: <Calendar color="gray" />,
    }
  );

  return (
    <Card>
      <CardHeader>
        <div>
          <h1 className="text-base-black">{review?.job_position}</h1>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 py-0">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="font-bold">Positive Review</h1>
          </div>
          <div>
            <p className="text-initial-gray">{review?.positiveReview}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="font-bold">Negative Review</h1>
          </div>
          <div>
            <p className="text-initial-gray">{review?.negativeReview}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="font-bold">Skills</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {review?.technologies?.map((technology, index) => (
              <div key={index} className="tag">
                {technology}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-6 dark:border-[#0d0d0d]">
        <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
          {ReviewFooterData.map((footerData) => renderIconText(footerData))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewItem;