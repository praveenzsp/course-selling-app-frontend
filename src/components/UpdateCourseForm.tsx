
function UpdateCourseForm() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Update course details</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Course name"
          className="py-2 px-2 rounded-md"
        />
        <textarea
          placeholder="Course description"
          className="py-2 px-2 rounded-md bg-blue-900"
        />
        <button className="py-2 px-2 bg-green-500 rounded-md">
          Update course
        </button>
      </form>
    </div>
  );
}

export default UpdateCourseForm;
