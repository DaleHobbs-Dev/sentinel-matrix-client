import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Text } from "@/components/ui/Text";
import { studentDirectoryColumns } from "../utils/studentTableColumns";

export const StudentList = ({
  students = [],
  columns = studentDirectoryColumns,
  emptyMessage = "No students found.",
  onRowClick,
}) => {
  if (students.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
        <Text variant="muted">{emptyMessage}</Text>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id || student.student_id}
              onClick={onRowClick ? () => onRowClick(student) : undefined}
              className={onRowClick ? "cursor-pointer" : ""}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={
                onRowClick
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRowClick(student);
                      }
                    }
                  : undefined
              }
            >
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render(student)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
