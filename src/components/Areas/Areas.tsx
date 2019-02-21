import React from 'react';

import { Area } from '../';
import { areaMap } from '../../utilities/playerHelpers';

const Areas = () => (
  <div style={{ display: 'flex' }}>
    {areaMap.map((area) => (
      <Area
        key={area.player + area.type}
        canInteract={area.canInteract}
        title={area.title}
        player={area.player}
        type={area.type}
      />
    ))}
  </div>
);

export default Areas;
