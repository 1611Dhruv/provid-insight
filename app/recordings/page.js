import DataTable from "@/components/DataTable";

const generateMockData = () => {
  const data = [];

  for (let i = 1; i <= 10; i++) {
    data.push({
      serial: i,
      uploadTime: new Date().toLocaleString(),
      filename: `file_${i}.txt`,
      score: Math.floor(Math.random() * 100),
      description: `Description for item ${i}`,
      fid: "iufanwcmyawoidufmyasodiufyn",
    });
  }

  return data;
};

export default function RecordingsList() {
  return (
    <div>
      <DataTable data={generateMockData()} />
    </div>
  );
}
