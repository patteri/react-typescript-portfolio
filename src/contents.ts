export interface Link {
  name: string;
  url: string;
}

export interface ProjectModel {
  name: string;
  startTime: Date;
  endTime: Date;
  type: string;
  description: string;
  tags: string[];
  links: Link[];
  images: string[];
}

export const contents: ProjectModel[] = [
  {
    name: 'Test project',
    startTime: new Date(2015, 0, 15),
    endTime: new Date(2016, 0, 15),
    type: 'Work life',
    description: 'Description',
    tags: ['React', 'Node.js'],
    links: [{ name: 'Visible link text', url: 'url' }],
    images: ['image_name'],
  },
  {
    name: 'Test project 2',
    startTime: new Date(2016, 0, 15),
    endTime: new Date(2017, 0, 15),
    type: 'Free time',
    description: 'Description',
    tags: ['React', 'Java'],
    links: [{ name: 'Visible link text', url: 'url' }],
    images: ['image_name'],
  },
];
