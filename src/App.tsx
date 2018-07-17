import * as React from 'react';
import * as _ from 'lodash';
import { ProjectModel, contents } from './contents';
import FilterRow from './components/FilterRow';
import Filter from './components/Filter';
import Project from './components/Project';

interface AppState {
  projects: ProjectModel[];
  selectedTypes: string[];
  selectedTags: string[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      projects: contents,
      selectedTypes: [],
      selectedTags: [],
    };
  }

  private typeFilterSelected = (name: string) => {
    this.filterSelected('selectedTypes', name);
  }

  private tagFilterSelected = (name: string) => {
    this.filterSelected('selectedTags', name);
  }

  private filterSelected = (prop: string, name: string) => {
    const items = this.state[prop];
    const selected = items.includes(name) ? items.filter((item: string) => item !== name) : [...items, name];
    this.setState({ [prop]: selected } as any);
  }

  public render() {
    const { projects, selectedTypes, selectedTags } = this.state;

    const projectTypes = _.uniq(projects.map(proj => proj.type));
    const tags = _.countBy(projects.reduce((result, proj) => _.concat(result, proj.tags), []));
    const projectTags = _.orderBy(
      _.keys(tags).map(key => ({ name: key, count: tags[key] })),
      'count', 'desc'
    );
    const visibleProjects = projects
      .filter(proj => this.state.selectedTypes.length === 0 || this.state.selectedTypes.includes(proj.type))
      .filter(proj => this.state.selectedTags.length === 0 ||
        this.state.selectedTags.reduce((result, item) => result && proj.tags.includes(item), true));

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Petteri Roponen Portfolio</h1>
        </header>
        <div className="app-container container-fluid">
          <FilterRow label="Techs">
            {projectTags.map(tag => (
              <Filter
                key={tag.name}
                className="tag"
                name={tag.name}
                count={tag.count}
                isActive={selectedTags.includes(tag.name)}
                filterSelected={this.tagFilterSelected}
              />))
            }
          </FilterRow>
          <FilterRow label="Categories">
            {projectTypes.map(type => (
              <Filter
                key={type}
                className="type"
                name={type}
                isActive={selectedTypes.includes(type)}
                filterSelected={this.typeFilterSelected}
              />))
            }
          </FilterRow>
          <div>
            {visibleProjects.map(project => (
              <Project key={project.name} project={project} />
            ))}
          </div>
        </div>
        <footer className="app-footer">
          <a href="mailto:petteri.roponen@gmail.com">petteri.roponen@gmail.com</a>
        </footer>
      </div>
    );
  }
}

export default App;
