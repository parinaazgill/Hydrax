import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
} from "@mantine/core";
import { IconDroplet, IconHeartPlus } from "@tabler/icons";

interface StatsRingProps {
  data: {
    label: string;
    stats: string;
    progress: number | any;
    color: string;
    icon: "heart" | "water";
  }[];
}

const icons = {
  heart: IconHeartPlus,
  water: IconDroplet,
};

export function StatsRing({ data }: StatsRingProps) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      //   <Paper withBorder radius="md" p="xs" key={stat.label}>
      <Paper key={stat.label}>
        <Group>
          <RingProgress
            size={120}
            roundCaps
            thickness={12}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size={28} stroke={2} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
      {stats}
      {/* </div> */}
    </SimpleGrid>
  );
}
