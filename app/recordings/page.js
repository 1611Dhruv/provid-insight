import DataTable from "@/components/DataTable";

const generateMockData = () => {
  const data = [];

  for (let i = 1; i <= 10; i++) {
    data.push({
      srNo: i,
      uploadTime: new Date().toLocaleString(),
      filename: `file_${i}.txt`,
      score: Math.floor(Math.random() * 100),
      description: `Description for item ${i}`,
    });
  }

  return data;
};

export default function RecordingsList() {
  return (
    <div className="mt-20">
      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex mb-14">
        <div className="card flex w-96 bg-base-100 shadow-xl mx-4 mb-7">
          <figure><img src="/bg.jpg" alt="video thumbnail"/></figure>
          <div className="card-body">
            <h2 className="card-title">File Name</h2>
            <p className="font-bold">Upload time: </p>
            <p className = "font-light">Life is a kaleidoscope of experiences, a symphony of moments that weave together to form the intricate tapestry of our existence.</p>
            <div className="grid grid-cols-2 relative">
              <div className="justify-start">
              <span className="absolute bottom-0 left-0 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Score/100</span>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-accent">Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <DataTable data={generateMockData()} />
    </div>
  );
}
