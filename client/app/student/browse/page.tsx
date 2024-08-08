import LessonCard from "@/components/lesson-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2Icon } from "lucide-react";

const BrowsePage = () => (
  <main>
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <h1>Parcourir les formations</h1>

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

export default BrowsePage;

const MOCK_FORMATIONS = [
  {
    id: "1",
    title: "Introduction à la programmation",
    description: "Apprenez les bases de la programmation en utilisant Python.",
    pictureUrl:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "101",
      firstName: "Alice",
      lastName: "Dupont",
    },
    userProgress: 0,
    isPurchasedByCurrentUser: false,
  },
  {
    id: "2",
    title: "Algorithmes avancés",
    description: "Explorez des algorithmes avancés et leurs applications.",
    pictureUrl:
      "https://images.unsplash.com/photo-1483817101829-339b08e8d83f?q=80&w=3204&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "102",
      firstName: "Bob",
      lastName: "Martin",
    },
    userProgress: 50,
    isPurchasedByCurrentUser: true,
  },
  {
    id: "3",
    title: "Développement Web",
    description:
      "Créez des sites web interactifs avec HTML, CSS et JavaScript.",
    pictureUrl:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "103",
      firstName: "Charlie",
      lastName: "Leroy",
    },
    userProgress: 75,
    isPurchasedByCurrentUser: true,
  },
  {
    id: "1",
    title: "Introduction à la Philosophie",
    description:
      "Découvrez les concepts de base et les grands penseurs de la philosophie occiden'tale.",
    pictureUrl:
      "https://images.unsplash.com/photo-1483817101829-339b08e8d83f?q=80&w=3204&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "201",
      firstName: "Jean",
      lastName: "Martin",
    },
    userProgress: 0,
    isPurchasedByCurrentUser: true,
  },
  {
    id: "2",
    title: "Histoire de l'Art",
    description:
      "Étudiez les périodes importantes et les chefs-d'œuvre de l'histoire de l'art.",
    pictureUrl:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "202",
      firstName: "Marie",
      lastName: "Dubois",
    },
    userProgress: 0,
    isPurchasedByCurrentUser: false,
  },
  {
    id: "3",
    title: "Physique Quantique",
    description:
      "Apprenez les principes fondamentaux de la physique quantique et leurs implications.",
    pictureUrl:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "203",
      firstName: "Luc",
      lastName: "Lefebvre",
    },
    userProgress: 30,
    isPurchasedByCurrentUser: true,
  },
  {
    id: "4",
    title: "Cuisine Française",
    description:
      "Découvrez les techniques et les recettes classiques de la cuisine française.",
    pictureUrl:
      "https://images.unsplash.com/photo-1483817101829-339b08e8d83f?q=80&w=3204&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "204",
      firstName: "Claire",
      lastName: "Durand",
    },
    userProgress: 80,
    isPurchasedByCurrentUser: true,
  },
  {
    id: "5",
    title: "Yoga pour Débutants",
    description:
      "Apprenez les bases du yoga pour améliorer votre flexibilité et votre bien-être.",
    pictureUrl:
      "https://images.unsplash.com/photo-1483817101829-339b08e8d83f?q=80&w=3204&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teacher: {
      id: "205",
      firstName: "Emma",
      lastName: "Moreau",
    },
    userProgress: 0,
    isPurchasedByCurrentUser: false,
  },
];
