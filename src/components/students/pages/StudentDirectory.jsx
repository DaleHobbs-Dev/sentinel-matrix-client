import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "@/services";
import { StudentList, StudentDirectoryHeader, Spinner, Stack, Text } from "@/components";
import { studentMatchesSearch } from "../utils/studentFormatters";

export const StudentDirectory = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
                setError("Unable to load students right now.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter((student) => studentMatchesSearch(student, searchTerm));

    if (isLoading) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <Spinner size="lg" />
                <Text variant="muted">Loading students...</Text>
            </Stack>
        );
    }


  return (
    <Stack className="p-4">
      <StudentDirectoryHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <Text variant="error">{error}</Text>
        </div>
      ) : (
        <StudentList
          students={filteredStudents}
          onRowClick={(student) => navigate(`/students/${student.id}`)}
          emptyMessage={
            searchTerm
              ? "No students match your search."
              : "There are no students to display."
          }
        />
      )}
    </Stack>
  );
}
