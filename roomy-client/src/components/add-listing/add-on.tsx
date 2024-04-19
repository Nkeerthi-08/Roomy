'use client';

import { type SelectedAddOns, addOns } from '../../constants/add-ons';
import Image from 'next/image';
import { cn } from '../../utils/cn';
import { BottomNavigation, Title } from './ui';

export const AddOn: React.FC<{
  selectedAddOns: SelectedAddOns;
  setSelectedAddOns: React.Dispatch<React.SetStateAction<SelectedAddOns>>;
  isBillingMonthly: boolean;
  prevStep: () => void;
  nextStep: () => void;
}> = ({ selectedAddOns, setSelectedAddOns, isBillingMonthly, prevStep, nextStep }) => (
  <div className="page-container">
    <div className="page-content">
      <Title title="Pick add-ons">Add-ons help enhance your gaming experience.</Title>

      <div className="flex flex-col gap-3" role="group">
        {Object.entries(addOns).map(([key, { name, description, monthlyPrice, yearlyPrice }]) => {
          const isSelected = selectedAddOns[key as keyof typeof selectedAddOns];

          return (
            <div
              key={key}
              onClick={() =>
                setSelectedAddOns((value) => ({
                  ...value,
                  [key]: !value[key as keyof typeof value],
                }))
              }
              className={cn(
                'flex cursor-pointer items-center gap-4 rounded-lg border p-3 text-start hover:border-purplish-blue focus:border-purplish-blue',
                isSelected ? 'border-purplish-blue bg-alabaster' : 'border-light-gray',
              )}
            >
              <span
                role="checkbox"
                aria-checked={isSelected}
                aria-labelledby={`${key}-label`}
                className={cn(
                  'grid h-5 w-5 flex-shrink-0 place-content-center rounded border',
                  isSelected && 'bg-purplish-blue',
                )}
              >
                {isSelected && <Image src="/icon-checkmark.svg" width={12} height={9} alt="" />}
              </span>

              <div>
                <label id={`${key}-label`} className="font-bold text-marine-blue">
                  {name}
                </label>
                <p className="font-medium text-cool-gray">{description}</p>
              </div>

              <p className="ms-auto font-medium text-purplish-blue">
                +${isBillingMonthly ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}
              </p>
            </div>
          );
        })}
      </div>
    </div>

    <BottomNavigation prevStep={prevStep} nextStep={nextStep} />
  </div>
);
