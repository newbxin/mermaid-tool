import type { ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  children?: ReactNode;
  label?: string;
}

export function IconButton({ icon: Icon, children, className, label, type = 'button', ...props }: IconButtonProps) {
  const buttonClassName = ['ui-icon-button', className].filter(Boolean).join(' ');

  return (
    <button className={buttonClassName} type={type} {...props}>
      {Icon ? <Icon aria-hidden="true" className="ui-icon-button__icon" focusable="false" /> : null}
      {children ?? (label ? <span className="ui-icon-button__label">{label}</span> : null)}
    </button>
  );
}
