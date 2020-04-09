import * as React from 'react';
import { Chart } from 'react-google-charts';
import * as _ from 'lodash';
import { ProjectModel } from '../contents';

interface TimelineProps {
  heading: string;
  projects: ProjectModel[];
  tags: string[];
  limit?: number;
}

interface TimelineState {
  showAll: boolean;
}

const mergeRanges = (ranges: [number, number][]) => {
  const result: [number, number][] = [];
  let last: [number, number];

  ranges.forEach((r) => {
    if (!last || r[0] > last[1]) {
      result.push(last = r);
    } else if (r[1] > last[1]) {
      last[1] = r[1];
    }
  });

  return result;
};

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);

    this.state = {
      showAll: false,
    };
  }

  public render() {
    const { heading, projects, tags, limit } = this.props;
    const { showAll } = this.state;

    const tagMap = tags.reduce((prev, cur) => ({ ...prev, [cur]: [] }), {});
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if (tag in tagMap) {
          tagMap[tag].push([project.startYear, project.endYear || project.startYear]);
        }
      });
    });
    Object.keys(tagMap).forEach((tag) => {
      tagMap[tag] = mergeRanges(tagMap[tag].sort((a: number[], b: number[]) => a[0] - b[0]));
    });
    const data = Object.keys(tagMap).slice(0, !showAll ? limit : undefined).reduce(
      (prev, cur) =>
        [
          ...prev,
          ...tagMap[cur].map((range: [number, number]) => [
            cur,
            new Date(range[0], 0, 0),
            new Date(range[1], 11, 31),
          ]),
        ],
      []
    );

    const visibleTags = Object.keys(tagMap).reduce((prev, cur) => prev + (tagMap[cur].length > 0 ? 1 : 0), 0);
    const height = `${41 * (!showAll && limit && tags.length > limit ? limit : visibleTags) + 60}px`;

    return (
      <div className="timeline row justify-content-center" >
        <div className="col col-lg-10 col-xl-8">
          <p>{heading}</p>
          {limit !== undefined && limit < data.length &&
            <div className="show-all form-check">
              <input
                id="show-all"
                type="checkbox"
                className="form-check-input"
                checked={showAll}
                onChange={() => this.setState({ showAll: !showAll })}
              />
              <label className="form-check-label" htmlFor="show-all">Show all</label>
            </div>
          }
          {data.length > 0 ?
            <Chart
              key={height}
              height={height}
              chartType="Timeline"
              loader={<div>Loading Chart</div>}
              data={[
                [
                  { type: 'string', id: 'Tech' },
                  { type: 'date', id: 'Start' },
                  { type: 'date', id: 'End' },
                ],
                ...data,
              ]}
              options={{
                avoidOverlappingGridLines: false,
                enableInteractivity: false,
                timeline: { showBarLabels: false },
                tooltip: { trigger: 'none' },
              }}
            /> :
            <p className="text-italic">No data to show</p>}
        </div>
      </div>
    );
  }
}

export default Timeline;
