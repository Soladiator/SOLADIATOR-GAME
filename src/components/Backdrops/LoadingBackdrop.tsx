import Backdrop from "@mui/material/Backdrop";
import { SpinningLogo } from "../SpinningLogo";

export function LoadingBackdrop({ text = "Loading" }: { text?: string }) {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <div className="overflow-visible flex-col flex gap-y-7 w-[320px] text-white">
        <SpinningLogo size={"100px"} />

        <div className="flex justify-center gap-x-6">
          <h3 className="font-serif font-medium text-lg sm:text-2xl">{text}</h3>
          <div className="dot-flashing self-center flex"></div>
        </div>
      </div>
    </Backdrop>
  );
}
