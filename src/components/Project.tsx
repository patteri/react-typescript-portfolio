import * as React from 'react';
import * as classNames from 'classnames';
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

    const isDefaultImg = project.images.length === 0;
    const imageName = isDefaultImg ? 'project.png' : project.images[0];

    return (
      <div className="project-row row justify-content-center">
        <div className="project col col-lg-10  col-xl-8">
          <div className="left-area d-none d-md-block">
            <img
              className={classNames({ 'keep-original-size': isDefaultImg })}
              src={`./images/${imageName}`}
              alt="logo"
              data-img={imageName}
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
            {project.links.length > 0 &&
              <div className="links">
                {project.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank">{link.name}</a>
                ))}
              </div>
            }
            {project.images.length > 0 &&
              <div className="mobile-logo d-block d-sm-none">
                <img
                  src={`./images/${imageName}`}
                  alt="logo"
                  data-img={imageName}
                  onClick={this.showImage}
                />
              </div>
            }
            {project.images.length > 1 &&
              <div className="images">
                {project.images.slice(1).map(img => (
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
            }
          </div>

          {showImage !== '' &&
            <ImageModal imagePath={`./images/${showImage}`} hideImage={this.hideImage} />
          }
        </div>
      </div>
    );
  }
}

export default Project;
