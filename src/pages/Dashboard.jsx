import { useUser } from "../contexts/userContext";
import { PageHeader, Text } from "@/components";

export const Dashboard = () => {
  const { user, loading } = useUser();

  return (
        <main className="flex-1 p-4">
            <PageHeader title="Dashboard" />
            {loading || !user ? (
                <Text>Loading...</Text>
            ) : (
                <Text>Welcome, {user.first_name} {user.last_name}! Here you can manage your courses, students, and view analytics.</Text>
            )}
        </main>
  );
}
