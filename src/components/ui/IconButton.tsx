import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  children?: ReactNode;
  label?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, children, className, label, type = 'button', ...props }, ref) => {
    const buttonClassName = ['ui-icon-button', className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={buttonClassName} type={type} {...props}>
        {Icon ? <Icon aria-hidden="true" className="ui-icon-button__icon" focusable="false" /> : null}
        {children ?? (label ? <span className="ui-icon-button__label">{label}</span> : null)}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
