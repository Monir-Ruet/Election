import { CreateElectionForm } from "@/components/create/create-election-form"
import axios from "axios";

export default function CreateElection() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create New Election</h1>
          <p className="mt-2 text-gray-600">Set up a new decentralized election with custom settings</p>
        </div>

        <CreateElectionForm />
      </div>
    </div>
  )
}
