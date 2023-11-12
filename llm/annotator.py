import asyncio
from openai import AsyncOpenAI
import time
import cv2
import base64
import json
import sys

api_key = "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"
client = AsyncOpenAI(api_key=api_key)

DURATION = 30
SELECTED_FPS = 1
SYSTEM_PROMPT = """
You are a public speaking coach. You are coaching a client who will be giving a presentation. 
You will give concise feedback about specific improvements they can make to their presentation.
You will be given a transcript and frames from the video of the presentation.
Do not comment on enunciation, pronunciation, or audio tone because that will not be available to you.
"""
USER_PROMPT = """
{context} Please critique and evaluate this short excerpt of my presentation. 
Please be concise and keep your output to 50 words or less. 
The transcript may be cutoff in the middle of a sentence, so don't worry about unfinished sentences.
Here is the transcript and video.

Transcript: \"""
{selected_transcript}
\"""
"""


def split_transcripts(transcript) -> list[str]:
    splits = []
    start_time = 0

    while start_time < transcript.duration:
        if transcript.duration - start_time < 10:
            print("Video has is less than 10 seconds left, skipping last split.")
            break
        
        segments = transcript.segments
        selected = ""
        for seg in segments:
            if seg["start"] <= start_time + DURATION and seg["end"] >= start_time:
                selected += seg["text"]
        splits.append(selected)
        start_time += DURATION

    return splits


def split_frames(frames: list[bytes], fps: int) -> list[list[bytes]]:
    splits = []
    start_time = 0

    while start_time < len(frames) / fps:
        selected = frames[
            start_time * fps : (start_time + DURATION) * fps : fps // SELECTED_FPS
        ]
        splits.append(selected)
        start_time += DURATION

    return splits


async def get_transcript(audio_link: str):
    print(f"generating transcript at {time.strftime('%X')}")

    audio_file = open(audio_link, "rb")
    transcript = await client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="verbose_json",
    )

    print(f"finished transcript at {time.strftime('%X')}")

    return transcript


def parse_video(video_link: str) -> tuple[list[bytes], int]:
    print(f"started parsing video {time.strftime('%X')}")

    video = cv2.VideoCapture(video_link)

    base64Frames = []
    fps = int(video.get(cv2.CAP_PROP_FPS))

    while video.isOpened():
        success, frame = video.read()
        if not success:
            break
        
        _, buffer = cv2.imencode(".jpg", frame)
        base64Frames.append(base64.b64encode(buffer).decode("utf-8"))

    video.release()

    print(f"finished parsing video {time.strftime('%X')}")

    return base64Frames, fps


async def get_vision_completion(
    frames: list[bytes], context: str, transcript: str
) -> str:
    data_uris = [f"data:image/jpeg;base64,{f}" for f in frames]

    image_dicts = [
        {"type": "image_url", "image_url": {"url": data_uri, "detail": "low"}}
        for data_uri in data_uris
    ]

    prompt_messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        },
        {
            "role": "user",
            "content": [
                USER_PROMPT.format(context=context, selected_transcript=transcript),
                *image_dicts,
            ],
        },
    ]

    params = {
        "model": "gpt-4-vision-preview",
        "messages": prompt_messages,
        "max_tokens": 200,
    }

    result = await client.chat.completions.create(**params)
    return result.choices[0].message.content


async def get_annotations(video_link: str, transcript, context: str) -> list[str]:
    # TODO: figure out how audio is going to be sent
    transcript_list = split_transcripts(transcript)

    video_frames, fps = parse_video(video_link)

    frame_list = split_frames(video_frames, fps)

    if len(frame_list) != len(transcript_list):
        print("Warning: number of frames and transcripts do not match")
        print(f"Number of frames: {len(frame_list)}")
        print(f"Number of transcripts: {len(transcript_list)}")

    data = zip(frame_list, transcript_list)

    print(f"started generating annotations {time.strftime('%X')}")

    tasks = [
        get_vision_completion(frames, context, transcript)
        for frames, transcript in data
    ]

    result = await asyncio.gather(*tasks)

    print(f"finished generating annotations {time.strftime('%X')}")

    return result


# FILTER_PROMPT_1 = """
# Can you rewrite these paragraphs using a conversational tone by only including the suggestions that each paragraph makes?

# Please use this format for your output:
# \"""
# {{paragraph 1}}

# {{paragraph 2}}

# {{paragraph 3}}
# \"""

# Here are the paragraphs:
# \"""
# {annotations}
# \""
# """

FILTER_PROMPT_2 = """
Can you edit each of these paragraphs by removing any duplicate information between them? 
For example, if two paragraphs mention the same thing, only include it once.
Also remove any overall or general feedback.

Please use this format for your output and keep each paragraph separate:
\"""
{{paragraph 1}}
{{paragraph 2}}
{{paragraph 3}}
continue...
\"""

Here are the paragraphs:
\"""
{annotations}
\"""
"""


