import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: { margin: theme.spacing(1) },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    IconRight: {
        padding: 2,
        display: 'contents',
        justifyContent: 'flex-end',
        backgroundColor: 'buttonface',
    },
    table: {
        minWidth: 300,
        whiteSpace: 'nowrap',
    },
    paper: {
        overflow: 'auto',
    },
    icon: {
        padding: 2,
    },
}));
