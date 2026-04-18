import { Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <div className="w-64 h-96">
      <Skeleton variant="rectangular" width={256} height={384} />
    </div>
  );
}
