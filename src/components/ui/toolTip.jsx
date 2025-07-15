import * as RadixTooltip from '@radix-ui/react-tooltip';

export default function Tooltip({ children, text, side = "top" }) {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            className="z-50 select-none rounded bg-gray-800 px-2 py-1 text-xs text-white shadow"
          >
            {text}
            <RadixTooltip.Arrow className="fill-gray-800" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
