import { Input } from "@/components/ui/Input";

export const StudentSearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search students...",
}) => {
  return (
    <div className="w-full sm:w-80">
      <Input
        type="search"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={placeholder}
        aria-label="Search students"
      />
    </div>
  );
};
