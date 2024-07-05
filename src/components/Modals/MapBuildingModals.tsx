import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Area } from "@/constants/Map";
import Image from "next/image";
import { DialogContent } from "@mui/material";

const MapBuildingModal = ({
  selectedArea,
  setArea,
}: {
  selectedArea: Area;
  setArea: (param: any) => void;
}) => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative w-full h-full z-[15]"
        onClose={() => {
          setArea(null);
        }}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-hidden">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Image
              src="/icons/cross.svg"
              alt="round"
              width={64}
              height={64}
              className="absolute top-4 right-3 cursor-pointer"
              onClick={() => {
                setArea(null);
              }}
            />
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full transform h-full transition-all">
                <div className="px-5 py-3 rounded-[20px] relative text-white h-full">
                  <DialogTitle className="text-base font-bold py-2 leading-[21.6px] text-center text-primary mb-2">
                    {selectedArea.title}
                  </DialogTitle>
                  <DialogContent>{selectedArea.content}</DialogContent>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MapBuildingModal;
