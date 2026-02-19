import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpertsTab } from "./_components/ExpertsTab";
import { ParticipantsTab } from "./_components/ParticipantsTab";
import { EventsTab } from "./_components/EventsTab";
import { ResourcesTab } from "./_components/ResourcesTab";

export default function ExplorarPage() {
  const participantsEnabled =
    process.env.NEXT_PUBLIC_PARTICIPANTS === "true";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Explorar
      </h1>
      <p className="text-muted-foreground mt-2">
        Expertos, eventos, recursos y participantes del Hub.
      </p>
      <Tabs defaultValue="expertos" className="mt-8">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
          <TabsTrigger value="expertos">Expertos</TabsTrigger>
          {participantsEnabled && (
            <TabsTrigger value="participantes">Participantes</TabsTrigger>
          )}
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
        </TabsList>
        <TabsContent value="expertos" className="mt-6">
          <ExpertsTab />
        </TabsContent>
        {participantsEnabled && (
          <TabsContent value="participantes" className="mt-6">
            <ParticipantsTab />
          </TabsContent>
        )}
        <TabsContent value="eventos" className="mt-6">
          <EventsTab />
        </TabsContent>
        <TabsContent value="recursos" className="mt-6">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
