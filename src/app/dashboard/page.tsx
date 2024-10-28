import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Resume Score Card */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-2">Resume Score</h3>
          <div className="text-3xl font-bold">85/100</div>
        </div>

        {/* Job Match Progress */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-2">Job Matches</h3>
          <div className="text-3xl font-bold">12</div>
        </div>

        {/* Interview Sessions */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-2">Mock Interviews</h3>
          <div className="text-3xl font-bold">5</div>
        </div>

        {/* Expected Salary */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-2">Target Salary</h3>
          <div className="text-3xl font-bold">$85K</div>
        </div>
      </div>
      <div className="space-y-4">
        {/* Resume Analysis Report */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Resume Analysis Report</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: 2024-03-20
              </p>
            </div>
            <Button>
              {/* <DownloadIcon className="mr-2 h-4 w-4" /> */}
              Download
            </Button>
          </div>
        </div>

        {/* Job Recommendations */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Job Matches Report</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: 2024-03-20
              </p>
            </div>
            <Button>
              {/* <DownloadIcon className="mr-2 h-4 w-4" /> */}
              Download
            </Button>
          </div>
        </div>

        {/* Interview Performance */}
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Interview Performance Report</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: 2024-03-20
              </p>
            </div>
            <Button>
              {/* <DownloadIcon className="mr-2 h-4 w-4" /> */}
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
