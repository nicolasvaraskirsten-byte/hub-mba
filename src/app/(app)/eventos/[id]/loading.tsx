import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EventDetailLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="h-4 w-24 rounded animate-pulse bg-muted mb-6" />
      <Card className="rounded-2xl shadow-sm max-w-3xl">
        <CardHeader className="space-y-4">
          <div className="h-4 w-48 rounded animate-pulse bg-muted" />
          <div className="h-8 w-3/4 max-w-md rounded animate-pulse bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full animate-pulse bg-muted" />
            <div className="h-6 w-20 rounded-full animate-pulse bg-muted" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-full rounded animate-pulse bg-muted" />
          <div className="h-4 w-4/5 rounded animate-pulse bg-muted" />
          <div className="h-10 w-40 rounded animate-pulse bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
