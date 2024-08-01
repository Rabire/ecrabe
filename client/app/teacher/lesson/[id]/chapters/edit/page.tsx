import AddChapterForm from "../add-chapter-form";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // console.log(id);
  return (
    <div>
      <AddChapterForm lessonId={id} />
    </div>
  );
};
export default page;
