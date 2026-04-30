import * as Tooltip from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

interface TooltipHintProps {
  children: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: Tooltip.TooltipContentProps['side'];
  align?: Tooltip.TooltipContentProps['align'];
}

export function TooltipHint({
  children,
  content,
  disabled = false,
  open,
  defaultOpen,
  onOpenChange,
  side = 'top',
  align = 'center',
}: TooltipHintProps) {
  if (!content || disabled) {
    return children;
  }

  return (
    <Tooltip.Provider delayDuration={350} skipDelayDuration={120}>
      <Tooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="ui-tooltip" side={side} align={align} sideOffset={6}>
            {content}
            <Tooltip.Arrow className="ui-tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
