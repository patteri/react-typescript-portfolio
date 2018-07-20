import * as React from 'react';
import { FilterProps } from './Filter';

interface FilterRowProps {
  label: string;
  children: React.ReactElement<FilterProps>[];
}

const FilterRow: React.SFC<FilterRowProps> = ({ label, children }) => {
  return (
    <div className="row filter-row">
      <div className="header-col col-sm-2 col-md-1">
        <span className="">{label}</span>
      </div>
      <div className="filters-col col">
        {children}
      </div>
    </div>
  );
};

export default FilterRow;
