import React from 'react';
import { connect } from 'react-redux';

import { Area } from '../';
import { areaMap } from '../../utilities/playerHelpers';

// props.type === 'startArea' ? () => ({}) : voidFn

const Areas = () => {
  const areas = areaMap(() => ({}), () => ({}));
  return (
    <div style={{ display: 'flex' }}>
      {areas.map((area) => (
        <Area
          key={area.player + area.type}
          onClick={area.onClick}
          onMouseOver={area.onMouseOver}
          title={area.title}
          player={area.player}
          type={area.type}
        />
      ))}
    </div>
  );
};

export default connect(() => ({}))(Areas);
