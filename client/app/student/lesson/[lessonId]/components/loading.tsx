import { LoadingText } from "@/components/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Loading = () => (
  <>
    <Card>
      <CardContent className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="max-h-52 animate-pulse rounded-lg bg-muted-foreground opacity-20 md:order-last" />

        <CardHeader className="space-y-4">
          <CardTitle>
            <LoadingText />
          </CardTitle>
          <CardDescription>
            <LoadingText charLength={115} />
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>

    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-4">
        <h2>
          <LoadingText />
        </h2>

        <div className="space-y-2">
          <p>
            <LoadingText charLength={40} />
          </p>

          <p>
            <LoadingText charLength={20} />
          </p>
          <LoadingText charLength={35} />
        </div>

        <p>
          <LoadingText charLength={350} />
        </p>

        <h2>
          <LoadingText charLength={20} />
        </h2>

        <p>
          <LoadingText charLength={30} />
        </p>
      </div>

      <div>
        <div className="space-y-4 md:order-last">
          <h2>
            <LoadingText charLength={20} />
          </h2>
          <Card>
            <CardContent className="space-y-0.5 p-2">
              {[30, 45, 50, 35].map((c) => (
                <p>
                  <LoadingText key={c} charLength={c} />
                </p>
              ))}
            </CardContent>
          </Card>{" "}
        </div>
      </div>
    </div>
  </>
);

export default Loading;
