// ----------------------------------------------------------------------

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-inputRoot': {
            paddingTop: '0!important',
            paddingBottom: '0!important'
          }

        },
        paper: {
          boxShadow: theme.customShadows.dropdown,
        },
        listbox: {
          // padding: theme.spacing(0, 1),
          // '& .MuiAutocomplete-option': {
          //   padding: theme.spacing(1),
          //   margin: theme.spacing(1, 0),
          //   borderRadius: theme.shape.borderRadius,
          // },
        },
      },
    },
  };
}
