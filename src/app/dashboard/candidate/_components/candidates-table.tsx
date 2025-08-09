import { ICandidate } from "../types/candidate"

export default function Candidates({
    candidates
}: {
    candidates: ICandidate[]
}) {
    return (
        <table>
            <thead>
                <th>
                    Id
                </th>
                <th>Name</th>
            </thead>
            <tbody>
                {
                    candidates.map((candidate, index) => {
                        return (
                            <tr key={index}>
                                <td>{candidate.id}</td>
                                <td>{candidate.name}</td>
                            </tr>
                        )
                    })
                }
            </tbody>


        </table>
    )
}