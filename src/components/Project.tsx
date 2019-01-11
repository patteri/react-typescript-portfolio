import * as React from 'react';
import { ProjectModel } from '../contents';
import Filter from './Filter';
import ImageModal from './ImageModal';

export interface ProjectProps {
  project: ProjectModel;
}

interface ProjectState {
  showImage: string;
}

class Project extends React.Component<ProjectProps, ProjectState> {
  constructor(props: ProjectProps) {
    super(props);

    this.state = {
      showImage: '',
    };
  }

  private showImage = (event: any) => {
    this.setState({ showImage: event.target.getAttribute('data-img') });
  }

  private hideImage = () => {
    this.setState({ showImage: '' });
  }

  public render() {
    const { project } = this.props;
    const { showImage } = this.state;

    return (
      <div className="project">
        <div className="left-area d-none d-sm-block">
          <span className="align-helper" />
          <img
            src={`./images/${project.logo || 'project.png'}`}
            alt="logo"
            data-img={project.logo || 'project.png'}
            onClick={this.showImage}
          />
        </div>
        <div className="right-area">
          <div className="header-row">
            <div className="header">
              <h1>{project.name}</h1>
            </div>
            <div className="header-time">
              <span>{project.startYear}</span>
              {project.endYear &&
                <span> - {project.endYear}</span>
              }
            </div>
            <div className="header-type">
              <Filter
                className="type"
                name={project.type}
                isActive={true}
              />
            </div>
          </div>
          <div className="tags">
            {project.tags.map(tag => (
              <Filter
                key={`tag-${tag}`}
                className="tag"
                name={tag}
                isActive={true}
              />
            ))}
            {project.roles.map(role => (
              <Filter
                key={`role-${role}`}
                className="role"
                name={role}
                isActive={true}
              />
            ))}
          </div>
          <p>{project.description}</p>
          <div className="links">
            {project.links.map(link => (
              <a key={link.url} href={link.url}>{link.name}</a>
            ))}
          </div>
          <div className="images">
            {project.images.map(img => (
              <img
                key={img}
                className="rounded"
                src={`./images/${img}`}
                alt="project image"
                data-img={img}
                onClick={this.showImage}
              />
            ))}
          </div>
        </div>

        {showImage !== '' &&
          <ImageModal imagePath={`./images/${showImage}`} hideImage={this.hideImage} />
        }
      </div>
    );
  }
}

export default Project;
