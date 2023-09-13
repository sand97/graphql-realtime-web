//

import Tabs from './Tabs';
import Menu from './Menu';
import Link from './Link';

import Paper from './Paper';
import Input from './Input';
import Radio from './Radio';

import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import Select from './Select';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';

import Skeleton from './Skeleton';
import Progress from './Progress';
import Checkbox from './Checkbox';
import Autocomplete from './Autocomplete';
import LoadingButton from './LoadingButton';
import ControlLabel from "./ControlLabel";
import Dialog from "./Dialog";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return Object.assign(
        Tabs(theme),
        Menu(theme),
        Link(theme),
        Input(theme),
        Radio(theme),
        Paper(theme),
        Switch(theme),
        Select(theme),
        Button(theme),
        Slider(theme),
        Dialog(theme),
        Tooltip(theme),
        Popover(theme),
        SvgIcon(theme),
        Checkbox(theme),
        Skeleton(theme),
        Progress(theme),
        Autocomplete(theme),
        LoadingButton(theme),
        ControlLabel(theme),
    );
}