async def filter_annotations(annotations: list[str]) -> list[str]:
    print(f"started filtering annotations {time.strftime('%X')}")

    # messages = [{"role": "system", "content": "You are a helpful assistant."}]
    # messages.append(
    #     {
    #         "role": "user",
    #         "content": FILTER_PROMPT_1.format(annotations="\n\n".join(annotations)),
    #     }
    # )

    # first_filter_result = await client.chat.completions.create(
    #     model="gpt-3.5-turbo-1106",
    #     messages=messages,
    # )

    # first_filter_result = clean_output(first_filter_result.choices[0].message.content)

    first_filter_result = "\n\n".join(annotations)

    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    messages.append(
        {
            "role": "user",
            "content": FILTER_PROMPT_2.format(annotations=first_filter_result),
        }
    )

    second_filter_result = await client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
    )

    output = clean_output(second_filter_result.choices[0].message.content).split("\n\n")

    print(f"finished filtering annotations {time.strftime('%X')}")

    return output


def clean_output(text: str) -> str:
    return text.replace('"""', "")


SUMMARY_PROMPT = """
I just did a presentation and received a lot of feedback! Can you summarize this feedback to these five metrics? 

Content, Reasoning, Organization, Style, Mechanics

You can also add extra feedback either based on the summary or by looking through the transcript of my presentation. 
Don't mention the transcript specifically in the summary. 
Please use a conversational but professional tone.

Here are some metrics to use (ignore non-applicable bullet points):
Content
-Accuracy and originality of facts and evidence presented (both orally and visually)
-Adequacy and persuasiveness of presentation relative to topics covered
-Use of appropriate range and quantity of sources, clear identification of sources
Reasoning
-Clarity and memorability of key points
-Connections between facts and theories, critical evaluation of evidence
-Separation of facts from opinions, consideration of alternative viewpoints
Organization
-Orderliness, clear citation of sources
-Purposefulness, clear identification of topics to be addressed
-Smoothness of flow
Style
-Engagement and vigor (holding audience's attention)
-Facilitation of discussion (posing of questions to audience)
-Responsiveness to audience's questions
-Spontaneity (sparing use of notes, with no reading aloud)
Mechanics
-Eye contact with entire audience, facial expressiveness
-Fluency (complete sentences, with no filled pauses (uh, like, well, okay?)
-Hand and arm gestures, body movement, with no fidgeting
-Use of visual aids (chalkboard, computer graphics, etc.)
-Voice control (pitch, loudness, speed, clear enunciation)

transcript:
\"""
{transcript}
\"""

annotations:
\"""
{annotations}
\"""
"""

SCORE_PROMPT = """
Could you also give me a score out of 100 for each of the five categories (Content, Reasoning, Organization, Style, Mechanics)? Please use the same metrics as before. 

Only output the scores and format as a json object.
"""


async def generate_summary(annotations: list[str], transcript) -> str:
    print(f"started generating summary {time.strftime('%X')}")

    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    messages.append(
        {
            "role": "user",
            "content": SUMMARY_PROMPT.format(
                transcript=transcript.text, annotations="\n\n".join(annotations)
            ),
        }
    )

    summary = await client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
        temperature=0,
    )

    summary = summary.choices[0].message.content
    summary = summary.split("\n")
    summary = "\n".join(summary[1:])

    messages.append({"role": "assistant", "content": summary})
    messages.append(
        {
            "role": "user",
            "content": SCORE_PROMPT,
        }
    )

    score = await client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
    )

    score = score.choices[0].message.content
    score = score.replace("```json\n", "").replace("\n```", "")
    score = json.loads(score)

    print(f"finished generating summary {time.strftime('%X')}")

    return summary, score


def generate_json(
    filtered_annotations: list[str], transcript, summary: str, score: dict
):
    output_dict = {}
    start_time = 0
    for line in filtered_annotations:
        selected_transcript = ""

        for seg in transcript.segments:
            if seg["start"] >= start_time and start_time + DURATION >= seg["start"]:
                selected_transcript += seg["text"]

        output_dict[f"{start_time}-{start_time + DURATION}"] = {
            "feedback": line,
            "transcript": selected_transcript,
        }

        start_time += DURATION

    output_dict["summary"] = summary
    output_dict["score"] = score

    return output_dict


async def main() -> None:
    context = sys.argv[2]

    video_link = sys.argv[1]
    audio_link = video_link

    # transcript = await get_transcript(audio_link)
    # annotations = await get_annotations(video_link, transcript, context)
    parse_video(video_link)

    # filtered_annotations = await filter_annotations(annotations)
    # summary, score = await generate_summary(annotations, transcript)

    # print(
    #     generate_json(
    #         filtered_annotations,
    #         transcript,
    #         summary,
    #         score,
    #     )
    # )


# asyncio.run(main())
