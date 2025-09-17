import { Text } from '@radix-ui/themes';
import AnimatedNumber from '../animatedNumber';

function MetricRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="flex flex-row items-center gap-3">
      <Text size="2" className="font-medium text-gray-700">
        {label}
      </Text>
      <div className="text-lg font-semibold">
        <AnimatedNumber
          number={value}
          fontStyle={{ fontSize: 20, ...(color ? { color } : {}) }}
        />
      </div>
    </div>
  );
}


export default MetricRow