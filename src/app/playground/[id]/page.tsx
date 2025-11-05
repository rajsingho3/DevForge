import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import PlaygroundClient from "@/components/playground/playground-client";

interface PlaygroundPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlaygroundPage({ params }: PlaygroundPageProps) {
  const { id } = await params;
  const session = await auth();
  
  if (!session?.user?.id) {
    return notFound();
  }

  const playground = await db.playground.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  if (!playground) {
    return notFound();
  }

  // Check if user owns this playground
  if (playground.userId !== session.user.id) {
    return notFound();
  }

  return (
    <PlaygroundClient
      playground={{
        id: playground.id,
        title: playground.title,
        description: playground.description || "",
        template: playground.template,
        createdAt: playground.createdAt,
        updatedAt: playground.updatedAt,
      }}
    />
  );
}
