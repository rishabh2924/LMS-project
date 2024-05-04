import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { styles } from "../styles/style";
import Image from "next/image";
import { comment } from "postcss";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  refetch,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isloading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isloading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isloading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [addReplyInReview, { isSuccess: replySuccess, error: replyError }] =
    useAddReplyInReviewMutation();

  const { data: courseData, refetch: refetchCourse } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const course = courseData?.course;
  console.log(course);

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user?._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });

      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = async () => {
    addAnswerInQuestion({
      answer,
      questionId: questionId,
      courseId: id,
      contentId: data[activeVideo]._id,
    });
    console.log("askdhlasiodfhaisdf");
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review cannot be empty");
    } else {
      addReviewInCourse({
        review,
        rating,
        courseId: id,
      });
    }
  };

  const handleReviewReplySubmit = async () => {
    if (reply === "") {
      toast.error("Reply cannot be empty");
    } else {
      addReplyInReview({
        comment: reply,
        reviewId: reviewId,
        courseId: id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (answerSuccess) {
      setAnswer("");
      setQuestionId("");
      refetch();
      toast.success("Answer added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError.data as any;
        toast.error(errorMessage.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      refetchCourse();
      setRating(1);
      toast.success("Review added successfully");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError.data as any;
        toast.error(errorMessage.message);
      }
    }
    if (replySuccess) {
      setReply("");
      refetchCourse();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError.data as any;
        toast.error(errorMessage.message);
      }
    }
  }, [
    isSuccess,
    error,
    refetch,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    refetchCourse,
    replySuccess,
    replyError,
  ]);

  return (
    <div className="w-[95%] text-black dark:text-white 800px:w-[86%] py-4 m-auto ">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div
        className="w-full flex items-center justify-between
                  my-3"
      >
        <div
          className={`${styles.button} flex !w-[unset] !min-h-10 !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-80"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Previous Lesson
        </div>
        <div
          className={`${styles.button} flex !w-[unset] !min-h-10 !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-80"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-semibold ">
        {data[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-lg whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div className="">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5 " key={index}>
              <h2 className="text-[25px] font-Poppins font-semibold text-black dark:text-white">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className=" inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user?.avatar ? user?.avatar.url : "images/Progile.webp"}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full w-10 h-10 object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-slate-500 dakr:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-lg font-Poppins "
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-40 text-center  text-lg mt-5 mb-10  `}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="w-full flex">
                  <Image
                    src={
                      user?.avatar ? user?.avatar.url : "images/Progile.webp"
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-xl font-medium text-black dark:text-white ">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i, index) =>
                        rating >= i ? (
                          <AiFillStar
                            key={index}
                            className="text-yellow-500 text-2xl cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={index}
                            className="text-yellow-500 text-2xl cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your review..."
                      className=" bg-transparent ml-3 border border-[#000000] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-lg font-Poppins "
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-30 text-center  text-lg mt-5 mb-10  800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full mb-10">
              {(course?.reviews && [...course.reviews].reverse())?.map(
                (item: any, index: Number) => (
                  <>
                    <div className="w-full my-5 text-black dark:text-white">
                      <div className="w-full flex">
                        <div className="">
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : "/images/Profile.webp"
                            }
                            alt="avatar"
                            width={50}
                            height={50}
                            className="rounded-full w-10 h-10 object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-lg">{item.user.name}</h1>
                          <Ratings rating={item.rating} />
                          <p>{item.comment}</p>
                          <small className="text-slate-500 dark:text-[#ffffff83]">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" && (
                        <span
                          className={`${styles.label} flex mt-2 cursor-pointer ml-10`}
                          onClick={() => {
                            setIsReviewReply(!isReviewReply),
                              setReviewId(item._id);
                          }}
                        >
                          Add Reply
                        </span>
                      )}
                      {isReviewReply && (
                        <div className="w-full flex relative">
                          <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Enter your Reply"
                            className={`${styles.input} border-[0px] rounded-none w-[90%] ml-[3%] !border-b `}
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1"
                            onClick={handleReviewReplySubmit}
                          >
                            submit
                          </button>
                        </div>
                      )}

                      {item.commentReplies.map((i: any, index: number) => (
                        <>
                          <div className="w-full flex 800px:ml-16 my-5">
                            <div className="w-[50px] h-[50px]">
                              <Image
                                src={
                                  i.user.avatar
                                    ? i.user.avatar.url
                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>
                            <div className="pl-2">
                              <h5 className="text-[20px]">{i.user.name}</h5>
                              <p>{i.comment}</p>
                              <small className="text-[#ffffff83]">
                                {format(i.createdAt)} •
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={
              item?.user?.avatar
                ? item.user?.avatar.url
                : "/images/Profile.webp"
            }
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full w-10 h-10 object-cover"
          />
          <div className="pl-3">
            <h5 className="text-lg font-Poppins text-black dark:text-white">
              {item.user.name}
            </h5>
            <p className="text-black dark:text-white">{item.question}</p>
            <small className="text-black dark:text-white">
              {!item.createdAt ? "" : format(item.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2 "
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-black dark:text-white"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-slate-500 ">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any, index: any) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={index}
              >
                <div className="">
                  <Image
                    src={
                      item?.user?.avatar
                        ? item.user?.avatar.url
                        : "images/Progile.webp"
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-lg font-Poppins text-black dark:text-white">
                      {item.user.name}
                    </h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled
                        size={20}
                        className="text-black dark:text-white ml-2"
                      />
                    )}
                  </div>
                  <p className="text-black dark:text-white">{item.answer}</p>
                  <small className="text-black dark:text-white">
                    {!item.createdAt ? "" : format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-white border-black text-black dark:text-white p-[5px] w-[95%] "
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={!answer || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
