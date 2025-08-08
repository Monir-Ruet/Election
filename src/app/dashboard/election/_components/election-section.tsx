import { ElectionCard } from "@/app/dashboard/election/_components/election-card";
import { ElectionType } from "@/app/dashboard/election/_types/election-type";

const data = [
  {
    id: 6,
    name: "Bangladesh National Election",
    startDate: 1754631900732,
    endDate: 1754631900732,
    description: "Bangladesh National Election organized by bangladesh election commission"
  },
  {
    id: 1,
    name: "Bangladesh National Election",
    startDate: 1754631900732,
    endDate: 1754631900732,
    description: "Bangladesh National Election organized by bangladesh election commission"
  },
  {
    id: 2,
    name: "Bangladesh National Election",
    startDate: 1754631900732,
    endDate: 1754631900732,
    description: "Bangladesh National Election organized by bangladesh election commission"
  },
  {
    id: 3,
    name: "Bangladesh National Election",
    startDate: 1954631900732,
    endDate: 2754631900732,
    description: "Bangladesh National Election organized by bangladesh election commission"
  },
  {
    id: 4,
    name: "Bangladesh National Election",
    startDate: 1754631900732,
    endDate: 1854631900732,
    description: "Bangladesh National Election organized by bangladesh election commission"
  },
  {
    id: 5,
    name: "Bangladesh National Election",
    startDate: 1754631900732,
    endDate: 1854631900732,
    description: "Bangladesh National Election organized by bangladesh election commission"
  }
]

export function ElectionListSection() {
  const runningElections = data.filter((election) => {
    return Date.now() >= election.startDate && Date.now() <= election.endDate;
  });
  const pendingElections = data.filter((election) => {
    return Date.now() < election.startDate;
  });
  const archievedElections = data.filter((election) => {
    return Date.now() > election.endDate;
  });

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {
        runningElections.length > 0 &&
        (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-semibold">Running Elections</h2>
            <ElectionCard data={runningElections} type={ElectionType.RUNNING} />
          </div>
        )
      }

      {
        pendingElections.length > 0 &&
        (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-semibold">Pending Elections</h2>
            <ElectionCard data={pendingElections} type={ElectionType.PENDING} />
          </div>
        )
      }

      {
        archievedElections.length > 0 &&
        (
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-semibold">Archieved Elections</h2>
            <ElectionCard data={archievedElections} type={ElectionType.ARCHIVED} />
          </div>
        )
      }
    </div>
  );
}
