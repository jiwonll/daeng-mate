import { cn } from "@/lib/utils";

type LandingIntroProps = {
  image: string;
  title: string;
  description: string;
  imageClassName?: string;
};

export default function LandingIntro({
  image,
  title,
  description,
  imageClassName,
}: LandingIntroProps) {
  return (
    <div className="border-3 rounded-2xl p-1 text-center">
      <img
        src={image}
        alt={title}
        className={cn("mx-auto h-40 w-40 object-contain", imageClassName)}
      />
      <h3 className="mt-2 font-jua text-2xl">{title}</h3>
      <p className="mt-2 text-base font-jua leading-6 text-muted-foreground mb-2">
        {description}
      </p>
    </div>
  );
}
