import { useUser } from "../contexts/userContext";

export const Dashboard = () => {
  const { user, loading } = useUser();

  return (
        <main className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {loading || !user ? (
                <p>Loading...</p>
            ) : (
                <p>Welcome, {user.first_name} {user.last_name}! Here you can manage your courses, students, and view analytics.</p>
            )}
        </main>
  );
}
