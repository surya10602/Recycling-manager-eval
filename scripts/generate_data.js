const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateCandidates = (count = 40) => {
  const candidates = [];
  
  for (let i = 0; i < count; i++) {
    candidates.push({
      id: i + 1,
      name: faker.person.fullName(),
      years_of_experience: faker.number.int({ min: 2, max: 15 }),
      skills: faker.helpers.arrayElements(
        ['Logistics', 'Six Sigma', 'Waste Management', 'Team Leadership', 'OSHA Safety', 'Process Optimization', 'Supply Chain'],
        { min: 2, max: 5 }
      ),
      bio: faker.person.bio(),
      // Mocking AI scores for the 'evaluations' table to ensure data availability [cite: 41]
      mock_scores: {
        crisis: faker.number.float({ min: 60, max: 100, precision: 0.1 }),
        sustainability: faker.number.float({ min: 50, max: 100, precision: 0.1 }),
        motivation: faker.number.float({ min: 70, max: 100, precision: 0.1 })
      }
    });
  }
  return candidates;
};

const data = generateCandidates();
fs.writeFileSync('sample_data.json', JSON.stringify(data, null, 2));
console.log('Generated 40 candidates in sample_data.json');