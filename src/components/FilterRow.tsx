import * as React from 'react';
import { FilterProps } from './Filter';

interface FilterRowProps {
  label: string;
  children: React.ReactElement<FilterProps>[];
}

interface FilterRowState {
  showAll: boolean;
}

const MINIMIZED_ITEM_COUNT = 12;

class FilterRow extends React.Component<FilterRowProps, FilterRowState> {
  constructor(props: FilterRowProps) {
    super(props);

    this.state = {
      showAll: false,
    };
  }

  private toggleShow = () => {
    this.setState({ showAll: !this.state.showAll });
  }

  public render() {
    const { label, children } = this.props;
    const { showAll } = this.state;

    const visibleChildren = children.length > MINIMIZED_ITEM_COUNT && !showAll ?
      children.slice(0, MINIMIZED_ITEM_COUNT) : children;

    return (
      <div className="row justify-content-center filter-row">
        <div className="header-col col-lg-2 col-xl-1">
          <span className="">{label}</span>
        </div>
        <div className="filters-col col d-md-none">
          {visibleChildren}
          {children.length > MINIMIZED_ITEM_COUNT &&
            <button className="btn btn-link toggle-show" onClick={this.toggleShow}>
              Show {showAll ? 'less' : 'more'}
            </button>
          }
        </div>
        <div className="filters-col col d-none d-md-block col-lg-8 col-xl-7">
          {children}
        </div>
      </div>
    );
  }
}

export default FilterRow;
