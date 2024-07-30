import React from "react";
import ReviewItem from "@/components/reviewitem";
import StarRating from "@/components/starInput";
import { getProductAction, addReviewAction } from "@/hooks/product";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RWebShare } from "react-web-share";
import { NextSeo } from 'next-seo';
const getPrifulePicFromId = (id: number) => {
  return `/assets/profile-pic-${(id % 4) + 1}.svg`;
};

const reviewsDisplayLimit = 1;

const BookPreview: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any>([]);
  const [displayedReviews, setDisplayedReviews] = useState<any>([]);
  const [ratingInput, setRatingInput] = useState<number>(0);
  const [reviewInput, setReviewInput] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    getProductAction(router.query.id)
      .then((res) => {
        setProduct(res?.data?.audiobook);
        setReviews(res?.data?.reviews);
        setDisplayedReviews(res?.data?.reviews.slice(0, reviewsDisplayLimit));
      })
      .catch((err) => {});
  }, [router.query.id]);

  useEffect(() => {
    setDisplayedReviews(reviews.slice(0, reviewsDisplayLimit));
    
  }, [reviews])
  
  return (
    <>
    <NextSeo
        title={product?.seo_title}
        description={product?.seo_description}
        canonical={`${router.basePath}/books/${product?.id}`}
        additionalMetaTags={
          [
            {
              name: 'keywords',
              content: product?.seo_keywords,
            },
          ]
        }
        openGraph={{
          title: product?.seo_title,
          description: product?.seo_description,
          url: `${router.basePath}/books/${product?.id}`,
          type: 'website',
          
          images: [
            {
              url: product?.cover_image,
              width: 800,
              height: 600,
              alt: product?.title,
            },
          ],
        }}/>
      <div className="bg-[#fafafa] p-10 flex flex-col tablet:flex-row justify-around">
        <div className="flex-shrink-0">
          <img
            src={product?.cover_image}
            alt="Book Cover"
            className="w-[430px] h-[528px]"
          />
        </div>
        <div className="p-8 bg-[#fafafa] max-w-4xl mx-auto rounded-lg ">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-inter text-3xl font-semibold text-gray-800 flex-1">
              {product?.title}
            </h2>
            <RWebShare
              data={{
                text: product?.title,
                url: `${router.basePath}/books/${product?.id}`,
              }}
            >
              <div className="flex items-center gap-4">
                <img src="/assets/share.svg" alt="Share" className="w-6 h-6" />
              </div>
            </RWebShare>
          </div>
          <div className="border-b border-gray-300 mb-6"></div>

          {/* Price */}
          <div className="flex items-center mb-6">
            <span className="font-inter text-2xl font-bold text-red-500 line-through">
              $29.5
            </span>
            <span className="font-inter text-2xl font-bold text-gray-800 ml-4">
              $19.5
            </span>
          </div>

   
          <div className="grid grid-cols-2 gap-8 mb-10">
           
            <div>
              <h3 className="font-poppins text-sm font-bold text-gray-600">
                Authored By
              </h3>
              <p className="font-inter text-md font-semibold text-gray-800">
                {product?.author?.name}
              </p>
            </div>
            <div>
              <h3 className="font-poppins text-sm font-bold text-gray-600">
                Language
              </h3>
              <p className="font-inter text-md font-semibold text-gray-800">
                English
              </p>
            </div>
            <div>
              <h3 className="font-poppins text-sm font-bold text-gray-600">
                ISBN
              </h3>
              <p className="font-inter text-md font-semibold text-gray-800">
                9786020385099
              </p>
            </div>

            <div>
              <h3 className="font-poppins text-sm font-bold text-gray-600">
                Genres
              </h3>
              <p className="font-inter text-md font-semibold text-gray-800">
                {product?.genre?.map((genre: any) => genre.name).join(", ")}
              </p>
            </div>
            <div>
              <h3 className="font-poppins text-sm font-bold text-gray-600">
                Rating
              </h3>
              {/* <p className="font-inter text-md font-semibold text-gray-800">
               {  product?.average_rating && <StarRating totalStars={product?.average_rating} allowUpdate={false} />}
              </p> */}
              <div className="flex items-center gap-2">
                <img
                  src={`/assets/star-fill.svg`}
                  alt="Star"
                  className="w-6 h-6"
                />
                <span className="font-inter font-bold text-md text-gray-800">
                  {product?.average_rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
        </div>
      </div>
      <div className="p-10">
        <h1 className="font-inter font-bold text-4xl text-gray-800 mb-4">
          Summary
        </h1>
        <p className="font-poppins text-lg text-gray-800 leading-8">
          {product?.description}
        </p>
        <br />
        <p className="font-poppins text-lg text-gray-800 leading-8">
          ...and hopefully relatable.
        </p>

        <div className="flex justify-between items-center mb-6">
          <h1 className="font-inter font-bold text-4xl text-gray-800">
            Review
          </h1>
          {displayedReviews.length == reviewsDisplayLimit && (
            <button
              onClick={() => {
                setDisplayedReviews(reviews);
              }}
              className="font-inter font-semibold text-sm text-gray-800"
            >
              SEE ALL
            </button>
          )}
        </div>
        <div className="flex flex-col gap-6 mb-4">
          {displayedReviews.map((review, index) => (
            <ReviewItem
              key={index}
              profilePic={getPrifulePicFromId(review?.id)}
              reviewerName={review.reviewerName}
              reviewContent={review.review_text}
              rating={review.rating}
            />
          ))}
        </div>
        <div className="flex flex-col items-start w-full gap-5">
          <StarRating rating={ratingInput} setRating={setRatingInput} />
          <textarea
            onChange={(e) => setReviewInput(e.target.value)}
            value={reviewInput}
            rows={5}
            placeholder="I enjoyed this book because..."
            className="w-full outline-3 bg-transparent border-2 rounded-2xl !border-black py-4 px-6 "
          />
        </div>
        <div className="flex flex-col items-end w-full gap-5 mt-4">
          <button
            onClick={() => {
              console.log("submitting review",product?.audiobook?.id,product);
              if(reviewInput.length < 10){
                alert("Review must be at least 10 characters long")
                return;
              }
              if(ratingInput == 0){
                alert("Please select a rating")
                return;
              }

              addReviewAction({id:product?.id, review : {
                rating: ratingInput,
                review_text: reviewInput,
                audiobook: product?.id,
                
              }})
                .then((res) => {
                  setReviews([...reviews, res.data]);
                  setDisplayedReviews([...displayedReviews, res.data]);
                  setRatingInput(0);
                  setReviewInput("");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="bg-black z-[100] text-white font-inter font-bold text-lg rounded-lg py-2 px-12flex items-center space-x-2 px-8 py-3 bg-[#1a1a1a] text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default BookPreview;
