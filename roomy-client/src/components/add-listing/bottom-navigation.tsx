// "use client";

// import { setStep } from "@/store/slices/add-listing";
// import { useAppSelector } from "@/store/store";
// import { cn } from "@/utils/cn";
// import { useDispatch } from "react-redux";

// export const BottomNavigation: React.FC = () => {
//   const dispatch = useDispatch();
//   const step = useAppSelector((state) => state.addListingSlice.step);

//   const prevStep = () => {
//     dispatch(setStep(step - 1));
//   };

//   const nextStep = () => {
//     dispatch(setStep(step + 1));
//   };
//   return (
//     <div
//       className={cn(
//         "mt-auto flex items-center bg-white p-4 lg:px-24",
//         step > 0 ? "justify-between" : "justify-end"
//       )}
//     >
//       {step > 0 && (
//         <button
//           type="button"
//           onClick={prevStep}
//           className="font-medium text-cool-gray transition-colors hover:text-marine-blue focus:text-marine-blue"
//         >
//           Go Back
//         </button>
//       )}
//       <button
//         type={"button"}
//         onClick={step.confirm ? confirm : nextStep}
//         className={cn(
//           "rounded-lg px-6 py-3 font-medium text-white transition-colors",
//           step.confirm
//             ? "bg-purplish-blue hover:bg-marine-blue focus:bg-marine-blue"
//             : "bg-marine-blue hover:bg-purplish-blue focus:bg-purplish-blue"
//         )}
//       >
//         {step.confirm ? "Confirm" : "Next Step"}
//       </button>
//     </div>
//   );
// };
