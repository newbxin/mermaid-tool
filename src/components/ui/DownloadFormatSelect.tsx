import * as Select from '@radix-ui/react-select';

export type DownloadFormat = 'svg' | 'png';

interface DownloadFormatSelectProps {
  value: DownloadFormat;
  onValueChange: (value: DownloadFormat) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const FORMAT_LABELS: Record<DownloadFormat, string> = {
  svg: 'SVG',
  png: 'PNG',
};

export function DownloadFormatSelect({
  value,
  onValueChange,
  disabled = false,
  'aria-label': ariaLabel = 'Download format',
}: DownloadFormatSelectProps) {
  return (
    <Select.Root value={value} onValueChange={(nextValue: string) => onValueChange(nextValue as DownloadFormat)} disabled={disabled}>
      <Select.Trigger className="ui-select-trigger" aria-label={ariaLabel}>
        <Select.Value>{FORMAT_LABELS[value]}</Select.Value>
        <Select.Icon className="ui-select-icon">
          <span aria-hidden="true" className="ui-select-icon-mark" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="ui-select-content" position="popper" sideOffset={6}>
          <Select.Viewport className="ui-select-viewport">
            {(Object.keys(FORMAT_LABELS) as DownloadFormat[]).map((format) => (
              <Select.Item className="ui-select-item" key={format} value={format}>
                <Select.ItemText>{FORMAT_LABELS[format]}</Select.ItemText>
                <Select.ItemIndicator className="ui-select-item-indicator">
                  <span aria-hidden="true" className="ui-select-check-mark" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
