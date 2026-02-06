import React from 'react';
import { Container, Title, Grid, Card, Text, Badge, Group, Table, Progress, Stack } from '@mantine/core';
import candidatesData from './sample_data.json';

// Component: Leaderboard
const Leaderboard = ({ candidates }) => {
  // Sort by average of the three mock scores
  const sorted = [...candidates].sort((a, b) => {
    const scoreA = (a.mock_scores.crisis + a.mock_scores.sustainability + a.mock_scores.motivation) / 3;
    const scoreB = (b.mock_scores.crisis + b.mock_scores.sustainability + b.mock_scores.motivation) / 3;
    return scoreB - scoreA;
  }).slice(0, 10); // Take top 10

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} mb="md">🏆 Top 10 Candidates</Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rank</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Exp</Table.Th>
            <Table.Th>Avg Score</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sorted.map((c, index) => {
            const avg = ((c.mock_scores.crisis + c.mock_scores.sustainability + c.mock_scores.motivation) / 3).toFixed(1);
            return (
              <Table.Tr key={c.id}>
                <Table.Td>#{index + 1}</Table.Td>
                <Table.Td style={{ fontWeight: 500 }}>{c.name}</Table.Td>
                <Table.Td>{c.years_of_experience}y</Table.Td>
                <Table.Td><Badge color={avg > 85 ? 'green' : 'blue'}>{avg}</Badge></Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Card>
  );
};

// Component: Individual Skill Visualizer
const SkillHeatmap = ({ candidate }) => (
  <Card shadow="xs" p="md" radius="md" withBorder mb="sm">
    <Group justify="space-between" mb="xs">
      <Text size="sm" fw={700}>{candidate.name}</Text>
      <Badge size="xs" variant="outline">ID: {candidate.id}</Badge>
    </Group>
    
    <Stack gap="xs">
      <div>
        <Group justify="space-between">
            <Text size="xs">Crisis Management</Text>
            <Text size="xs" fw={500}>{candidate.mock_scores.crisis.toFixed(0)}%</Text>
        </Group>
        <Progress value={candidate.mock_scores.crisis} color="red" size="sm" />
      </div>
      <div>
        <Group justify="space-between">
            <Text size="xs">Sustainability</Text>
            <Text size="xs" fw={500}>{candidate.mock_scores.sustainability.toFixed(0)}%</Text>
        </Group>
        <Progress value={candidate.mock_scores.sustainability} color="teal" size="sm" />
      </div>
      <div>
        <Group justify="space-between">
            <Text size="xs">Team Motivation</Text>
            <Text size="xs" fw={500}>{candidate.mock_scores.motivation.toFixed(0)}%</Text>
        </Group>
        <Progress value={candidate.mock_scores.motivation} color="blue" size="sm" />
      </div>
    </Stack>
  </Card>
);

export default function App() {
  // Get top 5 candidates for the detail view
  const topCandidates = [...candidatesData].sort((a, b) => {
     const scoreA = (a.mock_scores.crisis + a.mock_scores.sustainability + a.mock_scores.motivation) / 3;
     const scoreB = (b.mock_scores.crisis + b.mock_scores.sustainability + b.mock_scores.motivation) / 3;
     return scoreB - scoreA;
  }).slice(0, 5);

  return (
    <Container size="xl" py="xl" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Title order={1} mb="xl" ta="center">♻️ Recycling Line Manager Selection</Title>
      
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
           <Leaderboard candidates={candidatesData} />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title order={4} mb="md">Performance Snapshot (Top 5)</Title>
          {topCandidates.map(c => (
            <SkillHeatmap key={c.id} candidate={c} />
          ))}
        </Grid.Col>
      </Grid>
    </Container>
  );
}