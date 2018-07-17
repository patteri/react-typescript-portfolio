export interface Link {
  name: string;
  url: string;
}

export interface ProjectModel {
  name: string;
  startYear: number;
  endYear?: number;
  type: string;
  description: string;
  tags: string[];
  links: Link[];
  logo?: string;
  images: string[];
}

export const contents: ProjectModel[] = [
  {
    name: 'Test project',
    startYear: 2015,
    endYear: 2016,
    type: 'Work life',
    description: 'Description',
    tags: ['React', 'Node.js'],
    links: [
      { name: 'Visible link text', url: 'www.url.com' },
      { name: 'Link 2', url: 'www.url2.com' },
    ],
    logo: 'project.png',
    images: ['project.png', 'screenshot.png'],
  },
  {
    name: 'Test project 2',
    startYear: 2017,
    type: 'Free time',
    description: 'Description',
    tags: ['React', 'Java'],
    links: [{ name: 'Visible link text', url: 'www.url.com' }],
    logo: 'screenshot.png',
    images: [],
  },
];
