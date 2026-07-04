import { Button, Spinner, Text } from "@/components";
import { useUser } from "@/contexts/userContext";
import { matchPath, useLocation } from "react-router-dom";

const topbarTitles = [
  { path: "/courses/new", title: "Create a New Course" },
  { path: "/courses/courselisteditor", title: "Manage Course Status" },
  { path: "/courses/:courseId/edit", title: "Edit Course" },
  { path: "/courses/:courseId", title: "Course Details" },
  { path: "/courses", title: "Courses" },
  { path: "/dashboard", title: "Instructor Dashboard" },
  { path: "/", title: "Instructor Dashboard" },
];

export const Topbar = () => {
  const { user } = useUser();
  const { pathname } = useLocation();
  const title = topbarTitles.find(route =>
    matchPath({ path: route.path, end: true }, pathname)
  )?.title ?? "Sentinel Matrix";

  if (!user) {
    return (
      <header
        className="
          flex items-center justify-between
          border-b border-slate-200
          bg-white px-6 py-4
        "
      >
        <div>
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <Text variant="subtle">
            Monitor student risk indicators
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" disabled>
            New Intervention
          </Button>

          <div
            className="
              flex h-10 w-10 items-center
              justify-center rounded-full
              bg-[#005C72] text-white
            "
          >
            <Spinner size="sm" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className="
        flex items-center justify-between
        border-b border-slate-200
        bg-white px-6 py-4
      "
    >
      <div>
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <Text variant="subtle">
          Monitor student risk indicators
        </Text>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">
          New Intervention
        </Button>

        <div
          className="
            flex h-10 w-10 items-center
            justify-center rounded-full
            bg-[#005C72] text-white
          "
        >
          {user ? `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}` : ""}
        </div>
      </div>
    </header>
  )
}
