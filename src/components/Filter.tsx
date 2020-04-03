import * as React from 'react';
import * as classNames from 'classnames';

export interface FilterProps {
  className?: string;
  name: string;
  count?: number;
  isActive: boolean;
  filterSelected?(name: string): void;
}

const Filter: React.SFC<FilterProps> = ({ className, name, count, isActive, filterSelected }) => {
  const onFilterSelected = () => {
    if (filterSelected) {
      filterSelected(name);
    }
  };

  return (
    <div
      className={classNames('filter', className, { active: isActive, clickable: filterSelected != null })}
      onClick={onFilterSelected}
    >
      <span className="name">{name}</span>
      {count && (
        <>
          <span className="separator">-</span>
          <span className="count">{count}</span>
        </>
      )}
    </div>
  );
};

export default Filter;
