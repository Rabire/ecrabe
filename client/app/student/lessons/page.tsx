import LessonCard from "@/components/lesson-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2Icon } from "lucide-react";

const LibraryPage = () => (
  <main>
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <h1>Vos formations</h1>

      <div className="flex gap-2">
        <Button variant="outline" className="h-9">
          <Settings2Icon size={16} />
          <span>Filtres</span>
        </Button>

        <Input placeholder="Rechercher..." className="h-9" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {MOCK_FORMATIONS.map((lesson) => (
        <LessonCard lesson={lesson} />
      ))}
    </div>
  </main>
);

export default LibraryPage;

const MOCK_FORMATIONS = [
  {
    id: "1",
    title: "Introduction à la programmation",
    description: "Apprenez les bases de la programmation en utilisant Python.",
    pictureUrl: "https://example.com/images/intro-to-programming.jpg",
    teacher: {
      id: "101",
      firstName: "Alice",
      lastName: "Dupont",
    },
    userProgress: 20,
  },
  {
    id: "2",
    title: "Algorithmes avancés",
    description: "Explorez des algorithmes avancés et leurs applications.",
    pictureUrl: "https://example.com/images/advanced-algorithms.jpg",
    teacher: {
      id: "102",
      firstName: "Bob",
      lastName: "Martin",
    },
    userProgress: 50,
  },
  {
    id: "3",
    title: "Développement Web",
    description:
      "Créez des sites web interactifs avec HTML, CSS et JavaScript.",
    pictureUrl: "https://example.com/images/web-development.jpg",
    teacher: {
      id: "103",
      firstName: "Charlie",
      lastName: "Leroy",
    },
    userProgress: 75,
  },
  {
    id: "1",
    title: "Introduction à la Philosophie",
    description:
      "Découvrez les concepts de base et les grands penseurs de la philosophie occiden'tale.",
    pictureUrl: "https://example.com/images/introduction-to-philosophy.jpg",
    teacher: {
      id: "201",
      firstName: "Jean",
      lastName: "Martin",
    },
    userProgress: 40,
  },
  {
    id: "2",
    title: "Histoire de l'Art",
    description:
      "Étudiez les périodes importantes et les chefs-d'œuvre de l'histoire de l'art.",
    pictureUrl: "https://example.com/images/history-of-art.jpg",
    teacher: {
      id: "202",
      firstName: "Marie",
      lastName: "Dubois",
    },
    userProgress: 60,
  },
  {
    id: "3",
    title: "Physique Quantique",
    description:
      "Apprenez les principes fondamentaux de la physique quantique et leurs implications.",
    pictureUrl: "https://example.com/images/quantum-physics.jpg",
    teacher: {
      id: "203",
      firstName: "Luc",
      lastName: "Lefebvre",
    },
    userProgress: 30,
  },
  {
    id: "4",
    title: "Cuisine Française",
    description:
      "Découvrez les techniques et les recettes classiques de la cuisine française.",
    pictureUrl: "https://example.com/images/french-cuisine.jpg",
    teacher: {
      id: "204",
      firstName: "Claire",
      lastName: "Durand",
    },
    userProgress: 80,
  },
  {
    id: "5",
    title: "Yoga pour Débutants",
    description:
      "Apprenez les bases du yoga pour améliorer votre flexibilité et votre bien-être.",
    pictureUrl: "https://example.com/images/yoga-for-beginners.jpg",
    teacher: {
      id: "205",
      firstName: "Emma",
      lastName: "Moreau",
    },
    userProgress: 70,
  },
];
