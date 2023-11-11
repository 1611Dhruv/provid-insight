import Recorder from "@/components/VideoRecorder";

export default function RecordingPage() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Recorder />
    </div>
  );
}
