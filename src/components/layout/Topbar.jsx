import { Button } from "@/components/ui";

export const Topbar = () => {
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
          Instructor Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Monitor student risk indicators
        </p>
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
          DH
        </div>
      </div>
    </header>
  )
}