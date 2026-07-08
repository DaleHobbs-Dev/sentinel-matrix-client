import { PageHeader } from "@/components/ui/PageHeader"
import { StudentSearchBar } from "./StudentSearchBar"

export const StudentDirectoryHeader = ({ searchTerm, onSearchChange }) => {

    return (
        <PageHeader
            title="Student Directory"
            description="View student enrollment, prior standing, and academic risk status."
            actions={
                <StudentSearchBar
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                />
            }
        />
    )
}
