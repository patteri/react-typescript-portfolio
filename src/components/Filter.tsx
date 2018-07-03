import * as React from 'react';
import * as classNames from 'classnames';

export interface FilterProps {
  name: string;
  count?: number;
  isActive: boolean;
  filterSelected?(name: string): void;
}

const Filter: React.SFC<FilterProps> = ({ name, count, isActive, filterSelected }) => {
  const onFilterSelected = () => {
    if (filterSelected) {
      filterSelected(name);
    }
  };

  return (
    <div className={classNames('filter', { active: isActive })} onClick={onFilterSelected}>
      <span>{name}{count ? ` - ${count}` : ''}</span>
    </div>
  );
};

export default Filter;
