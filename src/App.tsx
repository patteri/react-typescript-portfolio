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

interface FilterValue {
  values: {
    name: string;
    count?: number;
  }[];
  activeFilters: string[];
}

const FILTERS = [
  {
    label: 'Techs',
    className: 'tag',
    propName: 'tags',
    urlParam: 'tags',
    hasCount: true,
  },
  {
    label: 'Roles',
    className: 'role',
    propName: 'roles',
    urlParam: 'roles',
    hasCount: true,
  },
  {
    label: 'Categories',
    className: 'type',
    propName: 'type',
    urlParam: 'categories',
    hasCount: false,
  },
];

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
    const searchParams = this.getSearchParams();

    const filterValues: FilterValue[] = FILTERS.map((filter) => {
      let values;
      if (filter.hasCount) {
        const group = _.countBy(projects.reduce((result, proj) => _.concat(result, proj[filter.propName]), []));
        values = _.orderBy(
          _.keys(group).map(key => ({ name: key, count: group[key] })),
          'count', 'desc'
        );
      } else {
        values = _.uniq(projects.map(proj => proj[filter.propName])).map(item => ({ name: item }));
      }
      return {
        values,
        activeFilters: this.getActiveFilters(searchParams, filter.urlParam),
      };
    });

    const visibleProjects = _.orderBy(
      FILTERS.reduce(
        (current, filter, index) => {
          const activeFilters = filterValues[index].activeFilters;
          if (filter.hasCount) {
            return current.filter(proj => activeFilters.length === 0 ||
              activeFilters.reduce((result, item) => result && proj[filter.propName].includes(item), true));
          }
          return current.filter(proj => activeFilters.length === 0 || activeFilters.includes(proj[filter.propName]));
        },
        projects
      ),
      'startYear', 'desc'
    );

    const minYear = _.min(visibleProjects.map(item => item.startYear));
    const maxYear = _.max(visibleProjects.map(item => item.endYear || item.startYear));

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Portfolio</h1>
        </header>
        <div className="app-container container">
          {FILTERS.map((filter, index) => (
            <FilterRow key={filter.label} label={filter.label}>
              {filterValues[index].values.map(item => (
                <Filter
                  key={item.name}
                  className={filter.className}
                  name={item.name}
                  count={filter.hasCount ? item.count : undefined}
                  isActive={filterValues[index].activeFilters.includes(item.name)}
                  filterSelected={(name) => { this.filterSelected(filter.urlParam, name); }}
                />))
              }
            </FilterRow>
          ))}
          <p className="listing">
            Listing <span className="text-bold">{visibleProjects.length} of {projects.length} </span>
            projects between years <span className="text-bold">{minYear} - {maxYear}</span>
          </p>
          <div className="projects">
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
