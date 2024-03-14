const student = {
  id: 1,
  name: "John Doe",
  email: "",
  phone: "",
  courses: [
    {
      id: 1,
      name: "Mathématiques",
      description: "Cours de mathématiques",
    },
    {
      id: 2,
      name: "Français",
      description: "Cours de français",
    },
  ],
  progress: "50%",
  gradeList: [
    {
      id: 1,
      course: "Mathématiques",
      grade: 80,
    },
    {
      id: 2,
      course: "Français",
      grade: 90,
    },
  ],
};
const StudentProfile = () => {
  return (
    <div>
      <h1>Profil de l'étudiant</h1>
      <div>
        <h2>Informations personnelles</h2>
        <p>Nom: {student.name}</p>
        <p>Email: {student.email}</p>
        <p>Téléphone: {student.phone}</p>
      </div>
      <div>
        <h2>Cours</h2>
        <ul>
          {student.courses.map((course) => (
            <li key={course.id}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Progression</h2>
        <p>{student.progress}</p>
      </div>
      <div>
        <h2>Notes</h2>
        <ul>
          {student.gradeList.map((grade) => (
            <li key={grade.id}>
              <h3>{grade.course}</h3>
              <p>{grade.grade}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentProfile;
