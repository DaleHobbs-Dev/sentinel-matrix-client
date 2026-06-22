import { Layout } from "@/components/ui";

export const Dashboard = () => {
  return (
    <Layout>
        <main className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the Dashboard! Here you can manage your courses, students, and view analytics.</p>
        </main>
    </Layout>
  );
}