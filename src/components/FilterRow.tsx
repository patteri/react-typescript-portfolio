import * as React from 'react';
import { FilterProps } from './Filter';

interface FilterRowProps {
  label: string;
  children: React.ReactElement<FilterProps>[];
}

const FilterRow: React.SFC<FilterRowProps> = ({ label, children }) => {
  return (
    <div className="row filter-row">
      <div className="col-sm-1">
        <span>{label}</span>
      </div>
      <div className="col">
        {children}
      </div>
    </div>
  );
};

export default FilterRow;
