"use client";

import { useState, useRef, useEffect } from "react";

export default function ViewResult({ params }) {
  const url = "/compressed.mp4"; // updated to have fid
  const data = {
    timestamps: {
      "0-30": {
        feedback:
          "\nThe visual model is a great tool for engagement. Consider varying your hand movements to maintain viewer interest. Clearly pointing to each part while mentioning it will enhance understanding.",
        transcript:
          " As it goes closer to the brain, it expands and swells and becomes the brain stem. At the top of the brain stem sits the thalamus, and right under the thalamus lies the hypothalamus, hypo meaning under or lower, and under the hypothalamus is the pituitary gland.",
      },
      "30-60": {
        feedback:
          "Ensure clear labeling and pointing accuracy when referring to brain parts. Slow down and elaborate on the function of each structure as you point to it. ",
        transcript:
          " Going around from both sides of the thalamus is the hippocampus that extends out to the front of the brain, and at the front ends of the brain is the amygdala, and on the other",
      },
      "60-90": {
        feedback:
          "Consider using more descriptive language to enhance verbal visualization. Orient the model towards the audience when speaking about specific parts. Pause briefly between topics for clarity. Maintain eye contact rather than looking at the model too often.",
        transcript:
          " side inside the temporal lobe lies the other hippocampus and amygdala pair. So for the lobes, at the front you have the frontal lobe, and at the top the parietal lobe, and at the back the occipital lobe. The bottom, the yellow, is the temporal lobe. For the cortexes, the cortex in the frontal lobe is the motor cortex, and that sits at",
      },
      "90-120": {
        feedback:
          "I'm sorry, but you did not provide a transcript. If you still need assistance with your presentation, please provide the text along with the images.\n",
        transcript:
          " the end of the frontal lobe. At the front of the parietal lobe sits the sensory cortex, and these two cortexes border each other. Lastly we have the cerebellum, which is under all the lobes and sits behind the brain stem.",
      },
    },
    summary:
      "\n**Content:**\nYour presentation included accurate and original facts about the brain's anatomy. The visual aids were effective in engaging the audience, but there's room to enhance the persuasiveness by elaborating on the function of each brain structure. Ensuring that all sources are clearly identified will also strengthen the content.\n\n**Reasoning:**\nThe key points about the brain's anatomy were clear, but memorability could be improved with the addition of more critical evaluation or interesting facts about each structure. Consider discussing the implications or functions of the brain parts in more depth to create stronger connections between facts and theories.\n\n**Organization:**\nThe structure of your presentation was orderly, but you could improve by slowing down between topics and ensuring a smooth flow. Clear citation of sources, if used, would also enhance the organization. Make sure to pause briefly between topics to help the audience digest the information.\n\n**Style:**\nYour presentation style was engaging, but you could facilitate more discussion by posing questions to the audience. Responsiveness to the audience's questions was not mentioned, so ensure you're attentive to any queries. Spontaneity could be improved by reducing reliance on notes or the model itself.\n\n**Mechanics:**\nHand and arm gestures were used effectively, but consider varying them to maintain viewer interest. Eye contact could be improved by looking at the audience more rather than the model. Fluency was good, but make sure to use complete sentences and avoid filled pauses. Voice control was not specifically mentioned, but always aim for clear enunciation and appropriate volume.\n\n**Additional Feedback:**\nMake sure your visual aids are steady, visible, and all labels are readable. Orient the model towards the audience when discussing specific parts, and use more descriptive language to enhance verbal visualization. Maintain steady hand movements and ensure you're clearly pointing to each part as you mention it to help the audience follow along.\n\nOverall, it seems like you have a solid foundation for your presentations, with just a few areas to refine for even greater impact. Keep up the good work!",
    score: {
      Content: 85,
      Reasoning: 80,
      Organization: 82,
      Style: 78,
      Mechanics: 83,
    },
  };
  const timestamps = data.timestamps;
  const [frame, setFrame] = useState(0);
  const videoRef = useRef(null);
  const handleTimeChange = (e) => {
    if (videoRef.current) {
      setFrame(videoRef.current.currentTime);
    }
  };
  return (
    <div>
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeChange}
        controls
        className="h-[480px]"
      >
        <source src={url} />
      </video>
      <div>
        {Object.keys(timestamps).map((key) => {
          const nums = key.split("-");
          const x = parseInt(nums[0]);
          const y = parseInt(nums[1]);
          return (
            <span
              key={key}
              className={`${frame >= x && frame < y ? "bg-yellow-200" : null}`}
            >
              {timestamps[key].transcript}
            </span>
          );
        })}
      </div>
      <div>
        {JSON.stringify(
          Object.keys(timestamps).filter((key) => {
            const nums = key.split("-");
            const x = parseInt(nums[0]);
            const y = parseInt(nums[1]);
            return x >= frame && frame < y;
          })[0].feedback
        )}
      </div>
    </div>
  );
}
