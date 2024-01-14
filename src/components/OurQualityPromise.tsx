import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { QUALITY_PROMISE } from "@/config";

export function OurQualityPromise() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="border-2  border-blue-950" variant="outline">
          Our quality promise &rarr;
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            How Does digitalHome Ensure the Highest Quality Standards for
            Digital Assets?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ul className="flex flex-col gap-y-2 text-left">
              {QUALITY_PROMISE.map((item, i) => {
                return (
                  <li key={i}>
                    <span className="font-bold text-sm text-gray-300">
                      {item.label}
                    </span>
                    {item.value}
                  </li>
                );
              })}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
