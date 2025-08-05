"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Vote } from "lucide-react"
import ResultChart from "./result-chart"

const mockResults = [
  {
    id: 1,
    title: "Student Council President 2024",
    status: "active",
    totalVotes: 279,
    candidates: [
      { name: "Alice Johnson", votes: 89, percentage: 31.9 },
      { name: "Bob Smith", votes: 76, percentage: 27.2 },
      { name: "Carol Davis", votes: 69, percentage: 24.7 },
      { name: "David Wilson", votes: 45, percentage: 16.1 },
    ],
  }
]

export function ResultsDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Elections</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Elections</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Vote className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Votes</p>
                <p className="text-2xl font-bold">8,492</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Participation</p>
                <p className="text-2xl font-bold">67%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <ResultChart />
    </div>
  )
}
