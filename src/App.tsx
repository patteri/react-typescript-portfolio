import * as React from 'react';
import * as queryString from 'query-string';
import * as _ from 'lodash';
import { ProjectModel, contents } from './contents';
import FilterRow from './components/FilterRow';
import Filter from './components/Filter';
import Project from './components/Project';

interface AppState {
  projects: ProjectModel[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      projects: contents,
    };
  }

  private getSearchParams = () => queryString.parse(location.search);

  private getActiveFilters = (searchParams: object, paramName: string): string[] => {
    const param = searchParams[paramName] || '';
    return param.split(',').filter((item: string) => item);
  }

  private typeFilterSelected = (name: string) => {
    this.filterSelected('categories', name);
  }

  private tagFilterSelected = (name: string) => {
    this.filterSelected('tags', name);
  }

  private roleFilterSelected = (name: string) => {
    this.filterSelected('roles', name);
  }

  private filterSelected = (prop: string, name: string) => {
    const searchParams = this.getSearchParams();
    const items = this.getActiveFilters(searchParams, prop);
    const selected = items.includes(name) ? items.filter(item => item !== name) : [...items, name];
    if (selected.length > 0) {
      searchParams[prop] = selected.join(',');
    } else {
      delete searchParams[prop];
    }

    history.pushState(null, undefined, `?${queryString.stringify(searchParams)}`);
    this.forceUpdate();
  }

  public render() {
    const { projects } = this.state;

    const projectTypes = _.uniq(projects.map(proj => proj.type));
    const tags = _.countBy(projects.reduce((result, proj) => _.concat(result, proj.tags), []));
    const projectTags = _.orderBy(
      _.keys(tags).map(key => ({ name: key, count: tags[key] })),
      'count', 'desc'
    );
    const roles = _.countBy(projects.reduce((result, proj) => _.concat(result, proj.roles), []));
    const projectRoles = _.orderBy(
      _.keys(roles).map(key => ({ name: key, count: roles[key] })),
      'count', 'desc'
    );

    const searchParams = this.getSearchParams();
    const activeTypes = this.getActiveFilters(searchParams, 'categories');
    const activeTags = this.getActiveFilters(searchParams, 'tags');
    const activeRoles = this.getActiveFilters(searchParams, 'roles');
    const visibleProjects = projects
      .filter(proj => activeTypes.length === 0 || activeTypes.includes(proj.type))
      .filter(proj => activeTags.length === 0 ||
        activeTags.reduce((result, item) => result && proj.tags.includes(item), true))
      .filter(proj => activeRoles.length === 0 ||
        activeRoles.reduce((result, item) => result && proj.roles.includes(item), true))
      .sort((proj1, proj2) => proj2.startYear - proj1.startYear);

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Portfolio</h1>
        </header>
        <div className="app-container container">
          <FilterRow label="Techs">
            {projectTags.map(tag => (
              <Filter
                key={tag.name}
                className="tag"
                name={tag.name}
                count={tag.count}
                isActive={activeTags.includes(tag.name)}
                filterSelected={this.tagFilterSelected}
              />))
            }
          </FilterRow>
          <FilterRow label="Roles">
            {projectRoles.map(role => (
              <Filter
                key={role.name}
                className="role"
                name={role.name}
                count={role.count}
                isActive={activeRoles.includes(role.name)}
                filterSelected={this.roleFilterSelected}
              />))
            }
          </FilterRow>
          <FilterRow label="Categories">
            {projectTypes.map(type => (
              <Filter
                key={type}
                className="type"
                name={type}
                isActive={activeTypes.includes(type)}
                filterSelected={this.typeFilterSelected}
              />))
            }
          </FilterRow>
          <span>Listing {visibleProjects.length} / {projects.length} projects</span>
          <div>
            {visibleProjects.map(project => (
              <Project key={project.name} project={project} />
            ))}
          </div>
        </div>
        <footer className="app-footer">
          <a href="mailto:first.last@mail.com">first.last@mail.com</a>
        </footer>
      </div>
    );
  }
}

export default App;
