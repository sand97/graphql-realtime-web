//
import { InputSelectIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
      styleOverrides: {
        select: {
          padding: '12px 14px!important',
        }
      }
    },
  };
}
