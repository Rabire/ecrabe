import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "jdoe1961@gmail.com",
    phone: "514-555-5555",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janed@gmail.com",
    phone: "514-555-5555",
  },
  {
    id: 3,
    name: "John Smith",
    email: "jsmith69@gmail.com",
    phone: "514-555-5555",
  },
];
const Home = () => {
  return (
    <div className="w-4/5 p-4">
      <h1>Mes étudiants</h1>
      <div>
        <Table>
          <TableCaption>Liste des étudiants</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Link to={`/students/${student.id}`}>{student.name}</Link>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
