import { Result } from "@/lib/result";
import { fetchElections } from "@/services/election-service";
import { IElection } from "../_types/election";
import { ElectionType } from "../_types/election-type";
import { ElectionCard } from "./election-card";


export async function ElectionListSection() {
  const runningElections: Result<IElection[]> = await fetchElections(1);
  const archievedElections: Result<IElection[]> = await fetchElections(2);
  const pendingElections: Result<IElection[]> = await fetchElections(3);

  const runningElectionData = runningElections.data;
  const pendingElectionData = pendingElections.data;
  const archievedElectionData = archievedElections.data;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {
        runningElectionData && runningElectionData.length > 0 &&
        (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-semibold text-green-500">Running Elections</h2>
            <ElectionCard data={runningElectionData} type={ElectionType.RUNNING} />
          </div>
        )
      }

      {
        pendingElectionData && pendingElectionData.length > 0 &&
        (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-semibold text-yellow-500">Pending Elections</h2>
            <ElectionCard data={pendingElectionData} type={ElectionType.PENDING} />
          </div>
        )
      }

      {
        archievedElectionData && archievedElectionData.length > 0 &&
        (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-semibold text-red-500">Archieved Elections</h2>
            <ElectionCard data={archievedElectionData} type={ElectionType.ARCHIVED} />
          </div>
        )
      }
    </div>
  );
}
