import { ElectionListSection } from "./_components/election-section";
import { CreateElectionForm } from "./_components/create-election-modal";

export default function CreateElection() {
    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <CreateElectionForm election={undefined} />
            <ElectionListSection />
        </div>
    )
}