import React from "react";

import { ReviewTypes } from "@/types";

import ReviewItem from "./ReviewItem";

type ReviewsListProps = {
  reviews?: ReviewTypes[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <div>
      <div>
        {reviews?.length === 0 && (
          <div>
            <h1 className="text-initial-gray text-center py-6">
              Oops! It looks like no reviews have been found
            </h1>
          </div>
        )}
        <ul className="flex flex-col gap-3">
          {reviews &&
            reviews?.length > 0 &&
            reviews?.map((review) => (
              <ReviewItem review={review} key={review._id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewsList;
