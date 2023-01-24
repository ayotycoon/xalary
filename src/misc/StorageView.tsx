import React, { useContext, useEffect, useState } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { StateContext } from '../contexts/StateContext';
import Logo from './Logo';
import { isBrowser, StorageConstants } from './Storage';
import { DeleteForever, Restore, RestorePage } from '@mui/icons-material';



function StorageView() {
  const [keys, setKeys] = useState(Object.entries(StorageConstants).filter((k, i) => isBrowser() ? !!localStorage.getItem(k[1]) : false));

  useEffect(() => {
    if (keys.length) {
      keys.push(["Clear All", "all"])
    }
  }, [keys])


  return (
    <Box style={{}} p={3}>

      {keys.map(k => <>
        {k[0]}

        <IconButton onClick={() => {
          if (k[1] == 'all') {
            localStorage.clear();
            window.location.reload()
            return;
          }

          setKeys(keys.filter(_k => _k[1] != k[1]))

          localStorage.removeItem(k[0]);

        }}>
          <DeleteForever fontSize='small' />
        </IconButton>

        <br />
      </>)}
    </Box>
  );
}

export default StorageView;
