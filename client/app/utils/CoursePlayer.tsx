import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl, title }: Props) => {
  const [videoData, setVideoData] = useState({ otp: "", playbackInfo: "" });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=cWCymlSPC634KPdV`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
