import * as React from 'react';
import { ProjectModel } from '../contents';
import Filter from './Filter';

export interface ProjectProps {
  project: ProjectModel;
}

const Project: React.SFC<ProjectProps> = ({ project }) => {
  return (
    <div className="project">
      <div className="header">
        <h1>{project.name}</h1>
      </div>
      <div className="header-type">
        <Filter
          name={project.type}
          isActive={true}
        />
      </div>
      <div className="clearfix" />
      <div className="tags">
        {project.tags.map(tag => (
          <Filter
            name={tag}
            isActive={true}
          />
        ))}
      </div>
      <p>{project.description}</p>
    </div>
  );
};

export default Project;
