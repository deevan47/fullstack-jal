const sections = [
  {
    title: '1. Water Management',
    questions: [
      {
        key: 'q1_1',
        label: '1.1 Status of Water Policy',
        options: [
          'None',
          'Water policy making in progress',
          'Water Policy drafted',
          'Water Policy drafted & communicated to staff & tenants',
        ],
      },
      {
        key: 'q1_2',
        label: '1.2 Status of Water Pledge',
        options: [
          'None',
          'Management have taken a water pledge',
          'Management + Facility Staff have taken a water pledge',
          'Management + Facility Staff + Tenants have taken a water pledge',
        ],
      },      {
        key: 'q1_3',
        label: '1.3 Status of Water Charter',
        options: [
          'None',
          'Water Charter drafting in progress',
          'Water Charter finalized',
          'Water Charter finalized and displayed in public',
        ],
      },
      {
        key: 'q1_4',
        label: '1.4 Status of Water Saving Goals & Targets',
        options: [
          'None',
          'Work in progress',
          'Water saving goals & targets have been set',
          'Water saving goals & targets communicated to staff & tenants',
        ],
      },
    ],
  },
  {
    title: '2. Water Efficiency',
    questions: [
      {
        key: 'q2_1',
        label: '2.1 Status of Water Metering',
        options: [
          'Bulk water meter',
          'Bulk meter + submeter',
          'Bulk meter + submeter + monthly or weekly monitoring',
          'Smart water sub meters',
        ],
      },
      {
        key: 'q2_2',
        label: '2.2 Status of Water Fixtures (Average) Flow Rate in liters per minute (lpm)',
        options: ['(>15 lpm)', '(10-15 lpm)', '(5-10 lpm)', '(<5 lpm)'],
      },
      {
        key: 'q2_3',
        label: '2.3 Status of Toilet Flushing',
        options: [
          'Single flush (>12 litres)',
          'Single flush (10-12 litres)',
          'Dual flush (12 /6 litres)',
          'Dual flush (8 /4 litres)',
        ],
      },
      {
        key: 'q2_4',
        label: '2.4 Status of Water Conservation Signage & Communication',
        options: [
          'None',
          'Signage in washrooms',
          'Signage in washrooms and other areas',
          'Signage plus monthly staff and tenant awareness sessions',
        ],
      },
      {
        key: 'q2_5',
        label: '2.5 Status of Water Use in Cooling Tower',
        options: [
          'No submeter and/or single pass use',
          'Submeter and single pass use',
          'Submeter and water recirculation factor <3',
          'Submeter & water recirculation factor >3',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
      {
        key: 'q2_6',
        label: '2.6 Status of Water Use Intensity',
        options: [
          '(>60% more than best practice benchmark)',
          '(51-60% more than best practice benchmark)',
          '(11-40% more than best practice benchmark)',
          '(Within 10% of best practice benchmark)',
        ],
      },
    ],
  },
  {
    title: '3. Groundwater Sustainability',
    questions: [
      {
        key: 'q3_1',
        label: '3.1 Status of Groundwater dependency expressed as percentage of total annual water consumed',
        options: ['(>50%)', '(20-50%)', '(5-20%)', '(<5%)'],
      },
      {
        key: 'q3_2',
        label: '3.2 Status of Groundwater Extraction',
        options: [
          'None',
          'Manual monitoring of pumped hours',
          'Manual metering',
          'Smart metering',
        ],
      },
      {
        key: 'q3_3',
        label: '3.3 Status of Groundwater Recharge expressed as percentage of Groundwater extraction',
        options: [
          '(<20%)',
          '(20-40%)',
          '(40-50%)',
          '(>50%)',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: '4. Water Circularity Status',
    questions: [
      {
        key: 'q4_1',
        label: '4.1 Status of Rainwater Harvesting',
        options: [
          'None',
          'Roofwater harvesting from <50% of roof',
          'Roofwater harvesting from >50% of roof',
          'Roofwater harvesting + Non roof water harvesting',
        ],
      },
      {
        key: 'q4_2',
        label: '4.2 Status of Greywater/Sewage Water Recycling or Reuse',
        options: [
          'None',
          'Footprint area available for siting a facility',
          'Work in progress - designed and waiting to be constructed',
          'Greywater/Sewage recycling is operational',
        ],
      },
      {
        key: 'q4_3',
        label: '4.3 Status of Collective Reverse Osmosis Treated Water',
        options: [
          'No Reuse - Reject Water is Discharged',
          'Technically feasible to organize for non potable reuse',
          'Plans in place and to be executed',
          'Reject Water is being reused for non potable use',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: '5. Status of Green Vegetation Cover',
    questions: [
      {
        key: 'q5_1',
        label: '5.1 Status of Green Cover Policy',
        options: [
          'None',
          'Green Cover Policy drafting in progress',
          'Green Cover Policy finalized',
          'Green Cover Policy finalized and shared with stakeholders',
        ],
      },
      {
        key: 'q5_2',
        label: '5.2 Status of Green Coverage Area',
        options: ['(<10%)', '(10-25%)', '(25-50%)', '(>50%)'],
      },
      {
        key: 'q5_3',
        label: '5.3 Status of Green Landscapes',
        options: [
          'High water using non-native species + no smart irrigation',
          'High water using non-native species + smart irrigation',
          'Native species + no smart irrigation',
          'Native species + smart irrigation',
        ],
      },
      {
        key: 'q5_4',
        label: '5.4 Status of Green Roofs & Green Walls',
        options: [
          'None',
          'Plans for Green Roofs & Green Walls in place',
          'Green Roofs operational',
          'Green Roofs + Green Walls operational',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
    ],
  },
];

export default sections;