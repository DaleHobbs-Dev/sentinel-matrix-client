export const EmptyCoursesView = () => {

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-slate-800">No Active Courses Available</h2>
        <p className="text-lg text-slate-600">You currently have no active courses. Click the button above to add a new course.</p>
    </div>
  );
}
