import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Skeleton para la ficha de experto. Se muestra mientras el Server Component
 * resuelve params y getExpertById(id). Evita flash de datos incorrectos.
 */
export default function ExpertDetailLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl shrink-0 animate-pulse bg-muted" />
              <div className="flex-1 min-w-0 space-y-3">
                <div className="h-7 w-3/4 max-w-[240px] rounded-md animate-pulse bg-muted" />
                <div className="h-4 w-1/2 max-w-[160px] rounded-md animate-pulse bg-muted" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-6 w-20 rounded-full animate-pulse bg-muted"
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="h-4 w-24 rounded animate-pulse bg-muted" />
                  <div className="h-4 w-20 rounded animate-pulse bg-muted" />
                  <div className="h-4 w-28 rounded animate-pulse bg-muted" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="h-4 w-full rounded animate-pulse bg-muted" />
                <div className="h-4 w-full rounded animate-pulse bg-muted" />
                <div className="h-4 w-4/5 max-w-[85%] rounded animate-pulse bg-muted" />
              </div>
              <div className="h-4 w-32 rounded animate-pulse bg-muted mt-4" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 min-w-0">
          <Card className="rounded-2xl shadow-sm lg:sticky lg:top-24">
            <CardHeader>
              <div className="h-6 w-32 rounded-md animate-pulse bg-muted" />
              <div className="h-4 w-full rounded-md animate-pulse bg-muted mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-11 w-full rounded-md animate-pulse bg-muted" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
