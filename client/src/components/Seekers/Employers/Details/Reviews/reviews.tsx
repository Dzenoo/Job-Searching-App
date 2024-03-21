import React from "react";
import { ReviewsListProps } from "./types";
import { ReviewItem } from "./Item";

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <div>
      <div>
        {reviews?.length === 0 && (
          <div>
            <h1 className="text-initial-gray text-center py-6">
              Ops! Looks like there are no reviews founded
            </h1>
          </div>
        )}
        <ul className="flex flex-col gap-3">
          {reviews?.length > 0 &&
            reviews?.map((review) => (
              <ReviewItem review={review} key={review._id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export { ReviewsList };
